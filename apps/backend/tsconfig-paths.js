const fs = require('fs')
const path = require('path')

const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'))
    const { paths, baseUrl = '.' } = tsconfig.compilerOptions || {}

    if (paths) {
        Object.entries(paths).forEach(([alias, targets]) => {
            const targetPath = targets[0]
                .replace(/\*$/, '')
                .replace(/^\.\//, '')
            const absPath = path.resolve(process.cwd(), baseUrl, targetPath)

            // Register the alias
            const originalResolve = require('module')._resolveFilename
            require('module')._resolveFilename = function (
                request,
                parent,
                isMain,
                options
            ) {
                if (
                    request === alias ||
                    request.startsWith(alias.replace('*', ''))
                ) {
                    const resolved = request.replace(alias, absPath)
                    return originalResolve(resolved, parent, isMain, options)
                }
                return originalResolve(request, parent, isMain, options)
            }

            console.log(`[tsconfig-paths] ${alias} -> ${absPath}`)
        })
    }
}
