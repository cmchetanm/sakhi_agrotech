ActiveAdmin.register ResearchContent do
  menu parent: "Website Sections", label: "5. Research", priority: 5

  actions :all, except: %i[destroy index new create]

  permit_params :label, :headline, :body, :layers_title, :photo,
                research_stats_attributes: %i[id position value label _destroy],
                research_layers_attributes: %i[id position num color title description _destroy],
                research_articles_attributes: %i[id position tag title read_time _destroy]

  controller do
    def index
      redirect_to admin_research_content_path(ResearchContent.instance)
    end

    def new
      redirect_to admin_research_content_path(ResearchContent.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Edits the Research section with stats, layered farming diagram, and article previews."
    end

    f.inputs "Section header" do
      f.input :label
      f.input :headline
      f.input :body, input_html: { rows: 4 }
      f.input :layers_title, label: "Layers section title"
    end

    f.inputs "Left photo" do
      f.input :photo, as: :file, hint: admin_image_preview(f.object.photo, width: 200)
    end

    f.has_many :research_stats, heading: "Stats", allow_destroy: true, new_record: true do |stat|
      stat.input :position
      stat.input :value
      stat.input :label
    end

    f.has_many :research_layers, heading: "Farming layers", allow_destroy: true, new_record: true do |layer|
      layer.input :position
      layer.input :num
      layer.input :color, hint: "Color token: leaf, vibrant, ochre, terracotta, soil"
      layer.input :title
      layer.input :description, input_html: { rows: 2 }
    end

    f.has_many :research_articles, heading: "Article previews", allow_destroy: true, new_record: true do |article|
      article.input :position
      article.input :tag
      article.input :title
      article.input :read_time, label: "Read time label"
    end

    f.actions
  end
end
