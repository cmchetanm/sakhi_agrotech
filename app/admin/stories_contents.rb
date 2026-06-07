ActiveAdmin.register StoriesContent do
  menu parent: "Website Sections", label: "6. Stories", priority: 6

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline_part1, :headline_part2, :body,
                story_testimonials_attributes: %i[id position quote author location _destroy]

  controller do
    def index
      redirect_to edit_admin_stories_content_path(StoriesContent.instance)
    end

    def new
      redirect_to edit_admin_stories_content_path(StoriesContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Stories / testimonials section on the homepage."
    end

    f.inputs "Section header" do
      f.input :label
      f.input :headline_part1, label: "Headline part 1"
      f.input :headline_part2, label: "Headline part 2 (highlight)"
      f.input :body, input_html: { rows: 4 }
    end

    f.has_many :story_testimonials, heading: "Testimonials", allow_destroy: true, new_record: true do |t|
      t.input :position
      t.input :quote, input_html: { rows: 3 }
      t.input :author
      t.input :location
    end

    f.actions
  end
end
