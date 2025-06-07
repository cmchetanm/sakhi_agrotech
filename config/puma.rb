# config/puma.rb

directory '/home/ubuntu/sakhiagrotech/current'
rackup "/home/ubuntu/sakhiagrotech/current/config.ru"
environment 'production'

# Set the number of Puma workers and threads
workers 2
threads 4, 16

# Set the bind address and location for sockets
bind "unix:///home/ubuntu/sakhiagrotech/shared/tmp/sockets/puma.sock"

# PID and state paths
pidfile "/home/ubuntu/sakhiagrotech/shared/tmp/pids/puma.pid"
state_path "/home/ubuntu/sakhiagrotech/shared/tmp/pids/puma.state"

stdout_redirect "/home/ubuntu/sakhiagrotech/shared/log/puma.stdout.log", "/home/ubuntu/sakhiagrotech/shared/log/puma.stderr.log"

# Preload the application for faster worker boot
preload_app!

# Allow Puma to be restarted by `rails restart` or `pumactl restart`
on_worker_boot do
  ActiveRecord::Base.establish_connection
end
