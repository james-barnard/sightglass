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
      @start_time ||= grouped_step_statuses[k].first.started_at
      timeline << fill_values(grouped_step_statuses[k], k, @start_time)
    end
    timeline
  end

  def fill_values(step_status, sequence_number, start_time)
    [
      step_status.first.test_run_id.to_s,
      "#{sequence_number}: #{step_status.first.step.description}",
      (step_status.first.started_at - start_time)*1000,
      (step_status.last.started_at - start_time)*1000,
      step_status.first.step_id.to_s,
      build_step_info(step_status)
    ]
  end

  def build_step_info(step_status)
    step_info = {}
    calc_times(step_status, step_info)
    step_info[:duration] = step_status.first.step.duration
    step_info[:description] = step_status.first.step.description
    step_info[:status] = step_status.last.status
    step_info
  end

  def calc_times(step_status, step_info)
    temp = {}
    step_status.each_with_object(temp) {|s, memo| memo[s.status] = s.started_at }
    temp["pending"] ? step_info[:pending_time] = (temp["soaking"] - temp["pending"]) : step_info[:pending_time] = 0
    temp["completed"] ? step_info[:soaking_time] = temp["completed"] - temp["soaking"] : step_info[:soaking_time] = 0
    temp["pending"] ? step_info[:run_time] = step_info[:pending_time] + step_info[:soaking_time] : step_info[:run_time] = step_info[:soaking_time]
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
    .order("id desc")
  end
end
