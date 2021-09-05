/**
 *  由于app.config.ts(<=taro@3.3.6)不是webpack编译，引用请用 
 *
 *  const { pages, subPackages } = require('./stg-utils/taroPages')
 *
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be override
 */
const firstPage_FirstPage = "pages/firstPage/FirstPage"
const index_index = "pages/index/index"
const subPackage_nest_index = "pages/subPackage/nest/index"
const subPackage_test_index = "pages/subPackage/test/index"
const pages = [
  firstPage_FirstPage,
  index_index,
  subPackage_nest_index,
  subPackage_test_index,

]
const subPackages = []
module.exports = {
  firstPage_FirstPage,
  index_index,
  subPackage_nest_index,
  subPackage_test_index,

  pages,
  subPackages,
}
