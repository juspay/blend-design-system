#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Project } from "ts-morph";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLEND_LIBRARY_PATH = path.resolve(__dirname, "../blend/lib/components");
const META_PATH = path.resolve(__dirname, "../../apps/docs/meta");

// Components that already have meta files
const EXISTING_META_COMPONENTS = [
  "button", "charts", "datatable", "statcard", "alert", "modal", "tabs"
];

// Get all component directories
function getAllComponents() {
  const entries = fs.readdirSync(BLEND_LIBRARY_PATH, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(name => !EXISTING_META_COMPONENTS.includes(name.toLowerCase()));
}

// Extract props from TypeScript files
function extractPropsFromComponent(componentName) {
  const componentDir = path.join(BLEND_LIBRARY_PATH, componentName);
  const possibleFiles = [
    path.join(componentDir, "types.ts"),
    path.join(componentDir, "Types.ts"),
    path.join(componentDir, `${componentName}.tsx`),
    path.join(componentDir, "index.ts")
  ];

  let foundFilePath = "";
  for (const filePath of possibleFiles) {
    if (fs.existsSync(filePath)) {
      foundFilePath = filePath;
      break;
    }
  }

  if (!foundFilePath) {
    console.warn(`No types file found for ${componentName}`);
    return { props: [], enums: [], types: [] };
  }

  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(foundFilePath);
    
    // Extract interfaces and type aliases
    const interfaces = sourceFile.getInterfaces();
    const typeAliases = sourceFile.getTypeAliases();
    const enums = sourceFile.getEnums();
    
    // Find the main props interface
    const propsInterface = interfaces.find(i => 
      i.getName() === `${componentName}Props` || i.getName() === "Props"
    ) || typeAliases.find(t => 
      t.getName() === `${componentName}Props` || t.getName() === "Props"
    );

    const props = [];
    const extractedEnums = [];
    const extractedTypes = [];

    // Extract enums
    enums.forEach(enumDecl => {
      const enumName = enumDecl.getName();
      const members = enumDecl.getMembers().map(member => {
        const name = member.getName();
        const value = member.getValue();
        return `${name} = "${value}"`;
      }).join(',\n        ');
      
      extractedEnums.push({
        name: enumName,
        definition: `enum ${enumName} {\n        ${members}\n      }`
      });
    });

    // Extract type aliases
    typeAliases.forEach(typeAlias => {
      const typeName = typeAlias.getName();
      if (!typeName.endsWith('Props')) {
        extractedTypes.push({
          name: typeName,
          definition: `type ${typeName} = ${typeAlias.getTypeNode()?.getText() || 'unknown'}`
        });
      }
    });

    if (propsInterface) {
      const properties = propsInterface.getProperties();
      
      properties.forEach(prop => {
        const name = prop.getName();
        const typeNode = prop.getTypeNode();
        const isOptional = prop.hasQuestionToken();
        
        props.push({
          name,
          type: typeNode?.getText() || 'unknown',
          required: !isOptional,
          description: `${name} prop for ${componentName}`,
          category: categorizeProperty(name),
          defaultValue: isOptional ? "undefined" : "-"
        });
      });
    }

    return { props, enums: extractedEnums, types: extractedTypes };
  } catch (error) {
    console.error(`Error extracting props for ${componentName}:`, error.message);
    return { props: [], enums: [], types: [] };
  }
}

// Categorize properties based on common patterns
function categorizeProperty(propName) {
  const name = propName.toLowerCase();
  
  if (name.includes('variant') || name.includes('size') || name.includes('color') || name.includes('style')) {
    return "Appearance";
  }
  if (name.includes('on') || name.includes('callback') || name.includes('handler')) {
    return "Events";
  }
  if (name.includes('children') || name.includes('content') || name.includes('text') || name.includes('label') || name.includes('title') || name.includes('description')) {
    return "Content";
  }
  if (name.includes('width') || name.includes('height') || name.includes('position') || name.includes('placement') || name.includes('align')) {
    return "Layout";
  }
  if (name.includes('disabled') || name.includes('loading') || name.includes('open') || name.includes('visible') || name.includes('active')) {
    return "State";
  }
  if (name.includes('class') || name.includes('style')) {
    return "Styling";
  }
  
  return "General";
}

// Generate meta file content
function generateMetaFileContent(componentName, { props, enums, types }) {
  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  // Generate type definitions
  const typeDefinitions = [...enums, ...types].map(item => item.definition).join('\n\n');
  
  // Generate props array
  const propsArray = props.map(prop => {
    const typeDefinition = enums.find(e => e.name === prop.type)?.definition || 
                          types.find(t => t.name === prop.type)?.definition || 
                          prop.type;
    
    return `    {
      propName: "${prop.name}",
      propType: "${prop.type}",
      typeDefinition: \`${typeDefinition}\`,
      propDescription: "${prop.description}",
      llmContext: "${prop.description}",
      propDefault: "${prop.defaultValue}",
      category: "${prop.category}",
      required: ${prop.required},
    }`;
  }).join(',\n');

  return `import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const ${componentName.toLowerCase()}Meta: ComponentMeta = {
  componentName: "${capitalizedName}",
  componentDescription: "A ${componentName.toLowerCase()} component for the Blend design system.",
  features: [
    "Customizable appearance and behavior",
    "Accessible design",
    "Responsive layout"
  ],
  usageExamples: [
    {
      title: "Basic ${capitalizedName}",
      description: "Simple ${componentName.toLowerCase()} usage",
      code: \`<${capitalizedName} />\`
    }
  ],
  props: [
${propsArray}
  ]
};

export default ${componentName.toLowerCase()}Meta;
`;
}

// Main function to generate meta files
async function generateMetaFiles() {
  const components = getAllComponents();
  console.log(`Found ${components.length} components without meta files:`, components);

  for (const componentName of components) {
    console.log(`\nGenerating meta file for ${componentName}...`);
    
    const extractedData = extractPropsFromComponent(componentName);
    const metaContent = generateMetaFileContent(componentName, extractedData);
    
    const metaFilePath = path.join(META_PATH, `${componentName.toLowerCase()}.context.ts`);
    
    try {
      fs.writeFileSync(metaFilePath, metaContent);
      console.log(`✅ Generated ${metaFilePath}`);
    } catch (error) {
      console.error(`❌ Failed to write ${metaFilePath}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Meta file generation complete!`);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMetaFiles().catch(console.error);
}

export { generateMetaFiles, extractPropsFromComponent, generateMetaFileContent };
