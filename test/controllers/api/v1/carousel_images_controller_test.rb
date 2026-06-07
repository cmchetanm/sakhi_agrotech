require "test_helper"

class Api::V1::CarouselImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_carousel_images_url, as: :json
    assert_response :success
    assert_equal "application/json", response.media_type
  end
end
