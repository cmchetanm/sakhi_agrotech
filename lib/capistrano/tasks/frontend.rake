namespace :frontend do
  desc "Install frontend dependencies"
  task :install do
    on roles(:app) do
      within release_path.join("frontend") do
        execute :npm, "ci"
      end
    end
  end

  desc "Build Next.js frontend"
  task :build do
    on roles(:app) do
      within release_path.join("frontend") do
        with rails_env: fetch(:rails_env, "production") do
          execute :npm, "run build"
          execute :cp, "-r public .next/standalone/"
          execute :cp, "-r .next/static .next/standalone/.next/"
        end
      end
    end
  end

  desc "Restart Next.js via PM2"
  task :restart do
    on roles(:app) do
      execute :pm2, "restart sakhiagrotech-frontend || pm2 start #{release_path.join('frontend')}/ecosystem.config.js"
    end
  end
end

before "deploy:updated", "frontend:install"
after "deploy:published", "frontend:build"
after "deploy:published", "frontend:restart"
