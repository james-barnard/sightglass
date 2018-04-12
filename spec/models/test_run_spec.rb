require 'rails_helper'

RSpec.describe TestRun, type: :model do
  before(:each) do
    TestDb::reset_database
  end

  let(:test_run1) { TestRun.find 1 }
  let(:elapsed_time) { 30 }
  let(:test_run1_timeline) { [["1", "36: step1 description", 0, 29000, "1",
                              {:pending_time=>"00:29", :soaking_time=>"00:00", :run_time=>"00:29",
                               :duration=>"00:01", :description=>"step1 description",
                               :status=>"completed"}],
                              ["1", "37: step2 description", 0, 30000, "2",
                              {:pending_time=>"00:29", :soaking_time=>"00:00", :run_time=>"00:29",
                               :duration=>"00:01", :description=>"step2 description",
                               :status=>"done"}]] }

  it "knows how long the program took to run" do
    expect(test_run1.run_time).to eq(elapsed_time)
  end

  it "knows how long the program should take to run" do
    expect(test_run1.program_time).to eq(2)
  end

  it "knows how many steps it has" do
    expect(test_run1.step_count).to eq(2)
  end

  it "knows which step it is working on" do
    expect(test_run1.current_step).to eq(2)
  end

  it "knows the status of the step in progress" do
    expect(test_run1.step_statuses.last.status).to eq("done")
  end

  describe "#timeline" do
    context "for a completed program" do
      # todo: fix this spec so it is not dependant on running the whole suite
      it "returns an array with the step status information for each step in the program" do
        expect(test_run1.timeline).to eq(test_run1_timeline)
      end
    end

  describe '#test_run_select_list' do
    it 'gets a list of all the test runs with a given program id from the database' do
      expect(TestRun.test_run_select_list.first).to be_a_kind_of(TestRun)
      expect(TestRun.test_run_select_list.to_a.count).to eq(3)
    end
  end

  describe '#program_test_run_select_list' do
    it 'gets only the test runs for the selected program' do
      expect(TestRun.program_test_run_select_list(3).first.key).to eq(5)
      expect(TestRun.program_test_run_select_list(3).to_a.count).to eq(1)
    end
  end
end
end