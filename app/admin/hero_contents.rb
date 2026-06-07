ActiveAdmin.register HeroContent do
  menu parent: "Website Sections", label: "1. Hero", priority: 1

  actions :all, except: %i[destroy index new create]

  permit_params :eyebrow, :headline_before, :headline_highlight, :headline_after, :body,
                :cta_primary, :cta_secondary, :quote_text, :quote_attribution, :hero_image,
                hero_stats_attributes: %i[id position value suffix label _destroy]

  controller do
    def index
      redirect_to edit_admin_hero_content_path(HeroContent.instance)
    end

    def new
      redirect_to edit_admin_hero_content_path(HeroContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the top banner on the homepage. Empty fields keep the current default text."
    end

    f.inputs "Header text" do
      f.input :eyebrow
      f.input :headline_before, label: "Headline (before highlight)"
      f.input :headline_highlight, label: "Headline highlight (green text)"
      f.input :headline_after, label: "Headline (after highlight)"
      f.input :body, input_html: { rows: 4 }
    end

    f.inputs "Buttons" do
      f.input :cta_primary, label: "Primary button label"
      f.input :cta_secondary, label: "Secondary button label"
    end

    f.inputs "Main image" do
      f.input :hero_image, as: :file, hint: admin_image_preview(f.object.hero_image, width: 240)
    end

    f.inputs "Quote card" do
      f.input :quote_text
      f.input :quote_attribution
    end

    f.has_many :hero_stats, heading: "Stats row", allow_destroy: true, new_record: true do |stat|
      stat.input :position
      stat.input :value
      stat.input :suffix
      stat.input :label
    end

    f.actions
  end

  show do
    attributes_table do
      row :eyebrow
      row :headline_before
      row :headline_highlight
      row :headline_after
      row :body
      row :cta_primary
      row :cta_secondary
      row :hero_image do |record|
        admin_image_preview(record.hero_image, width: 240)
      end
      row :quote_text
      row :quote_attribution
    end
  end
end
