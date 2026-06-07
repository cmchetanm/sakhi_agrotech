module Api
  module V1
    class HomepageController < BaseController
      def show
        @site = SiteSetting.instance
        @hero = HeroContent.includes(:hero_stats).instance
        @why = WhyContent.includes(:why_values).instance
        @journey = JourneyContent.includes(:journey_milestones).instance
        @produce = ProduceContent.includes(:produce_items).instance
        @research = ResearchContent.includes(:research_stats, :research_layers, :research_articles).instance
        @stories = StoriesContent.includes(:story_testimonials).instance
        @team = TeamContent.instance
        @team_members = TeamMember.ordered.includes(photo_attachment: :blob)
        @join = JoinContent.includes(:join_interests).instance
      end
    end
  end
end
