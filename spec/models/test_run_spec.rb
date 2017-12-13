require 'rails_helper'

RSpec.describe TestRun, type: :model do
  before(:each) do
    TestDb::reset_database
  end

  let(:test_run1) { TestRun.find 1 }
  let(:elapsed_time) { 30 }

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
    expect(test_run1.status).to eq ("soaking")
  end

end
