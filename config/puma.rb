# config/puma.rb

directory "/home/ubuntu/sakhiagrotech/current"
rackup "/home/ubuntu/sakhiagrotech/current/config.ru"
environment "production"

workers 2
threads 4, 16

bind "unix:///home/ubuntu/sakhiagrotech/shared/tmp/sockets/puma.sock"

pidfile "/home/ubuntu/sakhiagrotech/shared/tmp/pids/puma.pid"
state_path "/home/ubuntu/sakhiagrotech/shared/tmp/pids/puma.state"

stdout_redirect "/home/ubuntu/sakhiagrotech/shared/log/puma.stdout.log",
                "/home/ubuntu/sakhiagrotech/shared/log/puma.stderr.log"

preload_app!

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
