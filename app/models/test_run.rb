class TestRun < ApplicationRecord
  belongs_to :program
  has_many :step_statuses
end
