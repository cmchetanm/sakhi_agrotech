ActiveAdmin.register ProduceContent do
  menu parent: "Website Sections", label: "4. Produce", priority: 4

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline, :body, :cta, :basket_image,
                produce_items_attributes: %i[id position title description stat default_icon_key icon _destroy]

  controller do
    def index
      redirect_to admin_produce_content_path(ProduceContent.instance)
    end

    def new
      redirect_to admin_produce_content_path(ProduceContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Produce / basket section. Upload SVG icons per item or leave blank for defaults."
    end

    f.inputs "Section header" do
      f.input :label
      f.input :headline
      f.input :body, input_html: { rows: 4 }
      f.input :cta, label: "Call-to-action link text"
    end

    f.inputs "Basket image" do
      f.input :basket_image, as: :file, hint: admin_image_preview(f.object.basket_image, width: 200)
    end

    f.has_many :produce_items, heading: "Produce cards", allow_destroy: true, new_record: true do |item|
      item.input :position
      item.input :title
      item.input :description, input_html: { rows: 2 }
      item.input :stat
      item.input :default_icon_key, hint: "Fallback icon (e.g. produceTomato, produceGreens)."
      item.input :icon, as: :file, hint: admin_image_preview(item.object.icon, width: 48)
    end

    f.actions
  end
end
