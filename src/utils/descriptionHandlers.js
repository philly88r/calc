/**
 * Description handling utility functions
 */

/**
 * Handle description changes for form inputs
 * @param {Object} params - Parameters
 * @param {Object} event - Event object from input change
 * @returns {Object} - Updated state object
 */
export const handleDescriptionChange = (params, event) => {
  const { 
    name, 
    value, 
    customItems = {}, 
    setCustomItems = () => {} 
  } = params;
  
  if (!name || !customItems) {
    return {};
  }
  
  // Create a copy of the custom items
  const updatedCustomItems = { ...customItems };
  
  // Update the description for the specified item
  if (updatedCustomItems[name]) {
    updatedCustomItems[name] = {
      ...updatedCustomItems[name],
      description: value
    };
    
    // If we have a setState function, call it
    if (typeof setCustomItems === 'function') {
      setCustomItems(updatedCustomItems);
    }
  }
  
  return updatedCustomItems;
};
