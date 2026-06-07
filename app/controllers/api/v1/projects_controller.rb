module Api
  module V1
    class ProjectsController < BaseController
      def index
        @projects = Project.includes(project_images_attachments: :blob).order(created_at: :desc)
      end
    end
  end
end
