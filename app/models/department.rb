class Department < ApplicationRecord
  has_many :items, dependant: :destroy
end
