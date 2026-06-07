module.exports = {
  apps: [
    {
      name: "sakhiagrotech-frontend",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
