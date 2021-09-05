/**
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be override
 */
import { navigateTo } from "@stg-utils/TaroNavigator"
import taroPages from "./taroPages"

export namespace RouterService {
  /** pages/firstPage/FirstPage */
  export const toFirstPage_FirstPage = <T>(data?: T, opt?: any) => navigateTo(taroPages.firstPage_FirstPage, data as any, opt as any)
  /** pages/index/index */
  export const toIndex_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.index_index, data as any, opt as any)
  /** pages/subPackage/nest/index */
  export const toSubPackage_nest_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.subPackage_nest_index, data as any, opt as any)
  /** pages/subPackage/test/index */
  export const toSubPackage_test_index = <T>(data?: T, opt?: any) => navigateTo(taroPages.subPackage_test_index, data as any, opt as any)
}
