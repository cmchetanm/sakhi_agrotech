require "test_helper"

class ApplicationHelperTest < ActionView::TestCase
  include ApplicationHelper

  test "admin_image_preview renders placeholder when attachment is missing" do
    hero = HeroContent.instance

    assert_includes admin_image_preview(hero.hero_image), "No image"
  end
end
