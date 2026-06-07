module Api
  module V1
    class SiteConfigController < BaseController
      def show
        setting = SiteSetting.instance

        render json: {
          youtube_video_id: ENV["YOUTUBE_VIDEO_ID"],
          site_name: "Sakhi Agrotech Pvt. Ltd.",
          tagline: "Rooted in Nature. Driven by Innovation.",
          whatsapp_number: setting.whatsapp_number.presence
        }
      end
    end
  end
end
