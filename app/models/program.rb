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
end
