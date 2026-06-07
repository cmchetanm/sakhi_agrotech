# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_06_09_100000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "contact_submissions", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "contact"
  end

  create_table "hero_contents", force: :cascade do |t|
    t.string "eyebrow"
    t.string "headline_before"
    t.string "headline_highlight"
    t.string "headline_after"
    t.text "body"
    t.string "cta_primary"
    t.string "cta_secondary"
    t.text "quote_text"
    t.string "quote_attribution"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hero_stats", force: :cascade do |t|
    t.bigint "hero_content_id", null: false
    t.integer "position", default: 0, null: false
    t.integer "value"
    t.string "suffix"
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hero_content_id"], name: "index_hero_stats_on_hero_content_id"
  end

  create_table "join_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline_before"
    t.string "headline_highlight"
    t.string "headline_after"
    t.text "body"
    t.string "form_title"
    t.string "submit_label"
    t.text "success_message"
    t.string "action1_title"
    t.string "action1_subtitle"
    t.string "action1_link_label"
    t.string "action2_title"
    t.string "action2_subtitle"
    t.string "action2_link_label"
    t.string "action2_href"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "join_interests", force: :cascade do |t|
    t.bigint "join_content_id", null: false
    t.integer "position", default: 0, null: false
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["join_content_id"], name: "index_join_interests_on_join_content_id"
  end

  create_table "journey_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline_before"
    t.string "headline_highlight"
    t.string "headline_after"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journey_milestones", force: :cascade do |t|
    t.bigint "journey_content_id", null: false
    t.integer "position", default: 0, null: false
    t.string "label"
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["journey_content_id"], name: "index_journey_milestones_on_journey_content_id"
  end

  create_table "produce_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline"
    t.text "body"
    t.string "cta"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "produce_items", force: :cascade do |t|
    t.bigint "produce_content_id", null: false
    t.integer "position", default: 0, null: false
    t.string "title"
    t.text "description"
    t.string "stat"
    t.string "default_icon_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["produce_content_id"], name: "index_produce_items_on_produce_content_id"
  end

  create_table "research_articles", force: :cascade do |t|
    t.bigint "research_content_id", null: false
    t.integer "position", default: 0, null: false
    t.string "tag"
    t.string "title"
    t.string "read_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["research_content_id"], name: "index_research_articles_on_research_content_id"
  end

  create_table "research_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline"
    t.text "body"
    t.string "layers_title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "research_layers", force: :cascade do |t|
    t.bigint "research_content_id", null: false
    t.integer "position", default: 0, null: false
    t.integer "num"
    t.string "color"
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["research_content_id"], name: "index_research_layers_on_research_content_id"
  end

  create_table "research_stats", force: :cascade do |t|
    t.bigint "research_content_id", null: false
    t.integer "position", default: 0, null: false
    t.string "value"
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["research_content_id"], name: "index_research_stats_on_research_content_id"
  end

  create_table "site_settings", force: :cascade do |t|
    t.string "whatsapp_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "site_name"
    t.string "tagline"
    t.string "contact_email"
    t.string "footer_tagline"
    t.string "footer_tagline_highlight"
    t.text "footer_description"
    t.string "footer_contact_location"
    t.string "footer_copyright"
    t.string "footer_made_in"
    t.string "footer_instagram_url"
    t.string "footer_linkedin_url"
  end

  create_table "stories_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline_part1"
    t.string "headline_part2"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "story_testimonials", force: :cascade do |t|
    t.bigint "stories_content_id", null: false
    t.integer "position", default: 0, null: false
    t.text "quote"
    t.string "author"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stories_content_id"], name: "index_story_testimonials_on_stories_content_id"
  end

  create_table "team_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "team_members", force: :cascade do |t|
    t.string "name"
    t.string "designation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.integer "position", default: 0, null: false
  end

  create_table "why_contents", force: :cascade do |t|
    t.string "label"
    t.string "headline"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "why_values", force: :cascade do |t|
    t.bigint "why_content_id", null: false
    t.integer "position", default: 0, null: false
    t.string "title"
    t.text "description"
    t.string "default_icon_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["why_content_id"], name: "index_why_values_on_why_content_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "hero_stats", "hero_contents"
  add_foreign_key "join_interests", "join_contents"
  add_foreign_key "journey_milestones", "journey_contents"
  add_foreign_key "produce_items", "produce_contents"
  add_foreign_key "research_articles", "research_contents"
  add_foreign_key "research_layers", "research_contents"
  add_foreign_key "research_stats", "research_contents"
  add_foreign_key "story_testimonials", "stories_contents"
  add_foreign_key "why_values", "why_contents"
end
