json.array! @team_members do |team_member|
  json.extract! team_member, :id, :name, :designation
  json.photo team_member.photo.attached? ? rails_blob_url(team_member.photo) : nil
end
