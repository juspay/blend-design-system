import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to find the meta files path
function findMetaPath() {
  // First check if explicitly set via environment variable
  if (process.env.META_PATH) {
    return process.env.META_PATH;
  }
  
  // Try to find it relative to the MCP package
  const possiblePaths = [
    path.join(__dirname, '..', '..', 'apps', 'docs', 'meta'),
    path.join(process.cwd(), 'apps', 'docs', 'meta'),
    path.join(__dirname, '..', 'docs', 'meta'),
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }
  
  // If not found, return null
  return null;
}

const META_PATH = findMetaPath();

if (!META_PATH) {
  console.error(`[WARNING] Could not find meta files directory.`);
  console.error(`Meta-based features will not be available.`);
  console.error(`To enable meta features, set META_PATH environment variable.`);
}

/**
 * Get component metadata from meta files
 * @param {string} componentName - Name of the component
 * @returns {Promise<Object>} Component metadata
 */
export async function getComponentMeta(componentName) {
  const metaFilePath = path.join(META_PATH, `${componentName.toLowerCase()}.context.ts`);
  
  if (!fs.existsSync(metaFilePath)) {
    throw new Error(`Meta file not found for component: ${componentName} at ${metaFilePath}`);
  }
  
  try {
    // For now, let's use a simpler approach - dynamic import with temporary file conversion
    // This is more robust than regex parsing
    const fileContent = fs.readFileSync(metaFilePath, 'utf-8');
    
    // Create a temporary JS file for import
    const tempJsContent = fileContent
      .replace(/import type.*?;/g, '') // Remove type imports
      .replace(/:\s*ComponentMeta/g, '') // Remove type annotations
      .replace(/\.ts/g, '.js'); // Fix any .ts references
    
    const tempFilePath = metaFilePath.replace('.context.ts', '.temp.js');
    fs.writeFileSync(tempFilePath, tempJsContent);
    
    try {
      // Dynamic import the temporary file
      const metaModule = await import(`file://${tempFilePath}?t=${Date.now()}`);
      const metaObject = metaModule.default;
      
      // Clean up temp file
      fs.unlinkSync(tempFilePath);
      
      return metaObject;
    } catch (importError) {
      // Clean up temp file on error
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      throw importError;
    }
    
  } catch (error) {
    throw new Error(`Error reading meta file for ${componentName}: ${error.message}`);
  }
}

/**
 * List all available components that have meta files
 * @returns {Promise<string[]>} Array of component names
 */
export async function listAvailableComponents() {
  try {
    const metaFiles = fs.readdirSync(META_PATH)
      .filter(file => file.endsWith('.context.ts'))
      .map(file => {
        // Convert filename to component name (capitalize first letter)
        const baseName = file.replace('.context.ts', '');
        return baseName.charAt(0).toUpperCase() + baseName.slice(1);
      });
    
    return metaFiles;
  } catch (error) {
    throw new Error(`Error listing meta files: ${error.message}`);
  }
}

/**
 * Check if a component has a meta file
 * @param {string} componentName - Name of the component
 * @returns {boolean} Whether the component has a meta file
 */
export function hasComponentMeta(componentName) {
  const metaFilePath = path.join(META_PATH, `${componentName.toLowerCase()}.context.ts`);
  return fs.existsSync(metaFilePath);
}
