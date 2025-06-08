ActiveAdmin.register Project do
  permit_params :title, :location, :description, project_images: []
  remove_filter :project_images_attachment, :project_images_blob, :project_images

  form do |f|
    f.inputs 'Project Details' do
      f.input :title
      f.input :location
      f.input :description
      f.input :project_images, as: :file, input_html: { multiple: true }
    end
    f.actions
  end

  show do
    attributes_table do
      row :title
      row :location
      row :description
      row :project_images do |project|
        ul do
          project.project_images.each do |img|
            li do
              image_tag url_for(img), style: "width: 120px; height: auto;"
            end
          end
        end
      end
    end
  end

  index do
    selectable_column
    id_column
    column :title
    column :location
    column :description do |p|
      truncate(p.description, length: 100)
    end
    actions
  end
end
