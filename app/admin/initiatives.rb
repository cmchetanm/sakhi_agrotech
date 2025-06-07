ActiveAdmin.register Initiative do
  permit_params :title, :description, :overlay_image, images: []
  remove_filter :images_attachment, :images_blob, :images, :overlay_image_attachment, :overlay_image_blob, :overlay_image
  


  form html: { multipart: true } do |f|
    f.inputs do
      f.input :title
      f.input :description

      f.input :overlay_image, as: :file, hint: (f.object.overlay_image.attached? ? image_tag(url_for(f.object.overlay_image), height: "100") : content_tag(:span, "No overlay image"))

      f.input :images, as: :file, input_html: { multiple: true }, hint: (f.object.images.attached? ? f.object.images.map { |img| image_tag(url_for(img), height: "60") }.join(" ").html_safe : content_tag(:span, "No carousel images"))
    end

    f.actions
  end

  show do
    attributes_table do
      row :title
      row :description
      row :overlay_image do |initiative|
        image_tag url_for(initiative.overlay_image), style: 'max-width: 150px; margin-right: 10px;' if initiative.overlay_image.attached?
      end
      row :images do |initiative|
        initiative.images.each do |img|
          div do
            image_tag url_for(img), style: 'max-width: 150px; margin-right: 10px;'
          end
        end
      end
    end
  end
end
