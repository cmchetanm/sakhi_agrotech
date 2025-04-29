lock "~> 3.19.2"

set :application, "sakhiagrotech"
set :repo_url, "git@github.com:cmchetanm/sakhi_agrotech.git"

# Deploy directory on server
set :deploy_to, "/home/ubuntu/#{fetch(:application)}"

set :rvm_type, :user
set :rvm_ruby_version, '3.2.2' # adjust to match your version

# Linked files & directories (customize if needed)
append :linked_files, "config/master.key"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
set :branch, "main" # ← change to whatever your main branch is


set :keep_releases, 5

set :puma_service_unit_name, "puma_#{fetch(:application)}_production"
# Puma config
set :puma_threads, [4, 16]
set :puma_workers, 2
set :puma_threads, [4, 16]
set :puma_workers, 2
set :puma_preload_app, true
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_log, "#{shared_path}/log/puma.log"
set :puma_env, fetch(:rack_env, fetch(:rails_env, 'production'))


after 'deploy:publishing', 'puma:restart'