server "your-ec2-ip", user: "ubuntu", roles: %w{app db web}

set :ssh_options, {
  forward_agent: true,
  auth_methods: %w[publickey],
  keys: ["~/.ssh/your-ec2-key.pem"]
}
