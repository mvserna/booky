require_relative "../../lib/edition"

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
