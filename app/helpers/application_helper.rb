module ApplicationHelper
  def admin_image_preview(attachment, width: 100, style: nil)
    unless attachment&.attached?
      return content_tag(:span, "No image", class: "empty")
    end

    image_tag url_for(attachment), style: style || "max-width: #{width}px; height: auto; border-radius: 4px;"
  end
end
