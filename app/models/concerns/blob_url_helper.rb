module BlobUrlHelper
  extend ActiveSupport::Concern

  def blob_url_for(attachment)
    return unless attachment&.attached?

    rails_blob_url(attachment)
  end
end
