#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { getComponentMeta, listAvailableComponents } from "./metaReader.js";

const DOCS_COMPONENTS_PATH = "../../apps/docs/content/docs/components/";
const META_PATH = "../../apps/docs/meta/";

// Component name mappings for cases where file names differ from component names
const COMPONENT_NAME_MAPPINGS = {
  "ButtonV2": "buttonv2",
  "ButtonGroupV2": "buttongroupv2",
  "AvatarGroup": "avatargroup",
  "ButtonGroup": "buttongroup",
  "DataTable": "dataTable",
  "DateRangePicker": "daterangepicker",
  "GradientBlur": "gradientblur",
  "MultiSelect": "multiselect",
  "SingleSelect": "singleselect",
  "SplitTag": "splittag",
  "StatCard": "statcard"
};

function getMetaFileName(componentName) {
  return COMPONENT_NAME_MAPPINGS[componentName] || componentName.toLowerCase();
}

function generateMDXContent(componentName, componentMeta) {
  const metaFileName = getMetaFileName(componentName);
  const metaImportName = `${metaFileName}Meta`;
  
  let content = `---
title: ${componentName}
description: ${componentMeta.componentDescription}
---

import { BlendTypeTable } from "@/components/ui/BlendTypeTable";
import ${metaImportName} from "@/meta/${metaFileName}.context";

# ${componentName} Component Documentation

## Description
${componentMeta.componentDescription}

## Features
${componentMeta.features.map(feature => `- ${feature}`).join('\n')}

## Props

<BlendTypeTable componentMeta={${metaImportName}} />

## Usage Examples

`;

  // Add usage examples
  componentMeta.usageExamples.forEach(example => {
    content += `### ${example.title}\n`;
    if (example.description) {
      content += `${example.description}\n\n`;
    }
    content += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
  });

  return content;
}

async function updateComponentDoc(componentName) {
  try {
    console.log(`Updating documentation for ${componentName}...`);
    
    // Get component metadata
    const componentMeta = await getComponentMeta(componentName);
    
    // Generate MDX content
    const mdxContent = generateMDXContent(componentName, componentMeta);
    
    // Write to file
    const filePath = path.join(DOCS_COMPONENTS_PATH, `${componentName}.mdx`);
    fs.writeFileSync(filePath, mdxContent);
    
    console.log(`✅ Updated ${componentName}.mdx`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update ${componentName}: ${error.message}`);
    return false;
  }
}

async function updateAllDocs() {
  console.log("🚀 Starting documentation update for all components...\n");
  
  try {
    // Get list of available components
    const components = await listAvailableComponents();
    console.log(`Found ${components.length} components to update\n`);
    
    let successCount = 0;
    let failCount = 0;
    
    // Update each component
    for (const componentName of components) {
      const success = await updateComponentDoc(componentName);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    console.log(`\n📊 Update Summary:`);
    console.log(`✅ Successfully updated: ${successCount} components`);
    console.log(`❌ Failed to update: ${failCount} components`);
    console.log(`📝 Total processed: ${components.length} components`);
    
    if (failCount === 0) {
      console.log(`\n🎉 All component documentation has been successfully updated!`);
    } else {
      console.log(`\n⚠️  Some components failed to update. Please check the errors above.`);
    }
    
  } catch (error) {
    console.error(`💥 Fatal error during documentation update: ${error.message}`);
    process.exit(1);
  }
}

// Run the update
updateAllDocs();
