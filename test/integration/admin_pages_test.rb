require "test_helper"
require Rails.root.join("lib/homepage_defaults")

class AdminPagesTest < ActionDispatch::IntegrationTest
  setup do
    HomepageDefaults.seed!
    @admin = admin_users(:one)
    sign_in @admin
  end

  test "dashboard loads" do
    get admin_root_path
    assert_response :success
  end

  test "contact submissions pages load" do
    submission = contact_submissions(:one)

    get admin_contact_submissions_path
    assert_response :success

    get admin_contact_submission_path(submission)
    assert_response :success
  end

  test "admin users pages load" do
    get admin_admin_users_path
    assert_response :success

    get new_admin_admin_user_path
    assert_response :success

    get admin_admin_user_path(@admin)
    assert_response :success

    get edit_admin_admin_user_path(@admin)
    assert_response :success
  end

  {
    "hero" => [ :hero_contents, :hero_content, HeroContent ],
    "why sakhi" => [ :why_contents, :why_content, WhyContent ],
    "journey" => [ :journey_contents, :journey_content, JourneyContent ],
    "produce" => [ :produce_contents, :produce_content, ProduceContent ],
    "research" => [ :research_contents, :research_content, ResearchContent ],
    "stories" => [ :stories_contents, :stories_content, StoriesContent ],
    "team section" => [ :team_contents, :team_content, TeamContent ],
    "join" => [ :join_contents, :join_content, JoinContent ],
    "site settings" => [ :site_settings, :site_setting, SiteSetting ]
  }.each do |label, (index_route, member_route, model)|
    test "#{label} section opens edit form from menu" do
      record = model.instance

      get send("admin_#{index_route}_path")
      assert_redirected_to send("edit_admin_#{member_route}_path", record)

      follow_redirect!
      assert_response :success
    end
  end

  test "team members pages load" do
    member = team_members(:one)

    get admin_team_members_path
    assert_response :success

    get new_admin_team_member_path
    assert_response :success

    get admin_team_member_path(member)
    assert_response :success

    get edit_admin_team_member_path(member)
    assert_response :success
  end

  test "section edit forms accept updates" do
    patch admin_hero_content_path(HeroContent.instance), params: {
      hero_content: { eyebrow: "Updated eyebrow" }
    }
    assert_redirected_to admin_hero_content_path(HeroContent.instance)

    patch admin_why_content_path(WhyContent.instance), params: {
      why_content: { label: "Updated label" }
    }
    assert_redirected_to admin_why_content_path(WhyContent.instance)

    patch admin_journey_content_path(JourneyContent.instance), params: {
      journey_content: { label: "Updated label" }
    }
    assert_redirected_to admin_journey_content_path(JourneyContent.instance)

    patch admin_produce_content_path(ProduceContent.instance), params: {
      produce_content: { label: "Updated label" }
    }
    assert_redirected_to admin_produce_content_path(ProduceContent.instance)

    patch admin_research_content_path(ResearchContent.instance), params: {
      research_content: { label: "Updated label" }
    }
    assert_redirected_to admin_research_content_path(ResearchContent.instance)

    patch admin_stories_content_path(StoriesContent.instance), params: {
      stories_content: { label: "Updated label" }
    }
    assert_redirected_to admin_stories_content_path(StoriesContent.instance)

    patch admin_team_content_path(TeamContent.instance), params: {
      team_content: { label: "Updated label" }
    }
    assert_redirected_to admin_team_content_path(TeamContent.instance)

    patch admin_join_content_path(JoinContent.instance), params: {
      join_content: { label: "Updated label" }
    }
    assert_redirected_to admin_join_content_path(JoinContent.instance)

    patch admin_site_setting_path(SiteSetting.instance), params: {
      site_setting: { site_name: "Sakhi Agrotech" }
    }
    assert_redirected_to admin_site_setting_path(SiteSetting.instance)
  end

  test "team member form accepts updates" do
    member = team_members(:one)

    patch admin_team_member_path(member), params: {
      team_member: { name: "Updated Name", position: 1 }
    }
    assert_redirected_to admin_team_member_path(member)
  end

  private

  def sign_in(admin_user)
    post admin_user_session_path, params: {
      admin_user: { email: admin_user.email, password: "password123" }
    }
  end
end
