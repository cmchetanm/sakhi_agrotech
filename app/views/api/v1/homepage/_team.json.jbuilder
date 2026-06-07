json.team do
  json.label team.label
  json.headline team.headline
  json.body team.body
  json.members team_members do |member|
    json.id member.id
    json.name member.name
    json.designation member.designation
    json.description member.description
    json.photo member.photo.attached? ? rails_blob_url(member.photo) : nil
  end
end
