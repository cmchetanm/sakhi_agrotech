Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(
      "localhost:3000",
      "127.0.0.1:3000",
      "https://sakhiagrotech.com",
      "http://sakhiagrotech.com"
    )

    resource "/api/*",
      headers: :any,
      methods: [ :get, :post, :options ],
      credentials: false
  end
end
