require 'rails_helper'

describe StepController do 

  let(:states) { [{"id" => 1,
              "step_id" => 1,
         "component_id" => 1,
                "state" => "open",
      "sequence_number" => 1,
                 "name" => "Component Name"},
                 { "id" => 2,
              "step_id" => 1,
         "component_id" => 2,
                "state" => "open",
      "sequence_number" => 1,
                 "name" => "Component Name"}] }
  before(:each) do
    TestDb::reset_database
  end

  describe "GET #show" do
    it "returns http success" do
      get :show, :format => :JSON, :params => {:id => 1}
      expect(response).to have_http_status(:success)
    end
  end
  
end