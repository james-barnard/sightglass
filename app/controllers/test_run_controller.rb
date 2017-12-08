class TestRunController < ApplicationController
  def index
  end

  def show
    @test_run = TestRun.find(params[:id])
    render json: @test_run
  end
end
