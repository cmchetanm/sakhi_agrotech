require "test_helper"

class Api::V1::InitiativesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_initiatives_url, as: :json
    assert_response :success
  end
end
