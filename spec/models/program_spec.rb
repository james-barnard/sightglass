require 'rails_helper'

RSpec.describe Program, type: :model do
PROGRAM_SELECT_LIST_KEYS = %w[id key text value]

  before(:each) do
    TestDb::reset_database
  end

  let(:sample_hash) { {"id" => 1, "key" => 1, "value" => 1, "text" => "sample text"} }
  let(:sample_text) { "1 | sample text" }

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
end
