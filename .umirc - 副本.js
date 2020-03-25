
// ref: https://umijs.org/config/
import themeConfig from './theme.config';
export default {
treeShaking: true,
    // routes: [
    //   {
    //     path: '/',
    //     component: '../layouts/index',
    //     routes: [
    //       { path: '/', component: '../pages/index' }
    //     ]
    //   }
    // ],
    history: 'hash',
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: {
                immer: true
            },
            dynamicImport: true,
            title: '老年大学',
            dll: false,
            routes: {
                exclude: [
                    /models\//,
                    /services\//,
                    /model\.(t|j)sx?$/,
                    /service\.(t|j)sx?$/,
                    /components\//,
                ],
            },
        }],[
            'umi-plugin-antd-theme', themeConfig
        ]
    ],
    theme: {},
    publicPath: './',
    hash: true, //开启文件hash名
    proxy: {
        "/api": {
          "target": "http://jsonplaceholder.typicode.com/",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
    }
}
