import { PluginOptions } from 'generated'
import { Config, defaultConfig } from './types'
import _ from 'lodash'
import { generateRouterService } from './generateRouterService'
import { getRouterList } from './getRouterList'
// import {modifyProjectConfig} from "./modifyProjectConfig";
// import {generateRouterService} from './generateRouterService'
// // import { modifyAppConfig } from './modifyAppConfig'
// import {modifyProjectConfig} from './modifyProjectConfig'

export default (options = {} as PluginOptions) => {
  const routerConfig: Config = options.config.taroRouter || {}

  const requiredConfig = resolveConfig(routerConfig)

  const routerList = getRouterList(requiredConfig)

  generateRouterService(routerList, requiredConfig)
  //以下2个修改不要
  // modifyAppConfig(routerList, requiredConfig)
  // modifyProjectConfig(routerList, requiredConfig)
}

function resolveConfig(routerConfig: { [index: string]: any }): Required<Config> {
  //合并默认设置
  routerConfig = { ...defaultConfig, ...routerConfig }
  _.keys(routerConfig).forEach((key: string) => {
    let value = routerConfig[key] || ''
    if (value instanceof String) {
      value = value.replace('\\', '/')
      routerConfig[key] = value
    }
  })
  return routerConfig as any
}

export * from './types'
