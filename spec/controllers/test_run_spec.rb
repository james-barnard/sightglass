require 'rails_helper'

describe TestRunController do
  PROGRAM_INFO_KEYS = %w[run_time program_time step_count current_step status]
  STEP_INFO_KEYS = %w[pending_time soaking_time run_time duration description status]

  before(:each) do
    TestDb::reset_database
  end

  it "responds to a GET request" do
    get :show, :format => :JSON, :params => {:id => 1}
    expect([200,204]).to include response.status
  end

  it "delivers the right JSON values" do
    get :show, :format => :JSON, :params => {:id => 1}
    expect(response.content_type).to eq("application/json")
  end

  it "returns its program information" do
    get :program_info, :format => :JSON, :params => {:id => 1}
    expect(JSON.parse(response.body).keys.sort).to eq(PROGRAM_INFO_KEYS.sort)
  end

  xit "returns its step status info" do
    get :timeline, :format => :JSON, :params => {:id => 1}
    expect(JSON.parse(response.body).first[:step_info].keys.sort).to eq(STEP_INFO_KEYS.sort)
  end
end