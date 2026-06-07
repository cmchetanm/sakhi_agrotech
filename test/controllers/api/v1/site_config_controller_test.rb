require "test_helper"

class Api::V1::SiteConfigControllerTest < ActionDispatch::IntegrationTest
  setup do
    SiteSetting.instance.update!(whatsapp_number: "919876543210")
  end

  test "should get site config" do
    get api_v1_site_config_url, as: :json
    assert_response :success

    body = JSON.parse(response.body)
    assert_equal "Sakhi Agrotech Pvt. Ltd.", body["site_name"]
    assert_equal "919876543210", body["whatsapp_number"]
  end
end
