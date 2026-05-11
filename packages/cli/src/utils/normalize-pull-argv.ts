/**
 * Commander reserves `--version` for the root program, which conflicts with
 * `pull --version <x>`. Normalize legacy pull args before parsing:
 *   blend-studio pull <id> --version 1.0.3
 * => blend-studio pull <id> --branch-version 1.0.3
 */
export function normalizeArgvForPullVersion(argv: string[]): string[] {
    const next = [...argv]
    const pullIdx = next.findIndex((a) => a === 'pull')
    if (pullIdx === -1) return next

    for (let i = pullIdx + 1; i < next.length; i++) {
        if (next[i] === '--version') {
            next[i] = '--branch-version'
        } else if (next[i].startsWith('--version=')) {
            next[i] = next[i].replace('--version=', '--branch-version=')
        }
    }
    return next
}
