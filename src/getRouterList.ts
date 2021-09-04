import _ from 'lodash'
import { RouterMeta, RquiredConfig } from './types'
import { filterPath, getAllFiles, subStr, toCamelCase } from './utils'
import * as path from 'path'

export function getRouterList(config: RquiredConfig) {
  const routerList: RouterMeta[] = []
  const {
    srcDir,
    projectPath,
    pagesDir,
    firstPage,
    subPageDirs,
    exts,
    pageRegExps,
    pageIgnoreRegExps,
  } = config
  const srcPath = path.join(projectPath, srcDir)

  const srcPaths = getAllFiles(srcPath, exts)
  //过滤只有page的页面 pageIgnoreRegExps 优先
  const pagePaths = srcPaths.filter((srcPath) =>
    filterPath(srcPath, pageRegExps, pageIgnoreRegExps)
  )

  const subPaths: Record<string, string[]> = {}
  //筛选主要页面
  const mainPaths = pagePaths.filter((path) => {
    const shortSrcPath = path.substr(srcPath.length + 1)
    //判断是否subPackage
    const isSub = subPageDirs.some((subPageDir) => {
      if (shortSrcPath.startsWith(subPageDir)) {
        !subPaths[subPageDir] && (subPaths[subPageDir] = [])
        subPaths[subPageDir].push(path)
        return true
      }
      return false
    })

    if (isSub) {
      return false
    }
    return shortSrcPath.startsWith(pagesDir)
  })

  //对subPackage进行加工
  _.keys(subPaths).forEach((name) => {
    let paths = subPaths[name]
    const pages = paths.map((path) => {
      const withoutSrcPath = subStr(path, srcPath.length + 1, '.')
      return withoutSrcPath.substr(name.length + 1)
    })
    const cameName = toCamelCase(name)
    routerList.push({
      name: cameName,
      root: `${name}/`,
      path: null as any,
      type: 'sub',

      pages,
    })
  })

  //把首页排最前面
  mainPaths.sort((path) => (path.indexOf(firstPage) > -1 ? -1 : 1))

  //对主要页面加工
  mainPaths.forEach((path) => {
    const withoutSrcPath = subStr(path, srcPath.length + 1, '.')
    const page = withoutSrcPath.substr(pagesDir.length + 1)
    const name = toCamelCase(page)
    routerList.push({
      name,
      path: withoutSrcPath,
      type: 'main',
    })
  })

  return routerList
}
