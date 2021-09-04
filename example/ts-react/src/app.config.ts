const { pages, subPackages } = require('./service/taroPages')


export default {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  pages: [...pages],

  subPackages: [
    ...subPackages
  ],

} as Taro.Config
