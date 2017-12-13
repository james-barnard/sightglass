require 'factory_bot_rails'

module TestDb

  def reset_database
    DatabaseCleaner.clean

    first_status_time = Time.now - 3030
    second_status_time = first_status_time + 30 
    prog1 = FactoryBot::create(:program)
    step1 = FactoryBot::create(:step, program: prog1)
    step2 = FactoryBot::create(:step, program: prog1)
    test_run1 = FactoryBot::create(:test_run, program: prog1)
    step_status1 = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step1,
                          started_at: first_status_time)
    step_status2 = FactoryBot::create(:step_status,
                          test_run: test_run1,
                          step: step2,
                          status: "soaking",
                          started_at: second_status_time)
  end
end