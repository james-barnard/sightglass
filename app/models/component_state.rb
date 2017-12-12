class ComponentState < ApplicationRecord
  belongs_to :step
  belongs_to :component
end
