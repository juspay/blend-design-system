import { ComponentInfo } from '@/shared/types'
import fs from 'fs'
import path from 'path'

export class ComponentScanner {
    private componentsPath: string
    private storybookPath: string

    constructor() {
        // Paths relative to the monorepo root
        this.componentsPath = path.join(
            process.cwd(),
            '../../packages/blend/lib/components'
        )
        this.storybookPath = path.join(
            process.cwd(),
            '../../apps/storybook/stories/components'
        )
    }

    async scanComponents(): Promise<ComponentInfo[]> {
        try {
            const components: ComponentInfo[] = []

            // Read all directories in the components folder
            const componentDirs = await this.getComponentDirectories()

            for (const dir of componentDirs) {
                const componentInfo = await this.analyzeComponent(dir)
                if (componentInfo) {
                    components.push(componentInfo)
                }
            }

            return components
        } catch (error) {
            console.error('Error scanning components:', error)
            return []
        }
    }

    private async getComponentDirectories(): Promise<string[]> {
        try {
            const items = await fs.promises.readdir(this.componentsPath)
            const dirs: string[] = []

            for (const item of items) {
                const itemPath = path.join(this.componentsPath, item)
                const stat = await fs.promises.stat(itemPath)

                if (stat.isDirectory() && !item.startsWith('.')) {
                    dirs.push(item)
                }
            }

            return dirs
        } catch (error) {
            console.error('Error reading component directories:', error)
            return []
        }
    }

    private async analyzeComponent(
        dirName: string
    ): Promise<ComponentInfo | null> {
        try {
            const componentPath = path.join(this.componentsPath, dirName)

            // Check if index.ts exists
            const indexPath = path.join(componentPath, 'index.ts')
            const hasIndex = await this.fileExists(indexPath)

            if (!hasIndex) {
                return null
            }

            // Get component stats
            const stat = await fs.promises.stat(componentPath)

            // Check for Figma Connect file
            const hasFigmaConnect = await this.checkFigmaConnect(dirName)

            // Check for Storybook
            const hasStorybook = await this.checkStorybook(dirName)

            // Check for tests
            const hasTests = await this.checkTests(componentPath)

            // Determine category
            const category = this.determineCategory(dirName)

            return {
                id: this.generateId(dirName),
                name: dirName,
                path: `packages/blend/lib/components/${dirName}`,
                category,
                hasStorybook,
                hasFigmaConnect,
                hasTests,
                lastModified: stat.mtime.toISOString(),
            }
        } catch (error) {
            console.error(`Error analyzing component ${dirName}:`, error)
            return null
        }
    }

    private async checkFigmaConnect(componentName: string): Promise<boolean> {
        // Check in storybook directory for .figma.tsx files
        const figmaConnectPaths = [
            path.join(
                this.storybookPath,
                componentName,
                `${componentName}.figma.tsx`
            ),
            path.join(
                this.storybookPath,
                componentName,
                `${componentName}.figma.ts`
            ),
            // Check for variations in naming
            path.join(this.storybookPath, 'Button', 'Button.figma.tsx'), // Updated for Button component
        ]

        for (const figmaPath of figmaConnectPaths) {
            if (await this.fileExists(figmaPath)) {
                return true
            }
        }

        return false
    }

    private async checkStorybook(componentName: string): Promise<boolean> {
        const storyPaths = [
            path.join(this.storybookPath, `${componentName}.stories.tsx`),
            path.join(this.storybookPath, `${componentName}.stories.ts`),
            path.join(
                this.storybookPath,
                componentName,
                `${componentName}.stories.tsx`
            ),
        ]

        for (const storyPath of storyPaths) {
            if (await this.fileExists(storyPath)) {
                return true
            }
        }

        return false
    }

    private async checkTests(componentPath: string): Promise<boolean> {
        const testFiles = [
            'test.tsx',
            'test.ts',
            'spec.tsx',
            'spec.ts',
            '__tests__',
        ]

        for (const testFile of testFiles) {
            const testPath = path.join(componentPath, testFile)
            if (await this.fileExists(testPath)) {
                return true
            }
        }

        return false
    }

    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.promises.access(filePath)
            return true
        } catch {
            return false
        }
    }

    private generateId(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }

    private determineCategory(componentName: string): string {
        // Categorize based on component name patterns
        const categories: Record<string, string[]> = {
            inputs: [
                'Button',
                'TextInput',
                'NumberInput',
                'Checkbox',
                'Radio',
                'Switch',
                'Slider',
                'Select',
                'DatePicker',
                'TimePicker',
                'ColorPicker',
                'OTPInput',
                'SearchInput',
                'TextArea',
                'UnitInput',
                'MultiValueInput',
                'DropdownInput',
            ],
            display: [
                'Card',
                'Avatar',
                'Badge',
                'Tag',
                'Chip',
                'Alert',
                'Toast',
                'Tooltip',
                'Popover',
                'Modal',
                'Drawer',
                'StatCard',
                'Charts',
            ],
            navigation: [
                'Tabs',
                'Breadcrumb',
                'Menu',
                'Sidebar',
                'Navbar',
                'Pagination',
                'Stepper',
            ],
            feedback: [
                'Progress',
                'Spinner',
                'Skeleton',
                'Snackbar',
                'Loading',
            ],
            layout: [
                'Grid',
                'Stack',
                'Container',
                'Divider',
                'Spacer',
                'Block',
            ],
            data: ['Table', 'DataTable', 'List', 'Tree'],
            forms: ['Form', 'FormField', 'FormGroup'],
        }

        for (const [category, components] of Object.entries(categories)) {
            if (components.some((comp) => componentName.includes(comp))) {
                return category
            }
        }

        return 'other'
    }

    // Get integration status for a specific component
    async getComponentIntegrationStatus(componentId: string): Promise<{
        hasFigmaConnect: boolean
        hasStorybook: boolean
        hasTests: boolean
    }> {
        const components = await this.scanComponents()
        const component = components.find((c) => c.id === componentId)

        return {
            hasFigmaConnect: component?.hasFigmaConnect || false,
            hasStorybook: component?.hasStorybook || false,
            hasTests: component?.hasTests || false,
        }
    }
}
