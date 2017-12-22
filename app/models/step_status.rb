class StepStatus < ApplicationRecord
  belongs_to :step
  belongs_to :test_run

end
