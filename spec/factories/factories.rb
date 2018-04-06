FactoryBot.define do
  factory :test_run do
    id 1
    program_id 1
    name "Test Run Name"
    started_at Time.now
    completed_at nil
    status_final nil
  end

  factory :step_status do
    sequence(:id) { |n| n }
    # test_run 1
    # step
    status "pending"
    started_at Time.now
  end

  factory :program do
    id 1
    purpose "clean"
  end

  factory :step do
    id 1
    program
    description "step description"
    duration 1
    sequence(:sequence_number) { |n| n }
  end

  factory :component do
    sequence(:id) { |n| n }
    test_cell_id 1
    name "Component Name"
  end

  factory :component_state do
    sequence(:id) { |n| n }
    step
    component
    state "open"
    sequence_number 1
  end
end