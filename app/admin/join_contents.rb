ActiveAdmin.register JoinContent do
  menu parent: "Website Sections", label: "9. Join", priority: 9

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline_before, :headline_highlight, :headline_after, :body,
                :form_title, :submit_label, :success_message,
                :action1_title, :action1_subtitle, :action1_link_label,
                :action2_title, :action2_subtitle, :action2_link_label, :action2_href,
                join_interests_attributes: %i[id position label _destroy]

  controller do
    def index
      redirect_to edit_admin_join_content_path(JoinContent.instance)
    end

    def new
      redirect_to edit_admin_join_content_path(JoinContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Join section copy and form options. WhatsApp link comes from Footer & Site Info."
    end

    f.inputs "Section header" do
      f.input :label
      f.input :headline_before, label: "Headline (before highlight)"
      f.input :headline_highlight, label: "Headline highlight"
      f.input :headline_after, label: "Headline (after highlight)"
      f.input :body, input_html: { rows: 4 }
    end

    f.inputs "Contact cards" do
      f.input :action1_title, label: "Card 1 title"
      f.input :action1_subtitle, label: "Card 1 subtitle"
      f.input :action1_link_label, label: "Card 1 link label"
      f.input :action2_title, label: "Card 2 title"
      f.input :action2_subtitle, label: "Card 2 subtitle"
      f.input :action2_link_label, label: "Card 2 link label"
      f.input :action2_href, label: "Card 2 link URL"
    end

    f.inputs "Interest form" do
      f.input :form_title
      f.input :submit_label
      f.input :success_message, input_html: { rows: 3 }
    end

    f.has_many :join_interests, heading: "Interest options", allow_destroy: true, new_record: true do |interest|
      interest.input :position
      interest.input :label
    end

    f.actions
  end
end
