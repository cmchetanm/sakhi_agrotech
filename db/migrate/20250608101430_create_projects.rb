class CreateProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :location
      t.text :description

      t.timestamps
    end
  end
end
