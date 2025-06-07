class CreateTeamMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :team_members do |t|
      t.string :name
      t.string :designation

      t.timestamps
    end
  end
end
