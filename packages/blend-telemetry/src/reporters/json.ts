import { writeFile, mkdir } from 'fs/promises'
import { resolve } from 'path'
import type { BlendTelemetryReport } from '../metrics/definitions.js'

export async function writeJsonReport(
    report: BlendTelemetryReport,
    outputDir: string,
    projectRoot: string
): Promise<string> {
    const outDir = resolve(projectRoot, outputDir)
    await mkdir(outDir, { recursive: true })

    const outPath = resolve(outDir, 'report.json')
    await writeFile(outPath, JSON.stringify(report, null, 2), 'utf-8')
    return outPath
}
