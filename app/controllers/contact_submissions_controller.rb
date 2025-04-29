class ContactSubmissionsController < ApplicationController
    def create
      @submission = ContactSubmission.new(submission_params)
      if @submission.save
        redirect_to contact_path, notice: "Thanks for contacting us! We'll get back to you soon."
    else
        flash[:alert] = "Something went wrong. Please try again."
        render :new
      end
    end
  
    private
  
    def submission_params
      params.require(:contact_submission).permit(:name, :email, :message)
    end
  end
  