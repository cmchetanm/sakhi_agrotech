namespace :frontend do
  def frontend_shell(cmd, dir:)
    %Q{bash -lc 'source "$HOME/.nvm/nvm.sh" && cd #{dir} && #{cmd}'}
  end

  desc "Install frontend dependencies"
  task :install do
    on roles(:app) do
      frontend_dir = release_path.join("frontend")
      execute frontend_shell("npm ci", dir: frontend_dir)
    end
  end

  desc "Build Next.js frontend"
  task :build do
    on roles(:app) do
      frontend_dir = release_path.join("frontend")
      execute frontend_shell(
        'RAILS_API_URL="https://sakhiagrotech.com" NEXT_PUBLIC_SITE_URL="https://sakhiagrotech.com" npm run build && cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/',
        dir: frontend_dir
      )
    end
  end

  desc "Restart Next.js via PM2"
  task :restart do
    on roles(:app) do
      frontend_dir = release_path.join("frontend")
      execute frontend_shell(
        "(pm2 restart sakhiagrotech-frontend || pm2 start ecosystem.config.js) && pm2 save",
        dir: frontend_dir
      )
    end
  end
end

before "deploy:updated", "frontend:install"
after "deploy:published", "frontend:build"
after "deploy:published", "frontend:restart"
