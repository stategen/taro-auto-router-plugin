# toro-auto-router-plugin

让你的 Taro 路由跳转拥有类似 umi 框架约定式路由的体验。

## 简介

Taro 中内置了路由功能，这极大的方便了开发者。我们开发一个小程序页面时，流程是这样的。

> - 新建页面文件
> - app.config.ts 配置页面路径

使用时，需要在方法里书写完整页面路径。

```tsx
navigateTo({ url: '/package-test/pages/test/index?id=1' })
```

比较好的开发方式应当是将所有页面路径维护到一个单独的路径映射表中。

```tsx
navigateTo({ url: `${URLs.Test}?id=1` })
```

但这样的话，虽然方便了调用，但又需要多维护一份路由映射表文件。

因而这个脚本诞生了。

## 作用

> - ~~自动配置 `app.config.ts` 文件进行页面注册~~
> - ~~自动配置 `project.config.json` 文件，添加开发者工具页面编译快捷入口~~
> - 自动生成 `routerService` 文件，使得路由调用跳转更便捷。和之前生成不同，这里采用依赖倒置原则，常理化,便于在代码更灵活调用
> - 配合[webpack-plugin-chokidar](https://github.com/LuckyHH/webpack-plugin-chokidar)插件，新建页面文件后，将自动运行脚本，生成各项配置。

```ts
//RouterService.ts
/**
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be overrided
 */
import { navigateTo } from "@common/utils"

export namespace RouterService {
  export const pages_test_index = "package-test/pages/test/index"
  export const nest_index = "pages/subPackage/nest/index"
  export const test_index = "pages/subPackage/test/index"
  export const index_index = "pages/index/index"
  //_代表文件夹，原文件名中-_转换为驼峰， 
  export const firstPage_FirstPage = "pages/firstPage/FirstPage"
  export const pages = [
    index_index,
    firstPage_FirstPage,

  ]
    
  export const subPackages = [{
    "name": "packageTest",
    "root": "package-test/",
    "pages": [
      "pages/test/index"
    ]
  }, {
    "name": "pages_subPackage",
    "root": "pages/subPackage/",
    "pages": [
      "nest/index",
      "test/index"
    ]
  }]
  export const toPages_test_index = <T>(data?: T, opt?: any) => navigateTo(pages_test_index, data as any, opt as any)
  export const toNest_index = <T>(data?: T, opt?: any) => navigateTo(nest_index, data as any, opt as any)
  export const toTest_index = <T>(data?: T, opt?: any) => navigateTo(test_index, data as any, opt as any)
  export const toIndex_index = <T>(data?: T, opt?: any) => navigateTo(index_index, data as any, opt as any)
  export const toFirstPage_FirstPage = <T>(data?: T, opt?: any) => navigateTo(firstPage_FirstPage, data as any, opt as any)
}

```
不再修改app.config.ts
```ts
//app.config.ts
import {RouterService} from "./service/routerService";
import Taro from  '@tarojs/taro';


export default {
    //pages,subPackages采用依赖倒置,永远不变 
    pages: [...RouterService.pages],
    subPackages: [
        ...RouterService.subPackages
    ],
    //... 
} as Taro.Config


```
## 环境

`taro typescript`

支持 react, vue

## 效果

![效果图](./example.gif)

## 安装 (没有注册到npm,暂时只安装到本地私人仓库)

```bash
npm i toro-auto-router-plugin -D
```

## 使用

经过配置后，使用非常简单，只需要新建页面文件，即可直接进行调用。

```tsx
<View onClick={() => routerService.toTest({ id: 1 })}>跳转</View>
```

注意: 嫌配置麻烦的，可直接拷贝 example 代码进行使用

## 配置

**_注: 会将 [package-(module)/]pages/(page-name).[tsx|vue]_** 自动识别为页面

### 注册插件

1、在根目录新建 generated 配置文件 .generatedrc.ts

2、注册插件

```ts
import { GeneratedrcConfig } from 'generated'

const generatedrc: GeneratedrcConfig = {
  configDir: './gconfig', // generated 插件配置目录
  plugins: [
    'toro-auto-router-plugin', // 注册插件
  ],
}

export default generatedrc
```

### 配置插件

1、在根目录新建 `gconfig` 文件夹，文件夹下新建 `router.ts` 配置文件.

2、写入配置

```ts
import { Config } from 'toro-auto-router-plugin/src/types'

const basePath = process.cwd()

export const taroRouter: Config = {
    //注释部分为默认值
    // projectPath: process.cwd(),
    // srcDir: 'src',
    // firstPage: '/index/',
    // pagesDir: 'pages',
    // exts: ['.tsx', '.jsx', '.vue'],
    // pageNameRegs: [/^index/i, /page/i],
    // pageNameIgnoreRegs: [/_x$/i],
    projectPath: basePath,
    subPageDirs:['package-test','pages/subPackage'],
    appConfigPath: basePath + '/src/app.config.ts',
    projectConfigPath: basePath + '/project.config.json',

    outputFileName: 'service/routerService',
    navigateFnName: 'navigateTo',
    navigateSpecifier: '@common/utils',
}

```

注意:

> - 这里 `taroRouter` 名称不能变
> - 配置的函数（navigateFnName）需要满足传参为 customNavigateTo(pagePath: string, data: Object, opt: Object)

### 配置命令

1、在 `package.json` 中写入生成命令

```json
  "scripts": {
    "gen": "generated",
  }
```

2、运行命令即可生成 `routerService.ts` 文件

```bash
npm run gen
```

## 路由方法

工具内部没有直接使用 taro 原生的 `navigateTo` 方法，而是需要手动配置方法。一是因为 taro 导出的路由 API 并不好用，二是 API 封装在内部，自定义程度不够高。您可以在保证函数传参条件的情况下，随意进行函数实现

```tsx
import { navigateTo } from '@tarojs/taro'

export function customNavigateTo(pagePath: string, data?: any, opt?: any) {
  const url = createFinalURL(pagePath, data)
  navigateTo({ url, ...opt })
}
```

## 监听文件变更自动运行命令

新建文件后，手动运行 `generated` 命令还是不够方便，因而，我设计了一个集成 [chokidar](https://github.com/paulmillr/chokidar) 的 webpack 插件[webpack-plugin-chokidar](https://github.com/LuckyHH/webpack-plugin-chokidar)，通过该插件，可以很容易的对文件更改进行监听，然后利用 shelljs 执行脚本即可。

## 案例

> - [React + Typescript](./example/ts-react/config/index.js)
> - [Vue3 + Typescript](./example/ts-vue/config/index.js)
