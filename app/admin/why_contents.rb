ActiveAdmin.register WhyContent do
  menu parent: "Website Sections", label: "2. Why Sakhi", priority: 2

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline, :body,
                why_values_attributes: %i[id position title description default_icon_key icon _destroy]

  controller do
    def index
      redirect_to edit_admin_why_content_path(WhyContent.instance)
    end

    def new
      redirect_to edit_admin_why_content_path(WhyContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Why Sakhi section. Upload an SVG icon per card, or leave blank to use the default icon."
    end

    f.inputs "Section header" do
      f.input :label
      f.input :headline
      f.input :body, input_html: { rows: 4 }
    end

    f.has_many :why_values, heading: "Value cards", allow_destroy: true, new_record: true do |value|
      value.input :position
      value.input :title
      value.input :description, input_html: { rows: 3 }
      value.input :default_icon_key,
                  hint: "Fallback icon key (e.g. valueSprout, valueSun) when no SVG is uploaded."
      value.input :icon, as: :file, hint: admin_image_preview(value.object.icon, width: 48)
    end

    f.actions
  end
end
