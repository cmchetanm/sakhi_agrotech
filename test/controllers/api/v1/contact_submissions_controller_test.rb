require "test_helper"

class Api::V1::ContactSubmissionsControllerTest < ActionDispatch::IntegrationTest
  test "should create contact submission with valid params" do
    assert_difference("ContactSubmission.count", 1) do
      post api_v1_contact_submissions_url, params: {
        contact_submission: {
          name: "Test User",
          email: "test@example.com",
          contact: "9876543210",
          message: "Hello, I would like to connect."
        }
      }, as: :json
    end

    assert_response :created
  end

  test "should not create contact submission with invalid params" do
    assert_no_difference("ContactSubmission.count") do
      post api_v1_contact_submissions_url, params: {
        contact_submission: {
          name: "",
          email: "invalid",
          contact: "123",
          message: "short"
        }
      }, as: :json
    end

    assert_response :unprocessable_entity
  end
end
