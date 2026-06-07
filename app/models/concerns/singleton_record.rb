module SingletonRecord
  extend ActiveSupport::Concern

  class_methods do
    def instance
      first || create!
    end
  end
end
