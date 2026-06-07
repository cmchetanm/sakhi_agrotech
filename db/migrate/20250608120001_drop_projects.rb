class DropProjects < ActiveRecord::Migration[7.2]
  def change
    drop_table :projects, if_exists: true
  end
end
