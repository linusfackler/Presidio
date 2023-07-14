const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/chat',
    createProxyMiddleware({
      target: 'http://presidio.azurewebsites.net',
      changeOrigin: true,
    })
  );
};