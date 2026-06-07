class CreateHomepageContent < ActiveRecord::Migration[7.2]
  def change
    change_table :site_settings do |t|
      t.string :site_name
      t.string :tagline
      t.string :contact_email
      t.string :footer_tagline
      t.string :footer_tagline_highlight
      t.text :footer_description
      t.string :footer_contact_location
      t.string :footer_copyright
      t.string :footer_made_in
      t.string :footer_instagram_url
      t.string :footer_linkedin_url
    end

    create_table :hero_contents do |t|
      t.string :eyebrow
      t.string :headline_before
      t.string :headline_highlight
      t.string :headline_after
      t.text :body
      t.string :cta_primary
      t.string :cta_secondary
      t.text :quote_text
      t.string :quote_attribution
      t.timestamps
    end

    create_table :hero_stats do |t|
      t.references :hero_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.integer :value
      t.string :suffix
      t.string :label
      t.timestamps
    end

    create_table :why_contents do |t|
      t.string :label
      t.string :headline
      t.text :body
      t.timestamps
    end

    create_table :why_values do |t|
      t.references :why_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.string :title
      t.text :description
      t.string :default_icon_key
      t.timestamps
    end

    create_table :journey_contents do |t|
      t.string :label
      t.string :headline_before
      t.string :headline_highlight
      t.string :headline_after
      t.text :body
      t.timestamps
    end

    create_table :journey_milestones do |t|
      t.references :journey_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.string :label
      t.string :title
      t.text :description
      t.timestamps
    end

    create_table :produce_contents do |t|
      t.string :label
      t.string :headline
      t.text :body
      t.string :cta
      t.timestamps
    end

    create_table :produce_items do |t|
      t.references :produce_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.string :title
      t.text :description
      t.string :stat
      t.string :default_icon_key
      t.timestamps
    end

    create_table :research_contents do |t|
      t.string :label
      t.string :headline
      t.text :body
      t.string :layers_title
      t.timestamps
    end

    create_table :research_stats do |t|
      t.references :research_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.string :value
      t.string :label
      t.timestamps
    end

    create_table :research_layers do |t|
      t.references :research_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.integer :num
      t.string :color
      t.string :title
      t.text :description
      t.timestamps
    end

    create_table :research_articles do |t|
      t.references :research_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.string :tag
      t.string :title
      t.string :read_time
      t.timestamps
    end

    create_table :stories_contents do |t|
      t.string :label
      t.string :headline_part1
      t.string :headline_part2
      t.text :body
      t.timestamps
    end

    create_table :story_testimonials do |t|
      t.references :stories_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.text :quote
      t.string :author
      t.string :location
      t.timestamps
    end

    create_table :team_contents do |t|
      t.string :label
      t.string :headline
      t.text :body
      t.timestamps
    end

    create_table :join_contents do |t|
      t.string :label
      t.string :headline_before
      t.string :headline_highlight
      t.string :headline_after
      t.text :body
      t.string :form_title
      t.string :submit_label
      t.text :success_message
      t.string :action1_title
      t.string :action1_subtitle
      t.string :action1_link_label
      t.string :action2_title
      t.string :action2_subtitle
      t.string :action2_link_label
      t.string :action2_href
      t.timestamps
    end

    create_table :join_interests do |t|
      t.references :join_content, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.string :label
      t.timestamps
    end

    change_table :team_members do |t|
      t.text :description
      t.integer :position, null: false, default: 0
    end

    drop_table :carousel_images, if_exists: true
    drop_table :initiatives, if_exists: true
  end
end
