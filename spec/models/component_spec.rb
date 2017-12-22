require 'rails_helper'

RSpec.describe Component, type: :model do
  before(:each) do
    TestDb::reset_database
  end
#  context "can determine the state of each component at any point in time" do
#    it "returns a record for every component" do
#      ComponentState.find(1).destroy
#      expect(Component.step_states(1).count).to eq (Component.count)
#    end
#  end
end
