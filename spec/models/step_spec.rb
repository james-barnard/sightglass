require 'rails_helper'

RSpec.describe Step, type: :model do
  let(:step1) { Step.find(1) }
  let(:step2) { Step.find(2) }
  before(:each) do
    TestDb::reset_database
  end
  # context "can determine the state of each component at any point in time" do
   # it "returns a record for every component" do
   #   ComponentState.find(1).destroy
   #   expect(step1.states.count).to eq (Component.count)
   # end

   # context "when it is on the first step" do
   #   it "and all the component states are set" do
   #     expect(step1.states.map{ |m| m.state }).to eq (%w(open open))
   #   end

    #  it "and one of the component states is not set" do
    #    ComponentState.find(1).destroy
    #    expect(step1.states.map{ |m| m.state }).to eq (%w(unknown open))
    #  end
    #end
  #end
end
