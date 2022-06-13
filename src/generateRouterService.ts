import { Project, OptionalKind, VariableStatementStructure } from 'ts-morph'
import { join } from 'path'
import { saveSourceFile } from './saveSourceFile'
import { GenerateRouterServiceOpt } from './types'

export function generateRouterService(
  methods: OptionalKind<VariableStatementStructure>[],
  generateRouterServiceOpt: GenerateRouterServiceOpt
) {
  const project = new Project()
  const {
    srcDir = 'src',
    navigateSpecifier,
    navigateFnName,
    routerPath,
    pagesFile,
    routerServiceFile,
  } = generateRouterServiceOpt

  const outPath = join(srcDir, `${routerPath}/${routerServiceFile}.ts`)
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

  sourceFile.addImportDeclaration({
    moduleSpecifier: navigateSpecifier,
    namedImports: [navigateFnName],
  })

  sourceFile.addImportDeclaration({
    namedImports: ['pages'],
    // defaultImport: pagesFile,
    moduleSpecifier: `./${pagesFile}`,
  })

  const namespace = sourceFile.addNamespace({
    name: 'RouterService',
    isExported: true,
  })

  namespace.addVariableStatements(methods)
  saveSourceFile(sourceFile)
}
