json.site do
  json.youtube_video_id ENV["YOUTUBE_VIDEO_ID"]
  json.site_name site.site_name
  json.tagline site.tagline
  json.whatsapp_number site.whatsapp_number.presence
  json.contact_email site.contact_email
end

json.footer do
  json.tagline site.footer_tagline
  json.tagline_highlight site.footer_tagline_highlight
  json.description site.footer_description
  json.contact do
    json.location site.footer_contact_location
    json.email site.contact_email
  end
  json.copyright site.footer_copyright
  json.made_in site.footer_made_in
  json.social do
    json.instagram site.footer_instagram_url
    json.linkedin site.footer_linkedin_url
  end
end

json.partial! "api/v1/homepage/hero", hero: hero
json.partial! "api/v1/homepage/why", why: why
json.partial! "api/v1/homepage/journey", journey: journey
json.partial! "api/v1/homepage/produce", produce: produce
json.partial! "api/v1/homepage/research", research: research
json.partial! "api/v1/homepage/stories", stories: stories
json.partial! "api/v1/homepage/team", team: team, team_members: team_members
json.partial! "api/v1/homepage/join", join: join
