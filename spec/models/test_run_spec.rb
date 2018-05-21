require 'rails_helper'

RSpec.describe TestRun, type: :model do
  before(:each) do
    TestDb::reset_database
  end

  let(:test_run1) { TestRun.find 1 }
  let(:elapsed_time) { 30 }
  let(:timeline_keys) { [:pending_time, :soaking_time, :run_time, :duration, :description, :status] }

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
      it "returns an array of arrays with the correct data types for the UI" do
        test_run1.timeline.each do |item|
          expect(item[0]).to be_a_kind_of(String)
          expect(item[1]).to be_a_kind_of(String)
          expect(item[2]).to be_a_kind_of(Integer)
          expect(item[3]).to be_a_kind_of(Integer)
          expect(item[4]).to be_a_kind_of(String)
          expect(item[5]).to be_a_kind_of(Hash)
          expect(item[5].keys.sort).to eq(timeline_keys.sort)
        end
      end 
    end

  describe '#test_run_select_list' do
    it 'gets a list of all the test runs with a given program id from the database' do
      expect(TestRun.test_run_select_list.first).to be_a_kind_of(TestRun)
      expect(TestRun.test_run_select_list.to_a.count).to eq(4)
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