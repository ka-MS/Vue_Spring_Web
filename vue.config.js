// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave : false,
//   devServer: {
//     proxy: {
//         '/': {
//             target: 'http://localhost:8080',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/': ''
//             }
//         }
//     }
// }
// })
module.exports = {
  lintOnSave : false,
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    proxy: {
        '/': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            ws: false, // 웹소켓 실행을 끄는 설정
            pathRewrite: {
                '^/': ''
            }
        }
    }
}
}