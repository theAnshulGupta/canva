import * as llm from "./llm"


export async function getSlidesForText(text){
    let prompt = `Given a 800 x 600 pixel canvas, generate a design that looks very unique and interesting consistent presentation slide of the following elements. Use a variety of shapes, objects, and elements to make the slideshow look aesthetically pleasing. Return the response as a JSON array. Here is the structure for a TEXT object: { "type": "TEXT", "children": ["text content"], "color": "#hexcode", "decoration": "underline", "fontStyle": "italic", "fontWeight": "bold", "textAlign": "center", "fontSize": 30, "top": 0, "left": 0, "width": 0, "height": 0 }, and here is the structure for SHAPES { "type": "SHAPE", "paths": [ { "d": "M 0 0 H 100 V 100 H 0 L 0 0", "stroke": { "color": "#000000", "weight": 20, "strokeAlign": "inset" // "width": 2, }, "fill": { "dropTarget": false, } } ], "height": 100, "width": 100, "left": 580, "top": 380, "viewBox": { "height": 100, "width": 100, "left": 0, "top": 0 } }. Adjust / remove / add the parameters as necessary, varying them and positioning the elements in a way that is visually appealing. Below is a list of elements, labeled elements-1...etc repsectively. Return a JSON array as {"elements-1":<element>, "elements-2":<element>}. Below are the elements. In addition to these elements which are provided and supposed to be text, randomly generate abstract shapes and elements that are interested and would improve the look of the slideshow:\n` + text
    let response = await llm.submitPromptAndGetResponse(prompt); 
    // console.log(response);
    try {
        const parsedJson = llm.parseJsonFromString(response?.message.content);
        return parsedJson;
      } catch (error) {
        // throw error
        console.error(error);
    }
}


export async function validateAndCorrectElements(elements) {
    const results = {};
  
    Object.entries(elements).forEach(([key, element]) => {
      const result = { isValid: true, messages: [], correctedElement: null };
  
      // Define the allowed structure for TEXT and SHAPE elements
      const allowedTextKeys = ['type', 'children', 'color', 'decoration', 'fontStyle', 'fontWeight', 'textAlign', 'fontSize', 'top', 'left', 'width'];
      const allowedShapeKeys = ['type', 'paths', 'height', 'width', 'left', 'top', 'viewBox', "fill", "stroke"];
  
      if (element.type === 'TEXT') {
        // Remove keys not allowed in TEXT elements
        result.correctedElement = Object.keys(element)
          .filter(key => allowedTextKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = element[key];
            return obj;
          }, {});
  
        // Check for missing keys
        const missingKeys = allowedTextKeys.filter(key => !(key in result.correctedElement));
        if (missingKeys.length > 0) {
          result.isValid = false;
          result.messages.push(`Missing keys for TEXT element: ${missingKeys.join(', ')}`);
        }

      } else if (element.type === 'SHAPE') {
        // Remove keys not allowed in SHAPE elements and correct structure
        const correctedShape = Object.keys(element)
          .filter(key => allowedShapeKeys.includes(key) || key === 'paths')
          .reduce((obj, key) => {
            if (key === 'paths') {
              obj[key] = element[key].map(path => {
                if (path.stroke && path.stroke.width) {
                  path.stroke.weight = path.stroke.width;
                  delete path.stroke.width;
                  result.messages.push("Corrected 'width' to 'weight' in stroke.");
                }
                return path;
              });
            } else {
              obj[key] = element[key];
            }
            return obj;
          }, {});
  
        // Ensure viewBox left and top are zero
        if (correctedShape.viewBox.left !== 0 || correctedShape.viewBox.top !== 0) {
          correctedShape.viewBox.left = 0;
          correctedShape.viewBox.top = 0;
          result.messages.push("viewBox left and top must be zero.");
        }
  
        result.correctedElement = correctedShape;
      } else {
        result.isValid = false;
        result.messages.push(`Unknown element type: ${element.type}`);
      }
  
      results[key] = result;
    });
  
    return results;
}
  
  