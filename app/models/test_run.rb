class TestRun < ApplicationRecord
  belongs_to :program
  has_many :step_statuses, -> {includes :step }
  has_many :steps, through: :step_statuses

  def self.test_run_select_list
    @test_run_list = select("id, id key, id value, program_id, datetime(started_at,'unixepoch') text")
    .order("key desc")
    .all
  end

  def self.program_test_run_select_list(program_id)
    @test_run_list = select("id, id key, id value, program_id, datetime(started_at,'unixepoch') text")
    .where("program_id = #{program_id}")
    .order("key desc")
    .all
  end
  
  def program_info
    {
      run_time: format_time(run_time),
      program_time: format_time(program_time),
      step_count: step_count,
      current_step: current_step,
      status: status,
      purpose: program.purpose
    }
  end

  def test_run_info
    {
      test_run_id: id,
      program_id: program.id,
      purpose: program.purpose,
      started_at: Time.at(started_at).strftime("%B %e, %Y, %I:%M %p"),
      completed_at: completed_at_time,
      status_final: status,
      step_final: last_step_attempted
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
      build_step_info(step_status),
      sequence_number
    ]
  end

  def build_step_info(step_status)
    step_info = {}
    calc_times(step_status, step_info)
    step_info[:duration] = step_status.first.step.duration
    
    step_info.each do |k,v|
      step_info[k] = format_time(v)
    end
    
    step_info[:description] = step_status.first.step.description
    step_info[:status] = step_status.last.status
    step_info
  end

  def calc_times(steps_array, step_info)
    temp = {}
    steps_array.each_with_object(temp) {|s, memo| memo[s.status] = s.started_at }
    temp["pending"] && temp["soaking"] ? step_info[:pending_time] = (temp["soaking"] - temp["pending"]) : step_info[:pending_time] = 0
    temp["completed"] ? step_info[:soaking_time] = temp["completed"] - temp["soaking"] : step_info[:soaking_time] = 0
    temp["pending"] ? step_info[:run_time] = step_info[:pending_time] + step_info[:soaking_time] : step_info[:run_time] = step_info[:soaking_time]
  end

  def format_time(seconds)
    seconds > 3600 ? Time.at(seconds).utc.strftime("%H:%M:%S") : Time.at(seconds).utc.strftime("%M:%S")
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
    return "" unless step_statuses.count > 0
    step_statuses.order(:id).last.status
  end

  def completed_at_time
    if step_statuses.exists?
      Time.at(step_statuses.order(:id).last.started_at).strftime("%B %e, %Y, %I:%M %p")
    else
      ""
    end
  end

  def last_step_attempted
    return "" unless step_statuses.count > 0
    step_statuses.order(:id).last.step.sequence_number
  end
end
