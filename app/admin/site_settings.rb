ActiveAdmin.register SiteSetting do
  menu parent: "Website Sections", label: "10. Footer & Site Info", priority: 10

  actions :all, except: [:destroy, :index]

  permit_params :whatsapp_number, :site_name, :tagline, :contact_email,
                :footer_tagline, :footer_tagline_highlight, :footer_description,
                :footer_contact_location, :footer_copyright, :footer_made_in,
                :footer_instagram_url, :footer_linkedin_url

  controller do
    def index
      redirect_to edit_admin_site_setting_path(SiteSetting.instance)
    end

    def new
      redirect_to edit_admin_site_setting_path(SiteSetting.instance)
    end
  end

  form do |f|
    div class: "flash flash_notice", style: "margin-bottom: 1.5rem;" do
      span "Global site info, footer content, and WhatsApp number for the Join section."
    end

    f.inputs "Site" do
      f.input :site_name
      f.input :tagline
      f.input :contact_email
      f.input :whatsapp_number,
              hint: "Country code + number, digits only (e.g. 919999999999)."
    end

    f.inputs "Footer" do
      f.input :footer_tagline
      f.input :footer_tagline_highlight
      f.input :footer_description, input_html: { rows: 3 }
      f.input :footer_contact_location
      f.input :footer_copyright
      f.input :footer_made_in
      f.input :footer_instagram_url
      f.input :footer_linkedin_url
    end

    f.actions
  end

  show do
    attributes_table do
      row :site_name
      row :tagline
      row :contact_email
      row :whatsapp_number
      row :whatsapp_url do |setting|
        if setting.whatsapp_url.present?
          link_to setting.whatsapp_url, setting.whatsapp_url, target: "_blank", rel: "noopener noreferrer"
        else
          span "Not set", class: "status_tag no"
        end
      end
      row :footer_tagline
      row :footer_tagline_highlight
      row :footer_description
      row :footer_contact_location
      row :footer_copyright
      row :footer_made_in
      row :footer_instagram_url
      row :footer_linkedin_url
      row :updated_at
    end
  end
end
