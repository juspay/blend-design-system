/**
 * Tests for project detection and install command generation.
 */
import { describe, it, expect } from 'vitest'
import { getInstallCommand } from '../utils/detect-project'

describe('getInstallCommand', () => {
    it('generates pnpm add command', () => {
        const cmd = getInstallCommand('pnpm', ['react', 'styled-components'])
        expect(cmd).toBe('pnpm add react styled-components')
    })

    it('generates yarn add command', () => {
        const cmd = getInstallCommand('yarn', ['react'])
        expect(cmd).toBe('yarn add react')
    })

    it('generates npm install command', () => {
        const cmd = getInstallCommand('npm', ['react', 'typescript'])
        expect(cmd).toBe('npm install react typescript')
    })

    it('returns empty string for no deps', () => {
        expect(getInstallCommand('npm', [])).toBe('')
    })
})
