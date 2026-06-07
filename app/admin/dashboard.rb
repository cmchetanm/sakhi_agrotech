# frozen_string_literal: true

ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: "Dashboard"

  content title: "Dashboard" do
    columns do
      column do
        panel "Recent contact messages" do
          submissions = ContactSubmission.order(created_at: :desc).limit(8)

          if submissions.any?
            table_for submissions do
              column(:name) { |s| link_to s.name, admin_contact_submission_path(s) }
              column :email
              column(:message) { |s| truncate(s.message, length: 60) }
              column(:received) { |s| l(s.created_at, format: :short) }
            end
            para link_to "View all messages →", admin_contact_submissions_path
          else
            para "No messages yet."
          end
        end
      end

      column do
        panel "Website sections" do
          ul do
            li link_to "1. Hero", edit_admin_hero_content_path(HeroContent.instance)
            li link_to "2. Why Sakhi", edit_admin_why_content_path(WhyContent.instance)
            li link_to "3. Our Journey", edit_admin_journey_content_path(JourneyContent.instance)
            li link_to "4. Produce", edit_admin_produce_content_path(ProduceContent.instance)
            li link_to "5. Research", edit_admin_research_content_path(ResearchContent.instance)
            li link_to "6. Stories", edit_admin_stories_content_path(StoriesContent.instance)
            li link_to "7. Team (section text)", edit_admin_team_content_path(TeamContent.instance)
            li link_to "8. Team Members (#{TeamMember.count})", admin_team_members_path
            li link_to "9. Join", edit_admin_join_content_path(JoinContent.instance)
            li link_to "10. Footer & Site Info", edit_admin_site_setting_path(SiteSetting.instance)
          end
        end

        panel "Quick links" do
          ul do
            li link_to "View live site",
                       ENV.fetch("FRONTEND_URL", "https://sakhiagrotech.com"),
                       target: "_blank",
                       rel: "noopener noreferrer"
            li link_to "Manage admin users", admin_admin_users_path
          end
        end
      end
    end
  end
end
