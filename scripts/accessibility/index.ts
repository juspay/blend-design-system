#!/usr/bin/env node
import { AccessibilityReportGenerator } from './report-generator'
import * as path from 'path'

const metricsDir = path.join(__dirname)
const outputDir = path.join(__dirname, '../../docs/accessibility')

const generator = new AccessibilityReportGenerator(outputDir)

// Load all component metrics
generator.loadAllMetrics(metricsDir)

// Generate dashboard and component documentation
generator.generateAll()
