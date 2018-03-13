require 'factory_bot_rails'

module TestDb

  def reset_database
    DatabaseCleaner.clean

    first_status_time = Time.now - 3030
    second_status_time = first_status_time + 30 
    prog1 = FactoryBot::create(:program)
    step1 = FactoryBot::create(:step, program: prog1)
    step2 = FactoryBot::create(:step, id: 2, program: prog1)
    test_run1 = FactoryBot::create(:test_run, program: prog1)
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
  end
end