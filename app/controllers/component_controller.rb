class ComponentController < ApplicationController
  def index
    @components = Component.select(:id, :name).all
    render json: @components
  end

  def show
    @component = Component.find(params[:id])
    render json: @component
  end
end