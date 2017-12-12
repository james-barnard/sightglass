class Program < ApplicationRecord
  has_many :steps
  has_many :test_runs
end
