module Api
  module V1
    class BaseController < ActionController::API
      include Rails.application.routes.url_helpers

      before_action :set_default_url_options

      private

      def set_default_url_options
        protocol = request.protocol.delete_suffix("://")
        ActiveStorage::Current.url_options = { host: request.host, port: request.optional_port, protocol: protocol }
        Rails.application.routes.default_url_options = { host: request.host, port: request.optional_port, protocol: protocol }
      end
    end
  end
end
