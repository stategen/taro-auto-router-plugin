/**
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be override
 */
import { navigateTo } from "@common/utils"
import taroPages from "./taroPages"

export namespace RouterService {
  /** package-test/pages/test/index */
  export const toPages_test_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.pages_test_index, data as any, opt as any)
  /** pages/subPackage/nest/index */
  export const toNest_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.nest_index, data as any, opt as any)
  /** pages/subPackage/test/index */
  export const toTest_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.test_index, data as any, opt as any)
  /** pages/index/index */
  export const toIndex_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.index_index, data as any, opt as any)
  /** pages/firstPage/FirstPage */
  export const toFirstPage_FirstPage = <T>(data?: T, opt?: any) => navigateTo(taroPages.firstPage_FirstPage, data as any, opt as any)
}
