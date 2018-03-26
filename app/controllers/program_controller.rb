class ProgramController < ApplicationController
  def index
    render json: Program.program_select_list
  end
end