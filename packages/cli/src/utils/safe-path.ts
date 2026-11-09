import { isAbsolute, relative, resolve, sep } from 'node:path'

export function resolveInsideProject(cwd: string, target: string): string {
    const root = resolve(cwd)
    const resolved = resolve(root, target)
    const rel = relative(root, resolved)
    if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
        throw new Error(
            `Output path "${target}" must stay inside the project directory`
        )
    }
    return resolved
}
