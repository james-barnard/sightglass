class TestRun < ApplicationRecord
  belongs_to :program
  has_many :step_statuses, -> {includes :step }
  has_many :steps, through: :step_statuses

  def program_info
    {
      run_time: run_time,
      program_time: program_time,
      step_count: step_count,
      current_step: current_step,
      status: status
    }
  end

  def timeline
    grouped_step_statuses = step_statuses.includes(:step).group_by { |ss| ss.step.sequence_number }
    timeline = []
    grouped_step_statuses.keys.sort.each do |k|
      timeline << fill_values(grouped_step_statuses[k], k)
    end
    timeline
  end

  def fill_values(step_status, sequence_number)
    array = []
    array << step_status.first.test_run_id.to_s
    array << "#{sequence_number}: #{step_status.first.step.description}"
    array << step_status.first.started_at
    array << step_status.last.started_at
    array << step_status.first.status
    array
  end


  def run_time
    return 0 unless step_statuses.count > 0
    step_statuses.last.started_at - step_statuses.first.started_at
  end

  def program_time
    program.steps.inject(0) { |memo, step| memo + step.duration }
  end

  def step_count
    program.steps.count
  end

  def current_step
    step_statuses.map { |s| s.step_id }.uniq.count
  end

  def status
    return "N/A" unless step_statuses.count > 0
    step_statuses.order(:id).last.status
  end

  def self.test_run_select_list
    select("id key, id value, datetime(started_at,'unixepoch') text")
  end
end
