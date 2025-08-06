import { parseComponentFromSource, getAvailableComponents } from './tsParser.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Test the TypeScript parser against all components
async function testAllComponents() {
    const libraryPath = path.join(__dirname, '..', 'blend', 'lib', 'components')
    console.log(`Testing components in: ${libraryPath}`)

    const components = getAvailableComponents(libraryPath)
    console.log(`Found ${components.length} components:`, components.join(', '))

    const results = {
        successful: [],
        failed: [],
        summary: {},
    }

    for (const componentName of components) {
        if (componentName === 'Text') {
            console.log(`⏭️  Skipping ${componentName} (excluded by design)`)
            continue
        }

        try {
            console.log(`\n🔍 Testing ${componentName}...`)
            const componentData = await parseComponentFromSource(
                componentName,
                libraryPath
            )

            console.log(
                `✅ ${componentName}: ${componentData.props.length} props, ${Object.keys(componentData.enums).length} enums`
            )
            console.log(
                `   - Requires ThemeProvider: ${componentData.requiresThemeProvider}`
            )
            console.log(
                `   - Props: ${componentData.props.map((p) => p.propName).join(', ')}`
            )
            console.log(
                `   - Enums: ${Object.keys(componentData.enums).join(', ')}`
            )

            results.successful.push({
                name: componentName,
                propsCount: componentData.props.length,
                enumsCount: Object.keys(componentData.enums).length,
                requiresThemeProvider: componentData.requiresThemeProvider,
                props: componentData.props.map((p) => ({
                    name: p.propName,
                    type: p.propType,
                    required: p.required,
                })),
            })
        } catch (error) {
            console.log(`❌ ${componentName}: ${error.message}`)
            results.failed.push({
                name: componentName,
                error: error.message,
            })
        }
    }

    // Summary
    console.log(`\n📊 SUMMARY:`)
    console.log(`✅ Successful: ${results.successful.length}`)
    console.log(`❌ Failed: ${results.failed.length}`)
    console.log(
        `📈 Success Rate: ${((results.successful.length / (results.successful.length + results.failed.length)) * 100).toFixed(1)}%`
    )

    if (results.failed.length > 0) {
        console.log(`\n❌ Failed Components:`)
        results.failed.forEach((f) => console.log(`   - ${f.name}: ${f.error}`))
    }

    // Show components with most props
    const topComponents = results.successful
        .sort((a, b) => b.propsCount - a.propsCount)
        .slice(0, 5)

    console.log(`\n🏆 Components with Most Props:`)
    topComponents.forEach((c) =>
        console.log(`   - ${c.name}: ${c.propsCount} props`)
    )

    // Show components requiring ThemeProvider
    const themeComponents = results.successful.filter(
        (c) => c.requiresThemeProvider
    )
    console.log(
        `\n🎨 Components Requiring ThemeProvider (${themeComponents.length}):`
    )
    themeComponents.forEach((c) => console.log(`   - ${c.name}`))

    return results
}

// Run the test
testAllComponents().catch(console.error)
