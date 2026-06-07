ActiveAdmin.register TeamMember do
  menu parent: "Website Sections", label: "8. Team Members", priority: 8

  permit_params :name, :designation, :description, :position, :photo

  remove_filter :photo_attachment, :photo_blob, :photo

  config.sort_order = "position_asc"

  index do
    selectable_column
    id_column
    column :position
    column :photo do |record|
      admin_image_preview(
        record.photo,
        width: 48,
        style: "width: 48px; height: 48px; object-fit: cover; border-radius: 50%;"
      )
    end
    column :name
    column :designation
    column :description do |record|
      truncate(record.description, length: 60)
    end
    actions
  end

  show do
    attributes_table do
      row :position
      row :name
      row :designation
      row :description
      row :photo do |record|
        admin_image_preview(
          record.photo,
          width: 120,
          style: "width: 120px; height: 120px; object-fit: cover; border-radius: 50%;"
        )
      end
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "People shown in the Team section cards. Lower position numbers appear first."
    end

    f.inputs do
      f.input :position
      f.input :name
      f.input :designation
      f.input :description, input_html: { rows: 3 }
      f.input :photo,
              as: :file,
              hint: admin_image_preview(
                f.object.photo,
                width: 80,
                style: "width: 80px; height: 80px; object-fit: cover; border-radius: 50%;"
              )
    end
    f.actions
  end
end
