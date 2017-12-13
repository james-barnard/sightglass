class TestRunController < ApplicationController
  def index
  end

  def show
    @test_run = TestRun.find(params[:id])
    render json: @test_run
  end

  def program_info
    @test_run = TestRun.find(params[:id])
    render json: @test_run.program_info
  end

  def step_statuses
    @test_run = TestRun.find(params[:id])
    render json: @test_run.step_statuses
  end
end
