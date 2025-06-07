class CreateCarouselImages < ActiveRecord::Migration[7.2]
  def change
    create_table :carousel_images do |t|
      t.string :title
      t.string :image

      t.timestamps
    end
  end
end
