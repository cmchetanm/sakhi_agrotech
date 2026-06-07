module Api
  module V1
    class TeamMembersController < BaseController
      def index
        @team_members = TeamMember.all
      end
    end
  end
end
