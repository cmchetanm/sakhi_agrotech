namespace :frontend do
  def frontend_shell(cmd)
    %Q{bash -lc 'source "$HOME/.nvm/nvm.sh" && #{cmd}'}
  end

  desc "Install frontend dependencies"
  task :install do
    on roles(:app) do
      within release_path.join("frontend") do
        execute frontend_shell("npm ci")
      end
    end
  end

  desc "Build Next.js frontend"
  task :build do
    on roles(:app) do
      within release_path.join("frontend") do
        execute frontend_shell(
          'RAILS_API_URL="https://sakhiagrotech.com" NEXT_PUBLIC_SITE_URL="https://sakhiagrotech.com" npm run build && cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/'
        )
      end
    end
  end

  desc "Restart Next.js via PM2"
  task :restart do
    on roles(:app) do
      frontend_dir = release_path.join("frontend")
      execute frontend_shell(
        "cd #{frontend_dir} && (pm2 restart sakhiagrotech-frontend || pm2 start ecosystem.config.js) && pm2 save"
      )
    end
  end
end

before "deploy:updated", "frontend:install"
after "deploy:published", "frontend:build"
after "deploy:published", "frontend:restart"
