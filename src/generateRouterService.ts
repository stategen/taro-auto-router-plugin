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

export function generateRouterService(
  routerList: RouterMeta[],
  generateRouterServiceOpt: GenerateRouterServiceOpt
) {
  const project = new Project()
  const {
    srcDir = 'src',
    navigateSpecifier,
    navigateFnName,
    outputFileName,
    formatter: customFormatter = formatter,
  } = generateRouterServiceOpt

  const outPath = join(srcDir, `${outputFileName}.ts`)
  const sourceFile = project.createSourceFile(
    outPath,
    `/**
 *  该文件在开发阶段自动托管和生成，不要手动修改
 *  do not edit it manually otherwise your code will be override
 */
`,
    {
      overwrite: true,
    }
  )

  //生成 export const pages_test_index = "package-test/pages/test/index"
  const pages: OptionalKind<VariableStatementStructure>[] = []
  //生成 export const toPages_test_index = <T>(data?: T, opt?: any) =>
  // navigateTo(pages_test_index, data as any, opt as any)
  const methods: OptionalKind<VariableStatementStructure>[] = []

  sourceFile.addImportDeclaration({
    moduleSpecifier: navigateSpecifier,
    namedImports: [navigateFnName],
  })

  const mainPageRouters: RouterMeta[] = []
  const subPageRouters: RouterMeta[] = []

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
        const name = toCamelCase(subPage)
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
        isExported: true,
        declarations: [
          {
            name: formatName,
            initializer: `"${initializer}"`,
          },
        ],
      })

      //生成 export const toPages_test_index = <T>(data?: T, opt?: any) =>
      // navigateTo(pages_test_index, data as any, opt as any)
      methods.push({
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        declarations: [
          {
            name: `to${upFirst(formatName)}`,
            initializer: `<T>(data?: T, opt?: any) =>  ${navigateFnName}(${formatName}, data as any, opt as any)`,
          },
        ],
      })
    }
  }

  const namespace = sourceFile.addNamespace({
    name: 'RouterService',
    isExported: true,
  })

  //生成 export const pages = [
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
    isExported: true,
    declarations: [
      {
        name: 'pages',
        initializer: `[
                  ${mainPages}
                ]`,
      },
    ],
  }

  //生成  export const subPackages = [{
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
    isExported: true,
    declarations: [
      {
        name: 'subPackages',
        initializer: `[${subPageInitializer}]`,
      },
    ],
  }

  namespace.addVariableStatements(pages)
  namespace.addVariableStatement(pagesVariant)
  namespace.addVariableStatement(subPackagesVariant)
  namespace.addVariableStatements(methods)

  saveSourceFile(sourceFile)
}
