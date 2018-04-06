class TestRunController < ApplicationController
  def index
    render json: TestRun.test_run_select_list
  end

  def program_test_run_select_list
    render json: TestRun.program_test_run_select_list(params[:id])
  end

  def show
    @test_run = TestRun.find(params[:id])
    render json: @test_run.test_run_info
  end

  def program_info
    @test_run = TestRun.find(params[:id])
    render json: @test_run.program_info
  end

  def timeline
    @test_run = TestRun.find(params[:id])
    render json: @test_run.timeline
  end
end
