export interface GenerateRouterServiceOpt {
  /** src */
  srcDir?: string

  /** 'pages' */
  pagesDir?: string

  /** false**/
  useOnlyPages?: boolean

  /** '' */
  pagePrefix?: string

  /** '@common/utils' */
  navigateSpecifier: string
  /** 'navigateTo' */
  navigateFnName: string
  /** service*/
  routerPath: string

  /** 'routerService' */
  routerServiceFile?: string

  /** taroPages*/
  pagesFile?: string

  formatter?(name: string): string
}

export const defaultConfig: Partial<Config> = {
  projectPath: process.cwd(),
  srcDir: 'src',
  firstPage: '/index/',
  pagesDir: 'pages',
  useOnlyPages: false,
  pagePrefix: undefined,
  exts: ['.tsx', '.jsx', '.vue'],
  pageRegExps: [/^index/i, /page/i],
  pageIgnoreRegExps: [/_x$/i],
  dirIgnoreRegExps: [/components/i],

  routerPath: 'service',
  routerServiceFile: 'routerService',
  pagesFile: 'pages',
}

/***
 默认值：
 <pre>
 {
        projectPath: process.cwd(),
        srcDir: 'src',
        firstPage: '/index/',
        pagesDir: 'pages',
        useOnlyPages: false,
        pagePrefix: undefined,
        exts: ['.tsx', '.jsx', '.vue'],
        pageRegExps: [/^index/i, /page/i],
        pageIgnoreRegExps: [/_x$/i],
        dirIgnoreRegExps: [/components/i],
        routerPath: 'service',
        routerServiceFile: 'routerService',
        pagesFile: 'pages',
    }
 </pre>
 */
export interface Config extends GenerateRouterServiceOpt {
  /** process.cwd() */
  projectPath?: string

  /** pages/firstPage/FirstPage */
  firstPage?: string

  /** 不带后缀名的短文件名，正则匹配，默认： [/^index/i, /page/i] ，[]表示只要满足exts即可*/
  pageRegExps?: RegExp[]

  /** 不带后缀名的短文件名，排除正则匹配，默认： [/_x$/i,] ，优先于pageRegExps*/
  /** [/_x$/i] 优先于pageRegExps*/
  pageIgnoreRegExps?: RegExp[]

  /** 同pageIgnoreRegExps,过滤文件夹*/
  dirIgnoreRegExps?: RegExp[]

  /** ['package-test','pages/subPackage'], */
  subPageDirs: string[]

  /** 'tsx','jsx','.vue' */
  exts?: string[]

  /** basePath + '/src/app.config.ts' */
  appConfigPath: string

  /** basePath + '/project.config.json' */
  projectConfigPath: string
}

export type RquiredConfig = Required<Config>

export interface RouterMetaOpt {
  root?: string
  type: 'main' | 'sub'
  pages?: string[]
}

export interface RouterMeta extends RouterMetaOpt {
  name: string
  path: string
}

export interface ModifyAppConfigOpt {
  appConfigPath: string
}

export interface modifyProjectConfigOpt {
  projectConfigPath: string
}
