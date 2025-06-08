class PagesController < ApplicationController
  def home
    @carousel_images = CarouselImage.all
    @initiatives = Initiative.all
    @team_members = TeamMember.all
  end

  def about
  end

  def initiatives
    @initiatives = Initiative.all
  end

  def video
  end

  def projects
    @projects = Project.includes(project_images_attachments: :blob).order(created_at: :desc)
  end



  def connect
  end
end
