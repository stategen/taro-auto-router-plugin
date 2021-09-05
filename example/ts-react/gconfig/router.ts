import { Config } from 'taro-auto-router-plugin/dist/types'

const basePath = process.cwd()

export const taroRouter: Config = {

  projectPath: basePath,
  subPageDirs:['package-test','pages/subPackage'],
  appConfigPath: basePath + '/src/app.config.ts',
  projectConfigPath: basePath + '/project.config.json',

  routerServiceFile: 'routerService',
  navigateFnName: 'navigateTo',
  navigateSpecifier: '@common/utils',
}
