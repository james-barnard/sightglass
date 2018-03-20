require 'rails_helper'

RSpec.describe TestRun, type: :model do
  before(:each) do
    TestDb::reset_database
  end

  let(:test_run1) { TestRun.find 1 }
  let(:elapsed_time) { 30 }
  let(:test_run1_timeline) { [["1", "25: step description", 0, 30000, "1",
                              {:pending_time=>30, :soaking_time=>0, :run_time=>30,
                               :duration=>1, :description=>"step description",
                               :status=>"completed"}],
                              ["1", "26: step description", 0, 30000, "2",
                              {:pending_time=>30, :soaking_time=>0, :run_time=>30,
                               :duration=>1, :description=>"step description",
                               :status=>"completed"}]] }

  it "knows how long the program took to run" do
    expect(test_run1.run_time).to eq (elapsed_time)
  end

  it "knows how long the program should take to run" do
    expect(test_run1.program_time).to eq (2)
  end

  it "knows how many steps it has" do
    expect(test_run1.step_count).to eq (2)
  end

  it "knows which step it is working on" do
    expect(test_run1.current_step).to eq (2)
  end

  it "knows the status of the step in progress" do
    expect(test_run1.step_statuses.last.status).to eq ("completed")
  end

  describe "#timeline" do
    context "for a completed program" do
      # todo: fix this spec so it is not dependant on running the whole suite
      it "returns an array with the step status information for each step in the program" do
        expect(test_run1.timeline).to eq(test_run1_timeline)
      end
    end

    context "for a future program" do
      it "returns an array with the information for each step"
    end
    
    it "includes the step info in a hash"
  end

end
