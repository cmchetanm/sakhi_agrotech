ActiveAdmin.register SiteSetting do
  menu label: "Site Settings", priority: 2

  actions :all, except: [ :destroy, :index ]

  permit_params :whatsapp_number

  controller do
    def index
      redirect_to admin_site_setting_path(SiteSetting.instance)
    end

    def new
      redirect_to admin_site_setting_path(SiteSetting.instance)
    end
  end

  form do |f|
    f.inputs "Contact" do
      f.input :whatsapp_number,
              hint: "WhatsApp number with country code, digits only (e.g. 919999999999). Used for the Join section Chat link."
    end
    f.actions
  end

  show do
    attributes_table do
      row :whatsapp_number
      row :whatsapp_url do |setting|
        if setting.whatsapp_url.present?
          link_to setting.whatsapp_url, setting.whatsapp_url, target: "_blank", rel: "noopener noreferrer"
        else
          status_tag "Not set"
        end
      end
      row :updated_at
    end
  end
end
