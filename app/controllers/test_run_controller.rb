class TestRunController < ApplicationController
  def index
    render json: TestRun.test_run_select_list
  end

  def program_test_run_select_list
    render json: TestRun.program_test_run_select_list(params[:id])
  end

  def show
    test_run = TestRun.find(params[:id])
    render json: test_run.test_run_info
  end

  def program_info
    test_run = TestRun.find(params[:id])
    render json: test_run.program_info
  end

  def timeline
    test_run = TestRun.find(params[:id])
    if test_run.step_statuses.exists?
      combined_timeline = test_run.timeline + check_status(test_run)
    else
      combined_timeline = Program.find(test_run.program.id).program_timeline
    end
    render json: combined_timeline
  end

  def check_status(test_run)
    status = test_run.step_statuses.last.status
    if status == "done"
      return []
    else
      get_remaining_steps(test_run)
    end
  end

  def get_remaining_steps(test_run)
    program = Program.find(test_run.program_id)
    start_step =  test_run.step_statuses.last.step.sequence_number
    start_time = test_run.step_statuses.last.started_at - test_run.step_statuses.first.started_at
    remaining_steps = program.program_timeline(start_step, start_time)
    remaining_steps.each do |step|
      step[0] = test_run.id.to_s
    end
    remaining_steps
  end
end
