require 'rails_helper'

RSpec.describe Program, type: :model do
PROGRAM_SELECT_LIST_KEYS = %w[id key text value]

  before(:each) do
    TestDb::reset_database
  end

  let(:sample_hash) { {"id" => 1, "key" => 1, "value" => 1, "text" => "sample text"} }
  let(:sample_text) { "1 | sample text" }

  let(:timeline_keys) { [:pending_time, :soaking_time, :run_time, :duration, :description, :status] }

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
    context 'starting at the beginning at the program' do
      it 'returns an array with the correct data types' do
        Program.find(1).program_timeline.each do |item|
          expect(item[0]).to be_a_kind_of(String)
          expect(item[1]).to be_a_kind_of(String)
          expect(item[2]).to be_a_kind_of(Integer)
          expect(item[3]).to be_a_kind_of(Integer)
          expect(item[4]).to be_a_kind_of(String)
          expect(item[5]).to be_a_kind_of(Hash)
          expect(item[5].keys.sort).to eq(timeline_keys.sort)
          expect(item[6]).to be_a_kind_of(Integer)
        end
      end
    end

    context 'starting in the middle of the program' do
      it 'returns an array with the correct data types' do
        Program.find(1).program_timeline(31, 2).each do |item|
          expect(item[0]).to be_a_kind_of(String)
          expect(item[1]).to be_a_kind_of(String)
          expect(item[2]).to be_a_kind_of(Integer)
          expect(item[3]).to be_a_kind_of(Integer)
          expect(item[4]).to be_a_kind_of(String)
          expect(item[5]).to be_a_kind_of(Hash)
          expect(item[5].keys.sort).to eq(timeline_keys.sort)
          expect(item[6]).to be_a_kind_of(Integer)
        end
      end
    end
  end

  describe '#program_program_info' do
    it 'returns an object with info about the program' do
      expect(Program.find(1).program_program_info).to eq(program1_program_info)
    end
  end
end
