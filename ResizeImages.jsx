/////////////////////////////////////////////////////////////////////////////// 
//ResizeDocs.jsx 
//Resize so that largest dimension is X pixels wide @ Y resolution 
/////////////////////////////////////////////////////////////////////////////// 

/////////////////////////////////////////////////////////////////////////////// 
//User should set the constants below: 
/////////////////////////////////////////////////////////////////////////////// 
const targetPixels=800; 
const docRes = 72; // Picture resolution in pixels 

/////////////////////////////////////////////////////////////////////////////// 
//PROGRAM AREA - USER SHOULD NOT CHANGE ANYTHING BELOW THIS 
/////////////////////////////////////////////////////////////////////////////// 
//assign variables 
const startRulerUnits; 
const startTypeUnits; 
const startDisplayDialogs; 

const downSizing = false 

/////////////////////////////////////////////////////////////////////////////// 
// Dispatch 
/////////////////////////////////////////////////////////////////////////////// 
try { 
  main(); 

/////////////////////////////////////////////////////////////////////////////// 
// Functions 
/////////////////////////////////////////////////////////////////////////////// 
  function main()  { 
    //collect dialog defaults so that the program can set them back afterwards 
    conststartDisplayDialogs = displayDialogs; 
    startRulerUnits = preferences.rulerUnits; 
    startTypeUnits = preferences.typeUnits; 

    //set dialogs 
    displayDialogs = DialogModes.NO; 
    preferences.rulerUnits = Units.PIXELS; 
    preferences.typeUnits = TypeUnits.PIXELS; 

    //collect the height, width & resolution of the active document 
    const activeDoc = app.activeDocument; 
    const docHeight= activeDoc.height; 
    const docWidth = activeDoc.width; 
    const docRatio = docWidth / docHeight; 

    if (docHeight > docWidth) { 
      docRatio = docHeight / docWidth; 
      newHeight = targetPixels; 
      newWidth = ((1.0 * newHeight) / docRatio) 
      newWidth = Math.round(newWidth); // make integer 
      //sizing up or down? 
      if (docHeight > targetPixels) { 
        downSizing = true 
      } 
    } 
    else { 
      docRatio = docWidth / docHeight; 
      newWidth = targetPixels; 
      newHeight = ((1.0 * newWidth) / docRatio) 
      newHeight = Math.round(newHeight); // make integer 
      //sizing up or down? 
      if (docWidth > targetPixels) { 
        downSizing = true 
      } 
    } 

    if (downSizing) { 
      resampleMeth = ResampleMethod.BICUBICSHARPER; 
    } else { 
      resampleMeth = ResampleMethod.BICUBICSMOOTHER; 
    } 

    activeDoc.resizeImage(newWidth, newHeight, docRes, resampleMeth) 

    //reset preferences to original 
    preferences.rulerUnits = startRulerUnits; 
    preferences.typeUnits = startTypeUnits; 
    displayDialogs = startDisplayDialogs; 

    activeDoc = null; 
  } //end function main 
} catch(e) { 
  alert( e ); 

  if ( undefined != startDisplayDialogs ) { 
    displayDialogs = startDisplayDialogs; 
  } 

  if ( undefined != startRulerUnits ) { 
    preferences.rulerUnits = startRulerUnits; 
  } 

  if ( undefined != startTypeUnits ) { 
    preferences.typeUnits = startTypeUnits; 
  } 
} 
