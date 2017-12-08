require_relative '../../app/controllers/test_run_controller'

describe TestRunController do
  it "responds to a GET request" do
    get :show, :format => :JSON, :params => {:id => 1}
    expect([200,204]).to include response.status
  end

  it "delivers the right JSON values" do
    get :show, :format => :JSON, :params => {:id => 1}
    expect(response.content_type).to eq("application/json")
  end
end