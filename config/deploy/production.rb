server "51.21.10.254", user: "ubuntu", roles: %w{app db web}

set :ssh_options, {
  forward_agent: true,
  auth_methods: %w[publickey],
  keys: ["~/.ssh/id_rsa"] # or your actual key file
}