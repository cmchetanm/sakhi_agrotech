class AddContactToContactSubmissions < ActiveRecord::Migration[7.2]
  def change
    add_column :contact_submissions, :contact, :string
  end
end
