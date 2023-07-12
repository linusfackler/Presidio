const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/chat',
    createProxyMiddleware({
      target: 'http://presidio.azurewebsites.net',
      // target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};