ActiveAdmin.register ContactSubmission do
  permit_params :name, :email, :message

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :message
    column :created_at
    actions
  end

  filter :name
  filter :email
  filter :created_at

  show do
    attributes_table do
      row :name
      row :email
      row :message
      row :created_at
    end
  end
end
