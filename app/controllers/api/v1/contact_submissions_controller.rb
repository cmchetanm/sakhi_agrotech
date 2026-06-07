module Api
  module V1
    class ContactSubmissionsController < BaseController
      def create
        @contact_submission = ContactSubmission.new(contact_submission_params)

        if @contact_submission.save
          render json: { message: "Thanks for contacting us! We'll get back to you soon." }, status: :created
        else
          render json: { errors: @contact_submission.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def contact_submission_params
        params.require(:contact_submission).permit(:name, :email, :contact, :message)
      end
    end
  end
end
