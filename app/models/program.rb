class Program < ApplicationRecord
  has_many :steps
  has_many :test_runs

  def select_program_steps(step_id)
    steps.where("id <= #{step_id}").order("id desc")
  end
end
