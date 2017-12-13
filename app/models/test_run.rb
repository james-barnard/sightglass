class TestRun < ApplicationRecord
  belongs_to :program
  has_many :step_statuses

  def program_info
    {
      run_time: run_time,
      program_time: program_time,
      step_count: step_count,
      current_step: current_step,
      status: status
    }
  end

  def run_time
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
    step_statuses.order(:id).last.status
  end
end
