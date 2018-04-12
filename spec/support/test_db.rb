require 'factory_bot_rails'

module TestDb

  def reset_database
    DatabaseCleaner.clean

    first_status_time = Time.now - 3030
    second_status_time = first_status_time + 29
    # third_status_time = second_status_time + 30

# standard program with test runs
    prog1 = FactoryBot::create(:program, id: 1)

# this program has a test run but no step statuses
    prog2_not_run = FactoryBot::create(:program, id: 2,)

# this program has an extra step that hasn't been run
    prog3 = FactoryBot::create(:program, id: 3, purpose: "brew")

    step1 = FactoryBot::create(:step, program: prog1, description: "step1 description")
    step2 = FactoryBot::create(:step, id: 2, program: prog1, description: "step2 description")
    step21 = FactoryBot::create(:step, id: 3, program: prog2_not_run)
    step22 = FactoryBot::create(:step, id: 4, program: prog2_not_run)
    step31 = FactoryBot::create(:step, id: 5, program: prog3)
    step32 = FactoryBot::create(:step, id: 6, program: prog3)
    step33 = FactoryBot::create(:step, id: 7, program: prog3)

    test_run1 = FactoryBot::create(:test_run, id: 1, program_id: prog1.id)
    test_run2 = FactoryBot::create(:test_run, id: 2, program_id: prog1.id)
    test_run3 = FactoryBot::create(:test_run, id: 3, program_id: prog2_not_run.id)
    test_run5 = FactoryBot::create(:test_run, id: 5, program_id: prog3.id)

    step_status1p = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step1,
                          started_at: first_status_time)
    step_status1s = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step1,
                          status: "soaking",
                          started_at: second_status_time)
    step_status1c = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step1,
                          status: "completed",
                          started_at: second_status_time)
    step_status2p = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step2,
                          started_at: first_status_time)
    step_status2s = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step2,
                          status: "soaking",
                          started_at: second_status_time)
    step_status2c = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step2,
                          status: "completed",
                          started_at: second_status_time)
    step_status2d = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step2,
                          status: "done",
                          started_at: second_status_time + 1)

# step statuses for program3
    step_status31p = FactoryBot::create(:step_status,
                          test_run: test_run5,
                          step: step31,
                          started_at: first_status_time)
    step_status31s = FactoryBot::create(:step_status,
                          test_run: test_run5,
                          step: step31,
                          status: "soaking",
                          started_at: first_status_time + 5)
    step_status31c = FactoryBot::create(:step_status,
                          test_run: test_run5,
                          step: step31,
                          status: "completed",
                          started_at: first_status_time + 30)
    step_status32p = FactoryBot::create(:step_status,
                          test_run: test_run5,
                          step: step32,
                          started_at: second_status_time)
    step_status32s = FactoryBot::create(:step_status,
                          test_run: test_run5,
                          step: step32,
                          status: "soaking",
                          started_at: second_status_time + 5)
    step_status32c = FactoryBot::create(:step_status,
                          test_run: test_run5,
                          step: step32,
                          status: "completed",
                          started_at: second_status_time + 30)

    component1 = FactoryBot::create(:component, id: 1)
    component2 = FactoryBot::create(:component, id: 2)
    
    FactoryBot::create(:component_state,
                        id: 1,
                        step: step1,
                        component: component1)
    FactoryBot::create(:component_state,
                        id: 2,
                        step: step1,
                        component: component2)
    FactoryBot::create(:component_state,
                        id: 3,
                        step: step2,
                        component: component1,
                        state: "closed")
    FactoryBot::create(:component_state,
                        id: 4,
                        step: step2,
                        component: component2,
                        state: "closed")

# component states for program 2    
    FactoryBot::create(:component_state,
                        id: 5,
                        step: step21,
                        component: component1,
                        state: "closed")
    FactoryBot::create(:component_state,
                        id: 6,
                        step: step21,
                        component: component2,
                        state: "closed")
    FactoryBot::create(:component_state,
                        id: 7,
                        step: step22,
                        component: component1)
    FactoryBot::create(:component_state,
                        id: 8,
                        step: step22,
                        component: component2)

# component states for program 3
    FactoryBot::create(:component_state,
                        id: 9,
                        step: step31,
                        component: component1)
    FactoryBot::create(:component_state,
                        id: 10,
                        step: step31,
                        component: component2)
    FactoryBot::create(:component_state,
                        id: 11,
                        step: step32,
                        component: component1)
    FactoryBot::create(:component_state,
                        id: 12,
                        step: step32,
                        component: component2)
    FactoryBot::create(:component_state,
                        id: 13,
                        step: step33,
                        component: component1)
    FactoryBot::create(:component_state,
                        id: 14,
                        step: step33,
                        component: component2)
  end
end