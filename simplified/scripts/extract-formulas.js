/**
 * Extract Formulas Script
 * 
 * This script extracts the formula data from materialFormulas.js and saves it to a JSON file
 * that can be used by the migration script.
 */

// Define the constants that are referenced in materialFormulas.js
const PRODUCT_TYPES = {
  POST: "post",
  MESH: "mesh",
  EYE_TOP: "eye_top",
  DOME_CAP: "dome_cap",
  RAIL_END: "rail_end",
  TENSION_BAND: "tension_band",
  BRACE_BAND: "brace_band",
  BARB_ARM: "barb_arm",
  FENCE_TIE: "fence_tie",
  HOG_RINGS: "hog_rings",
  SLEEVE: "sleeve",
  RAIL_CLAMP: "rail_clamp",
  GATE_COLLAR: "gate_collar",
  CANE_BOLT: "cane_bolt",
  DROP_ROD: "drop_rod",
  FORK_LATCH: "fork_latch",
  TENSION_BAR: "tension_bar",
  TENSION_WIRE: "tension_wire",
  TOP_RAIL: "top_rail",
  BOTTOM_RAIL: "bottom_rail",
  BARBED_WIRE: "barbed_wire",
  CONCRETE: "concrete",
  GATE_FRAME: "gate_frame",
  GATE_HARDWARE: "gate_hardware"
};

const MATERIAL_TYPES = {
  BLACK: "Black",
  GALVANIZED: "Galvanized"
};

const THICKNESS_TYPES = {
  LIGHT: "0.065",
  SCH_20: "SCH 20",
  SCH_40: "SCH 40"
};

const DIAMETER_SIZES = {
  ONE_THREE_EIGHTHS: "1 3/8",
  ONE_FIVE_EIGHTHS: "1 5/8",
  ONE_SEVEN_EIGHTHS: "1 7/8",
  TWO: "2",
  TWO_AND_HALF: "2 1/2",
  THREE: "3",
  FOUR: "4"
};

// Mock the import functions that are used in materialFormulas.js
const findPostProduct = () => ({ price: 0 });
const findMeshProduct = () => ({ price: 0 });
const findProduct = () => ({ price: 0 });

// Read the materialFormulas.js file
const fs = require('fs');
const path = require('path');

try {
  // Read the file
  const filePath = path.join(__dirname, '..', 'data', 'materialFormulas.js');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract gate formulas and post formulas using regex
  const gateFormulasMatch = fileContent.match(/export const gateFormulas = ({[\s\S]*?});/);
  const postFormulasMatch = fileContent.match(/export const postFormulas = ({[\s\S]*?});/);
  
  if (!gateFormulasMatch || !postFormulasMatch) {
    console.error('Failed to extract formulas from the file');
    process.exit(1);
  }
  
  // Create a new file that includes the constants and formulas
  const extractedCode = `
    // Constants
    const PRODUCT_TYPES = ${JSON.stringify(PRODUCT_TYPES, null, 2)};
    const MATERIAL_TYPES = ${JSON.stringify(MATERIAL_TYPES, null, 2)};
    const THICKNESS_TYPES = ${JSON.stringify(THICKNESS_TYPES, null, 2)};
    const DIAMETER_SIZES = ${JSON.stringify(DIAMETER_SIZES, null, 2)};
    
    // Mock functions
    const findPostProduct = () => ({ price: 0 });
    const findMeshProduct = () => ({ price: 0 });
    const findProduct = () => ({ price: 0 });
    
    // Formulas
    const gateFormulas = ${gateFormulasMatch[1]};
    const postFormulas = ${postFormulasMatch[1]};
    
    // Export as JSON
    const formulasData = {
      gateFormulas,
      postFormulas
    };
    
    // Convert functions to strings
    const processFormulas = (formulas) => {
      const result = {};
      
      Object.entries(formulas).forEach(([key, formula]) => {
        result[key] = {
          ...formula,
          price_calculation: {
            ...formula.price_calculation,
            code: formula.price_calculation.code.toString()
          }
        };
      });
      
      return result;
    };
    
    const processedData = {
      gateFormulas: processFormulas(gateFormulas),
      postFormulas: processFormulas(postFormulas)
    };
    
    console.log(JSON.stringify(processedData, null, 2));
  `;
  
  // Write the extracted code to a temporary file
  const tempFilePath = path.join(__dirname, 'temp-formulas.js');
  fs.writeFileSync(tempFilePath, extractedCode);
  
  console.log('Extracted formulas code to temporary file');
  console.log('Run the following command to extract the JSON data:');
  console.log(`node ${tempFilePath} > formulas-data.json`);
  
} catch (error) {
  console.error('Error extracting formulas:', error);
}
