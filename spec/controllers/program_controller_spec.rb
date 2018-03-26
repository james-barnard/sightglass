require 'rails_helper'

describe ProgramController, type: :controller do

  it 'responds to a GET request' do
    get :index, :format => :JSON
    expect([200,204]).to include response.status
  end
  
end