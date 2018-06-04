class Program < ApplicationRecord
  has_many :steps
  has_many :test_runs

  def self.program_select_list
    programs_list = select("id, id key, id value, purpose text").to_a
    programs_list.map! { |program| convert_object(program) }
    programs_list
  end

  def self.convert_object(program)
    format_text(program.serializable_hash)
  end

  def self.format_text(a_hash)
    a_hash["text"] = "#{a_hash['id']} | #{a_hash['text']}"
    a_hash
  end
  
  def select_program_steps(step_id)
    steps.where("id <= #{step_id}").order("id desc")
  end

  def program_timeline(starting_step = 0, starting_time = 0)
    ordered_steps = steps.where("sequence_number > #{starting_step}").order("sequence_number")
    timeline = []
    step_start_time ||= starting_time
    ordered_steps.each do |step|
      timeline << fill_program_values(step, step_start_time)
      step_start_time += step.duration
    end
    timeline
  end

  def program_program_info
    {
      "program_time": format_time(program_time),
      "step_count": program_step_count,
      "program_purpose": purpose
    }
  end

  def fill_program_values(step, step_start_time)
    [
      step.program_id.to_s,
      "#{step.sequence_number}: #{step.description}",
      step_start_time * 1000,
      (step_start_time + step.duration) * 1000,
      step.id.to_s,
      build_program_step_info(step),
      step.sequence_number
    ]
  end

  def build_program_step_info(step)
    program_step_info = {}
    program_step_info[:duration] = format_time(step.duration)
    program_step_info[:description] = step.description
    program_step_info[:status] = ""
    calc_program_times(step, program_step_info)
    program_step_info
  end

  def calc_program_times(step, step_info)
    step_info[:pending_time] = ""
    step_info[:soaking_time] = ""
    step_info[:run_time] = step_info[:duration]
  end

  def format_time(seconds)
    seconds > 3600 ? Time.at(seconds).utc.strftime("%H:%M:%S") : Time.at(seconds).utc.strftime("%M:%S")
  end

  def program_time
    steps.inject(0) { |memo, step| memo + step.duration }
  end

  def program_step_count
    steps.count
  end
end