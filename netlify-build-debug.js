// Add this file to help debug Netlify build issues
const fs = require('fs');
const path = require('path');

// Function to check if a file exists
const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    console.error(`Error checking if file exists: ${filePath}`, err);
    return false;
  }
};

// Function to check if imports in a file are resolvable
const checkImports = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importLines = content.match(/import.*from\s+['"]([^'"]+)['"]/g) || [];
    
    console.log(`\nChecking imports in ${filePath}:`);
    
    importLines.forEach(line => {
      const match = line.match(/from\s+['"]([^'"]+)['"]/);
      if (match && match[1]) {
        const importPath = match[1];
        
        // Skip checking node_modules imports
        if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
          console.log(`  ✓ External module: ${importPath}`);
          return;
        }
        
        // Resolve relative import path
        let resolvedPath;
        if (importPath.endsWith('.js') || importPath.endsWith('.jsx')) {
          resolvedPath = path.resolve(path.dirname(filePath), importPath);
        } else {
          // Try different extensions
          const extensions = ['.js', '.jsx', '.ts', '.tsx'];
          for (const ext of extensions) {
            const testPath = path.resolve(path.dirname(filePath), `${importPath}${ext}`);
            if (fileExists(testPath)) {
              resolvedPath = testPath;
              break;
            }
            
            // Check for index files
            const indexPath = path.resolve(path.dirname(filePath), importPath, `index${ext}`);
            if (fileExists(indexPath)) {
              resolvedPath = indexPath;
              break;
            }
          }
        }
        
        if (resolvedPath && fileExists(resolvedPath)) {
          console.log(`  ✓ Found: ${importPath}`);
        } else {
          console.log(`  ✗ Missing: ${importPath}`);
        }
      }
    });
  } catch (err) {
    console.error(`Error checking imports in file: ${filePath}`, err);
  }
};

// Main function
const main = () => {
  console.log('=== Netlify Build Debug ===');
  
  // Check ProductCatalog.js since it's the file we've been working on
  const productCatalogPath = path.resolve(__dirname, 'src', 'components', 'ProductCatalog.js');
  
  if (fileExists(productCatalogPath)) {
    console.log(`\nProductCatalog.js exists at: ${productCatalogPath}`);
    checkImports(productCatalogPath);
  } else {
    console.log(`\nProductCatalog.js NOT FOUND at: ${productCatalogPath}`);
  }
  
  // Check if @dnd-kit modules are installed
  const nodeModulesPath = path.resolve(__dirname, 'node_modules');
  const dndKitCorePath = path.resolve(nodeModulesPath, '@dnd-kit', 'core');
  const dndKitSortablePath = path.resolve(nodeModulesPath, '@dnd-kit', 'sortable');
  
  console.log('\nChecking @dnd-kit modules:');
  console.log(`  @dnd-kit/core: ${fileExists(dndKitCorePath) ? 'Installed' : 'Missing'}`);
  console.log(`  @dnd-kit/sortable: ${fileExists(dndKitSortablePath) ? 'Installed' : 'Missing'}`);
  
  console.log('\n=== Debug Complete ===');
};

main();
