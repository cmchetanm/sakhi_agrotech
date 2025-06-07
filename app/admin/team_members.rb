ActiveAdmin.register TeamMember do
  permit_params :name, :designation, :photo
  remove_filter :photo_attachment, :photo_blob, :photo
  form do |f|
    f.inputs do
      f.input :name
      f.input :designation
      f.input :photo, as: :file
    end
    f.actions
  end

  show do
    attributes_table do
      row :name
      row :designation
      row :photo do |member|
        image_tag url_for(member.photo), style: 'width: 100px; height: 100px; object-fit: cover; border-radius: 50%;'
      end
    end
  end
end
