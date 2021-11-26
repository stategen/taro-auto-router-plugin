import * as fs from 'fs'
import * as path from 'path'
import _ from 'lodash'

export function upFirst(s: string = '') {
  return s.replace(/^[a-z]/, (g) => g.toUpperCase())
}

export function formatter(name = '') {
  return name.replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase())
}

export function toCamelCase(str: string): string {
  //先把-或_转换为驼峰
  const arr = str.split(/[ \-_]+/)
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
  }

  //再把文件夹\或/转换为下划线
  const dest = arr.join('')
  const destArr = dest.split(/[\/\\]+/)
  return destArr.join('_')
}

/***
 * \文件夹转换为/
 * @param fPath
 */
export const toLinuxPath = (fPath: String) => fPath.replace(/\\/g, '/')

/**
 * 给定的文件夹，跟据后缀名获取所有文件
 * @param dir
 * @param exts
 */
export function getAllFiles(dir: string, exts: string[]) {
  const paths: string[] = []

  function findFiles(subDir: string) {
    let files = fs.readdirSync(subDir)
    files.forEach(function(item) {
      let fPath = path.join(subDir, item)
      let stat = fs.statSync(fPath)
      if (stat.isDirectory()) {
        findFiles(fPath)
      }
      if (stat.isFile()) {
        //没有后缀则全部符合
        const doPut = _.isEmpty(exts) || exts.some((ext) => fPath.endsWith(ext))
        doPut && paths.push(toLinuxPath(fPath))
      }
    })
  }

  findFiles(dir)
  return paths
}

/***
 * 截取字符串
 * @param src
 * @param fromIndex
 * @param lastStr
 */
export function subStr(src: string, fromIndex: number, lastStr: string) {
  let dest = src.substring(fromIndex)
  dest = dest.substring(0, dest.lastIndexOf(lastStr))
  return dest
}

/***
 * 过滤文件夹，pageIgnoreRegExps优先
 * @param srcPath
 * @param pageRegExps
 * @param pageIgnoreRegExps
 */

export function filterPath(
  srcPath: string,
  pageRegExps: RegExp[],
  pageIgnoreRegExps: RegExp[],
  dirIgnoreRegExps: RegExp[]
): boolean {
  const isRegsEmpty = _.isEmpty(pageRegExps)
  const isIgnoreRegsEmpty = _.isEmpty(pageIgnoreRegExps)
  const isDirIgnoreRegExpsEmpty = _.isEmpty(dirIgnoreRegExps)
  if (isRegsEmpty && isIgnoreRegsEmpty && isDirIgnoreRegExpsEmpty) {
    return true
  }
  let dirs_page_s = srcPath.split('/')
  const pageName = _.last(dirs_page_s) || ''

  if (!isIgnoreRegsEmpty && pageIgnoreRegExps.some((reg) => reg.test(pageName))) {
    return false
  }

  if (!isDirIgnoreRegExpsEmpty) {
    for (let i = 0; i <= dirs_page_s.length - 2; i++) {
      const dir = dirs_page_s[i]
      if (dirIgnoreRegExps.some((reg) => reg.test(dir))) {
        return false
      }
    }
  }

  if (!isRegsEmpty && !pageRegExps.some((reg) => reg.test(pageName))) {
    return false
  }

  return true
}
