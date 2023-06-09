const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/', { 
            target: 'http://shunyuanchat.site:5000/',
            changeOrigin: true,
            // pathRewrite: { '^/api1': '' }
        })
    )
}

