require "test_helper"
require "homepage_defaults"

class Api::V1::HomepageControllerTest < ActionDispatch::IntegrationTest
  setup { HomepageDefaults.seed! }

  test "returns homepage content structure" do
    get api_v1_homepage_url, headers: { "Accept" => "application/json" }

    assert_response :success
    body = response.parsed_body

    assert_equal "Sakhi Agrotech Pvt. Ltd.", body.dig("site", "site_name")
    assert body["hero"].key?("headline")
    assert body["hero"]["stats"].is_a?(Array)
    assert body["why"]["values"].is_a?(Array)
    assert body["journey"]["milestones"].is_a?(Array)
    assert body["produce"]["items"].is_a?(Array)
    assert body["research"]["layers"].is_a?(Array)
    assert body["stories"]["testimonials"].is_a?(Array)
    assert body["team"]["members"].is_a?(Array)
    assert body["join"]["interests"].is_a?(Array)
    assert body["footer"].key?("tagline")
  end
end
