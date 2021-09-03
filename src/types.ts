export interface GenerateRouterServiceOpt {
    /** src */
    srcDir?: string;
    /** '@common/utils' */
    navigateSpecifier: string
    /** 'navigateTo' */
    navigateFnName: string
    /** 'service/routerService' */
    outputFileName?: string

    formatter?(name: string): string
}

export interface Config extends GenerateRouterServiceOpt {
    /** process.cwd() */
    projectPath?: string;

    /** pages/firstPage/FirstPage */
    firstPage?: string

    /** 'pages' */
    pagesDir?: string;

    /** [/^index/i, /page/i] */
    pageNameRegs?: RegExp[]

    /** [/_x$/i] 优先于pageNameRegs*/
    pageNameIgnoreRegs?: RegExp[]

    /** ['package-test','pages/subPackage'], */
    subPageDirs: string[];

    /** 'tsx','jsx' */
    exts?: string[]

    /** basePath + '/src/app.config.ts' */
    appConfigPath: string

    /** basePath + '/project.config.json' */
    projectConfigPath: string
}

export const defaultConfig: Partial<Config> = {
    projectPath: process.cwd(),
    srcDir: 'src',
    firstPage: '/index/',
    pagesDir: 'pages',
    exts: ['.tsx', '.jsx'],
    pageNameRegs: [/^index/i, /page/i],
    pageNameIgnoreRegs: [/_x$/i],
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
