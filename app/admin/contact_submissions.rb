ActiveAdmin.register ContactSubmission do
  permit_params :name, :email, :contact, :message

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :contact
    column :message
    column :created_at
    actions
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
      row :message
      row :created_at
    end
  end
end
