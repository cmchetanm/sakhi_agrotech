# app/admin/carousel_images.rb
ActiveAdmin.register CarouselImage do
  permit_params :title, :image
  remove_filter :image_attachment, :image_blob, :image

  form do |f|
    f.inputs 'Carousel Image' do
      f.input :title
      f.input :image, as: :file
    end
    f.actions
  end

  show do
    attributes_table do
      row :title
      row :image do |carousel_image|
        if carousel_image.image.attached?
          image_tag url_for(carousel_image.image), width: '300'
        end
      end
    end
  end

  index do
    selectable_column
    id_column
    column :title
    column :image do |carousel_image|
      if carousel_image.image.attached?
        image_tag url_for(carousel_image.image), width: '100'
      end
    end
    actions
  end
end
