import { PluginOptions } from 'generated'
import { Config, defaultConfig } from './types'
import _ from 'lodash'
import { generateRouterService } from './generateRouterService'
import { getRouterList } from './getRouterList'
import { generateTaroPagesFile } from './generateTaroPagesFile'

export default (options = {} as PluginOptions) => {
  //获取配置
  const routerConfig: Config = options.config.taroRouter || {}

  //配置添加默认值
  const requiredConfig = resolveConfig(routerConfig)

  //得到所有pages列表
  const routerList = getRouterList(requiredConfig)

  //生成taroPages页供 app.config.ts引用,并且得到navigator的methods
  const methods = generateTaroPagesFile(routerList, requiredConfig)

  //生成routerService
  generateRouterService(methods, requiredConfig)
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
