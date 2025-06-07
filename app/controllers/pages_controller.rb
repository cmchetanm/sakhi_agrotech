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
  end

  def connect
  end
end
