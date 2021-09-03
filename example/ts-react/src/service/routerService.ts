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
