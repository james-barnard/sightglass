require 'rails_helper'

RSpec.describe Program, type: :model do
PROGRAM_SELECT_LIST_KEYS = %w[id key text value]

  before(:each) do
    TestDb::reset_database
  end

  let(:sample_hash) { {"id" => 1, "key" => 1, "value" => 1, "text" => "sample text"} }
  let(:sample_text) { "1 | sample text" }

  let(:program1_timeline) { [["1", "25: step description", 0, 1000, "1",
                              {:duration=>"00:01", :description=>"step description",
                               :status=>"", :pending_time=>"",
                               :soaking_time=>"", :run_time=>"00:01"}
                            ],
                            ["1", "26: step description", 1000, 2000, "2",
                              {:duration=>"00:01", :description=>"step description",
                               :status=>"",:pending_time=>"", 
                               :soaking_time=>"", :run_time=>"00:01"}
                            ]]
                         }

  let(:program1_program_info) {{ "program_time": "00:02", "step_count": 2, "program_purpose": "clean" }}

  describe '#convert_object' do
    it 'converts a Program object into hashes' do
      expect(Program.convert_object(Program.first)).to be_a_kind_of(Hash)
    end
  end

  describe '#format_text' do
    it 'combines the program purpose and id into text for the select list' do
      expect(Program.format_text(sample_hash)["text"]).to eq(sample_text)
    end
  end

  describe '#program_select_list' do
    it 'returns an array of the hashes representing all the programs in the database' do
      expect(Program.program_select_list).to be_a_kind_of(Array)
      expect(Program.program_select_list.count).to eq(3)
    end
  
    it 'has results with the correct keys' do
      expect(Program.program_select_list.first.keys.sort).to eq(PROGRAM_SELECT_LIST_KEYS)
    end
  end

  describe '#program_timeline' do
    it 'returns an array of all the steps in the program' do
      expect(Program.find(1).program_timeline).to eq(program1_timeline)
    end

    xit 'includes a step info object for each step'
  end

  describe '#program_program_info' do
    it 'returns an object with info about the program' do
      expect(Program.find(1).program_program_info).to eq(program1_program_info)
    end
  end
end
