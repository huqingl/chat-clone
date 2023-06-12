const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/", {
      target: "http://shunyuanchat.site",
      changeOrigin: true
      // pathRewrite: { '^/api1': '' }
    })
  );
  app.use(
    createProxyMiddleware("/api1/", {
      target: 'http://shunyuanchat.site:7000',
      changeOrigin: true,
    //   pathRewrite: { '^/api1': '' }
    })
  );
//   app.use(
//     createProxyMiddleware("/api1/", {
//       target: 'http://shunyuanchat.site:7000/',
//     //   target: "http://192.168.80.13:5000/",
//       changeOrigin: true,
//     //   pathRewrite: { '^/api1': '' }
//     })
//   );
};
