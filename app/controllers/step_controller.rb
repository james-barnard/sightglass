class StepController < ApplicationController
  def show
    render json: Step.find(params[:id])
  end
end
