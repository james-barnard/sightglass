require 'rails_helper'

describe TestRunController do
  PROGRAM_INFO_KEYS = %w[run_time program_time step_count current_step status purpose]
  STEP_INFO_KEYS = %w[pending_time soaking_time run_time duration description status]
  TIMELINE_KEYS = %w[pending_time soaking_time run_time duration description status]
  let (:unfinished_test_run_data) { '[["5","26: step description",0,30000,"5",{"pending_time":"00:05","soaking_time":"00:25","run_time":"00:30","duration":"00:01","description":"step description","status":"completed"}],["5","27: step description",29000,59000,"6",{"pending_time":"00:05","soaking_time":"00:25","run_time":"00:30","duration":"00:01","description":"step description","status":"completed"}],["5","28: step description",59000,60000,"7",{"duration":"00:01","description":"step description","status":"","pending_time":"","soaking_time":"","run_time":"00:01"}]]' }
  let (:finished_test_run_data) { '[["1","29: step1 description",0,29000,"1",{"pending_time":"00:29","soaking_time":"00:00","run_time":"00:29","duration":"00:01","description":"step1 description","status":"completed"}],["1","30: step2 description",0,30000,"2",{"pending_time":"00:29","soaking_time":"00:00","run_time":"00:29","duration":"00:01","description":"step2 description","status":"done"}]]'}
  let (:test_run_no_step_statuses_data) { '[["2","38: step description",0,1000,"3",{"duration":"00:01","description":"step description","status":"","pending_time":"","soaking_time":"","run_time":"00:01"}],["2","39: step description",1000,2000,"4",{"duration":"00:01","description":"step description","status":"","pending_time":"","soaking_time":"","run_time":"00:01"}]]' }
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

  describe "#timeline" do
    it "gets the program forecast from the program model if the test run hasn't completed" do
      get :timeline, :format => :JSON, :params => {:id => 5}
      JSON.parse(response.body).each do |item|
        expect(item[0]).to be_a_kind_of(String)
        expect(item[1]).to be_a_kind_of(String)
        expect(item[2]).to be_a_kind_of(Integer)
        expect(item[3]).to be_a_kind_of(Integer)
        expect(item[4]).to be_a_kind_of(String)
        expect(item[5]).to be_a_kind_of(Hash)
        expect(item[5].keys.sort).to eq(TIMELINE_KEYS.sort)
      end
    end

    it "doesn't get anything from the program model if the last status is 'done'" do
      get :timeline, :format => :JSON, :params => {:id => 1}
      JSON.parse(response.body).each do |item|
        expect(item[0]).to be_a_kind_of(String)
        expect(item[1]).to be_a_kind_of(String)
        expect(item[2]).to be_a_kind_of(Integer)
        expect(item[3]).to be_a_kind_of(Integer)
        expect(item[4]).to be_a_kind_of(String)
        expect(item[5]).to be_a_kind_of(Hash)
        expect(item[5].keys.sort).to eq(TIMELINE_KEYS.sort)
      end
    end

    it "uses the program steps only if there are no step statuses" do
      get :timeline, :format => :JSON, :params => {:id => 3}
      JSON.parse(response.body).each do |item|
        expect(item[0]).to be_a_kind_of(String)
        expect(item[1]).to be_a_kind_of(String)
        expect(item[2]).to be_a_kind_of(Integer)
        expect(item[3]).to be_a_kind_of(Integer)
        expect(item[4]).to be_a_kind_of(String)
        expect(item[5]).to be_a_kind_of(Hash)
        expect(item[5].keys.sort).to eq(TIMELINE_KEYS.sort)
      end
    end

    it "delivers a hash with step status information" do
      get :timeline, :format => :JSON, :params => {:id => 1}
      expect(JSON.parse(response.body).first[5].keys.sort).to eq(STEP_INFO_KEYS.sort)
    end
  end
end