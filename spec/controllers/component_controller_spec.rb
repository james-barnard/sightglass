require 'rails_helper'

describe ComponentController do

  let(:states) { [{"id" => 1,
                 "name" => "Component Name",
              "step_id" => 1,
                "state" => "open"},
                 { "id" => 2,
                 "name" => "Component Name",
              "step_id" => 1,
                "state" => "open"}] }
  before(:each) do
    TestDb::reset_database
  end

  it "responds to a GET request" do
    get :component_states, :format => :JSON, :params => {:id => 1}
    expect(JSON.parse(response.body)).to eq (states)
  end

  describe "GET #component_states" do
    it "returns http success" do
      get :component_states, :format => :JSON, :params => {:id => 1}
      expect(response).to have_http_status(:success)
    end
  end
end