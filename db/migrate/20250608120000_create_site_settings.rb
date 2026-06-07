class CreateSiteSettings < ActiveRecord::Migration[7.2]
  def change
    create_table :site_settings do |t|
      t.string :whatsapp_number

      t.timestamps
    end
  end
end
