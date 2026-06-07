module Api
  module V1
    class InitiativesController < BaseController
      def index
        @initiatives = Initiative.all
      end
    end
  end
end
