const PROXY_CONFIG = {
    "/api/**": {
        "target": "http://127.0.0.1:3000",
        "changeOrigin": true,
        "ws": true,
        "cookieDomainRewrite": ""
    }
};

module.exports = PROXY_CONFIG;