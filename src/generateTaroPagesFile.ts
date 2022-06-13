import {
  Project,
  VariableDeclarationKind,
  OptionalKind,
  VariableStatementStructure,
} from 'ts-morph'
import { join } from 'path'
import { saveSourceFile } from './saveSourceFile'
import { RouterMeta, GenerateRouterServiceOpt } from './types'
import { formatter, toCamelCase, toLinuxPath, upFirst } from './utils'

export function generateTaroPagesFile(
  routerList: RouterMeta[],
  generateRouterServiceOpt: GenerateRouterServiceOpt
) {
  const project = new Project()
  const {
    srcDir = 'src',
    pagesFile,
    routerPath,
    navigateFnName,
    pagesDir = 'pages',
    formatter: customFormatter = formatter,
  } = generateRouterServiceOpt

  const outPath = join(srcDir, `${routerPath}/${pagesFile}.js`)
  const sourceFile = project.createSourceFile(
    outPath,
    `/**
 *  由于app.config.ts(<=taro@3.3.6)不是webpack编译，引用请用 
 *
 *  const { pages, subPackages } = require('./${routerPath}/${pagesFile}')
 *
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be override
 */
`,
    {
      overwrite: true,
    }
  )

  //生成 const pages_test_index = "package-test/pages/test/index"
  const pages: OptionalKind<VariableStatementStructure>[] = []

  //生成 export const toPages_test_index = <T>(data?: T, opt?: any) =>
  // navigateTo(pages_test_index, data as any, opt as any)
  const methods: OptionalKind<VariableStatementStructure>[] = []

  const mainPageRouters: RouterMeta[] = []
  const subPageRouters: RouterMeta[] = []
  // let allPages = ''

  for (const routerMeta of routerList) {
    const routers: RouterMeta[] = []
    if (routerMeta.type === 'main') {
      routers.push(routerMeta)
      mainPageRouters.push(routerMeta)
    } else {
      //把package分解出来
      subPageRouters.push(routerMeta)
      const { root = '', pages: pageList = [] } = routerMeta
      for (const subPage of pageList) {
        const subPagePath = toLinuxPath(join(root, subPage))
        let name = subPagePath.startsWith(pagesDir)
          ? subPagePath.substr(pagesDir.length + 1)
          : subPagePath
        name = toCamelCase(name)
        routers.push({
          name,
          path: subPagePath,
          type: 'sub',
        })
      }
    }

    for (const router of routers) {
      const { name, path: initializer } = router
      const formatName = customFormatter(name)
      //生成 export const pages_test_index = "package-test/pages/test/index"
      pages.push({
        declarationKind: VariableDeclarationKind.Const,
        docs: [`${initializer}`],
        declarations: [
          {
            name: formatName,
            initializer: `"${initializer}"`,
          },
        ],
      })

      // allPages += `${customFormatter(name)},
      //           `

      //生成 export const toPages_test_index = <T>(data?: T, opt?: any) =>
      // navigateTo(pages_test_index, data as any, opt as any)
      methods.push({
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        docs: [`${initializer}`],
        declarations: [
          {
            name: `to${upFirst(formatName)}`,
            initializer: `<T>(data?: T, opt?: any) =>  ${navigateFnName}(${pagesFile}.${formatName}, data as any, opt as any)`,
          },
        ],
      })
    }
  }

  //生成 const pages = [
  //     index_index,
  //     firstPage_FirstPage,
  //   ]
  let mainPages = ''
  mainPageRouters.forEach((routerMeta) => {
    const { name } = routerMeta
    mainPages += `${customFormatter(name)},
                `
  })
  const pagesVariant = {
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'pages',
        initializer: `{
                  ${mainPages}
                }`,
      },
    ],
  }

  //生成  const subPackages = [{
  //     "name": "packageTest",
  //     "root": "package-test/",
  //     "pages": [
  //       "pages/test/index"
  //     ]
  //   }, {
  //     "name": "pages_subPackage",
  //     "root": "pages/subPackage/",
  //     "pages": [
  //       "nest/index",
  //       "test/index"
  //     ]
  //   }]
  const subPageInitializer = subPageRouters.map((v) => {
    const { name, root, pages } = v
    return JSON.stringify({ name, root, pages }, null, 2)
  })
  const subPackagesVariant = {
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'subPackages',
        initializer: `[${subPageInitializer}]`,
      },
    ],
  }

  sourceFile.addVariableStatements(pages)
  sourceFile.addVariableStatement(pagesVariant)
  sourceFile.addVariableStatement(subPackagesVariant)

  sourceFile.addStatements(
    `module.exports= {
      pages,
      subPackages,
   }`
  )

  saveSourceFile(sourceFile)
  return methods
}
