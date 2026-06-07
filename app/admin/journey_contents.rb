ActiveAdmin.register JourneyContent do
  menu parent: "Website Sections", label: "3. Our Journey", priority: 3

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline_before, :headline_highlight, :headline_after, :body, :side_image,
                journey_milestones_attributes: %i[id position label title description _destroy]

  controller do
    def index
      redirect_to admin_journey_content_path(JourneyContent.instance)
    end

    def new
      redirect_to admin_journey_content_path(JourneyContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Journey section with the timeline on the right and photo on the left."
    end

    f.inputs "Section header" do
      f.input :label
      f.input :headline_before, label: "Headline (before highlight)"
      f.input :headline_highlight, label: "Headline highlight"
      f.input :headline_after, label: "Headline (after highlight)"
      f.input :body, input_html: { rows: 4 }
    end

    f.inputs "Side photo" do
      f.input :side_image, as: :file, hint: admin_image_preview(f.object.side_image, width: 200)
    end

    f.has_many :journey_milestones, heading: "Timeline milestones", allow_destroy: true, new_record: true do |m|
      m.input :position
      m.input :label, hint: "Small label (e.g. Today, Season)"
      m.input :title
      m.input :description, input_html: { rows: 3 }
    end

    f.actions
  end
end
