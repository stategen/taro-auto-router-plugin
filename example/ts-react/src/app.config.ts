import {RouterService} from "./service/routerService";
import Taro from  '@tarojs/taro';


export default {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  pages: [...RouterService.pages],
  subPackages: [
    ...RouterService.subPackages
  ],

} as Taro.Config
