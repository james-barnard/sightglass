class ProgramController < ApplicationController
  def index
    render json: Program.program_select_list
  end

  def program_timeline
    @program = Program.find(params[:id])
    render json: @program.program_timeline
  end

  def program_program_info
    @program = Program.find(params[:id])
    render json: @program.program_program_info
  end
end