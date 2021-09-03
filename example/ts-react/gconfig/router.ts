import { Config } from 'toro-auto-router-plugin/src/types'

const basePath = process.cwd()

export const taroRouter: Config = {

  projectPath: basePath,
  subPageDirs:['package-test','pages/subPackage'],
  appConfigPath: basePath + '/src/app.config.ts',
  projectConfigPath: basePath + '/project.config.json',

  outputFileName: 'service/routerService',
  navigateFnName: 'navigateTo',
  navigateSpecifier: '@common/utils',
}
