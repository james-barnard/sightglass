class TestRun < ApplicationRecord
  belongs_to :program
  has_many :step_statuses, -> {includes :step }
  has_many :steps, through: :step_statuses

  def self.test_run_select_list
    @test_run_list = select("id, id key, id value, datetime(started_at,'unixepoch') text")
    .order("key desc")
    .all
  end

  def self.program_test_run_select_list(program_id)
    @test_run_list = select("id, id key, id value, datetime(started_at,'unixepoch') text")
    .where("program_id = #{program_id}")
    .order("key desc")
    .all
  end
  
  def program_info
    {
      run_time: run_time,
      program_time: program_time,
      step_count: step_count,
      current_step: current_step,
      status: status
    }
  end

  def test_run_info
    start_string = started_at
    {
      test_run_id: id,
      program_id: program.id,
      purpose: program.purpose,
      started_at: Time.at(started_at).strftime("%B %e, %Y, %I:%M %p"),
      completed_at: Time.at(completed_at_time).strftime("%B %e, %Y, %I:%M %p"),
      status_final: status
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

  def live_timeline
    grouped_steps = program.steps.includes(:step_statuses).group_by { |ss| ss.sequence_number}
    timeline = []
    grouped_steps.each do |key, value|
      @time ||= 0
      timeline << fill_live_values(value, key, @time)
      @time = value.first.duration + @time
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

  def fill_live_values(steps_array, sequence_number, time)
    [
      steps_array.first.program_id.to_s,
      "#{sequence_number}: #{steps_array.first.description}",
      time*1000,
      (time+steps.first.duration)*1000,
      steps_array.first.id.to_s,
      build_live_step_info(steps_array)
    ]
  end

  def build_live_step_info(steps_array)
    step_info = {}
    step_info[:duration] = steps_array.first.duration
    step_info[:description] = steps_array.first.description
    step_info[:status] = steps_array.last.step_statuses.last.status
    calc_live_times(steps_array, step_info)
    step_info
  end

  def build_step_info(step_status)
    step_info = {}
    calc_times(step_status, step_info)
    step_info[:duration] = step_status.first.step.duration
    step_info[:description] = step_status.first.step.description
    step_info[:status] = step_status.last.status
    step_info
  end

  def calc_live_times(steps_array, step_info)
    step_info[:pending_time] = "n/a"
    step_info[:soaking_time] = "n/a"
    step_info[:run_time] = step_info[:duration]
  end

  def calc_times(steps_array, step_info)
    temp = {}
    steps_array.each_with_object(temp) {|s, memo| memo[s.status] = s.started_at }
    temp["pending"] && temp["soaking"] ? step_info[:pending_time] = (temp["soaking"] - temp["pending"]) : step_info[:pending_time] = 0
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

  def completed_at_time
    step_statuses.order(:id).last.started_at
  end

end
