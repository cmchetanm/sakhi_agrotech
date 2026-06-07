json.join do
  json.label join.label
  json.headline do
    json.before join.headline_before
    json.highlight join.headline_highlight
    json.after join.headline_after
  end
  json.body join.body
  json.form_title join.form_title
  json.submit_label join.submit_label
  json.success_message join.success_message
  json.actions do
    json.child! do
      json.title join.action1_title
      json.subtitle join.action1_subtitle
      json.link join.action1_link_label
      json.href nil
    end
    json.child! do
      json.title join.action2_title
      json.subtitle join.action2_subtitle
      json.link join.action2_link_label
      json.href join.action2_href
    end
  end
  json.interests join.join_interests.map(&:label)
end
