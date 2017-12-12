class Step < ApplicationRecord
  has_many :component_states
  belongs_to :program
  has_many :components, through: :component_states
  has_many :test_runs, through: :step_statuses
end
