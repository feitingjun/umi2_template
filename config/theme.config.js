const thmemConfig = {
    theme: [
        {
            fileName: 'theme1.css',
            key:'theme1',
            name:'天空蓝',
            modifyVars: {
                '@primary-color': '#1890ff',
                '@link-color': '#1890ff',
                '@btn-primary-bg': '#1890ff'
            },
          },
          {
            fileName: 'theme2.css',
            key:'theme2',
            name:'青草绿',
            modifyVars: {
                '@primary-color': '#1DA57A',
                '@link-color': '#1DA57A',
                '@btn-primary-bg': '#1DA57A'
            },
          }
    ],
    // 是否压缩css
    min: true,
    // css module
    isModule: true,
    // 忽略 antd 的依赖
    ignoreAntd: false,
    // 忽略 pro-layout
    ignoreProLayout: false,
    // 不使用缓存
    cache: true,
}
export default thmemConfig;