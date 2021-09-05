/**
 *  由于app.config.ts(<=taro@3.3.6)不是webpack编译，引用请用 
 *
 *  const { pages, subPackages } = require('./service/taroPages')
 *
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be override
 */
const pages_test_index = "package-test/pages/test/index"
const nest_index = "pages/subPackage/nest/index"
const test_index = "pages/subPackage/test/index"
const index_index = "pages/index/index"
const firstPage_FirstPage = "pages/firstPage/FirstPage"
const pages = [
  index_index,
  firstPage_FirstPage,

]
const subPackages = [{
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
module.exports = {
  pages_test_index,
  nest_index,
  test_index,
  index_index,
  firstPage_FirstPage,

  pages,
  subPackages,
}
