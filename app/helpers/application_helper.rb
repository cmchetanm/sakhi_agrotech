module ApplicationHelper
  def admin_image_preview(attachment, width: 100, style: nil)
    return status_tag("No image") unless attachment&.attached?

    image_tag url_for(attachment), style: style || "max-width: #{width}px; height: auto; border-radius: 4px;"
  end
end
