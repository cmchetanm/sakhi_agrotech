lock "~> 3.18.0"

set :application, "sakhiagrotech"
set :repo_url, "git@github.com:yourusername/sakhiagrotech.git"

# Deploy directory on server
set :deploy_to, "/home/ubuntu/#{fetch(:application)}"

# rbenv setup
set :rbenv_type, :user
set :rbenv_ruby, '3.2.2' # or your Ruby version

# Files and dirs that should persist between deploys
append :linked_files, "config/master.key", "config/database.yml"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

set :keep_releases, 5
