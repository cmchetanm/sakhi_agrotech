ActiveAdmin.register ContactSubmission do
  menu parent: "Inbox", label: "Contact Messages", priority: 1

  actions :index, :show, :destroy
  config.sort_order = "created_at_desc"

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :contact
    column(:message) { |record| truncate(record.message, length: 60) }
    column :created_at
    actions defaults: false do |record|
      item "View", admin_contact_submission_path(record)
      item "Delete", admin_contact_submission_path(record), method: :delete, data: { confirm: "Delete this message?" }
    end
  end

  filter :name
  filter :email
  filter :contact
  filter :created_at

  show do
    attributes_table do
      row :name
      row :email
      row :contact
      row :message do |record|
        simple_format(record.message)
      end
      row :created_at
    end
  end
end
