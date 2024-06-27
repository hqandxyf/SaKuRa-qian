const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:7001,
    proxy:{//反向代理（跨域）
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
