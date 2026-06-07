ActiveAdmin.register TeamContent do
  menu parent: "Website Sections", label: "7. Team (section text)", priority: 7

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline, :body

  controller do
    def index
      redirect_to admin_team_content_path(TeamContent.instance)
    end

    def new
      redirect_to admin_team_content_path(TeamContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Team section header. Add individual people under 8. Team Members."
    end

    f.inputs do
      f.input :label
      f.input :headline
      f.input :body, input_html: { rows: 4 }
    end
    f.actions
  end
end
