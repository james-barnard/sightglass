class TestRunController < ApplicationController
  def index
    render json: TestRun.test_run_select_list.all
  end

  def show
    @test_run = TestRun.find(params[:id])
    render json: @test_run
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
