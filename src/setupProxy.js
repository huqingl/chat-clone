const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://hhchat.site",
      // target: "http://shunyuanchat.site",
      changeOrigin: true,
      secure: false,
      // pathRewrite: { '^/api': '' }
    }),
    createProxyMiddleware("/file_api", {
      target: "http://hhchat.site",
      // target: "http://shunyuanchat.site",
      changeOrigin: true,
      secure: false,
      // pathRewrite: { '^/api': '' }
    })
  );
};
