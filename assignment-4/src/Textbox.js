import React from 'react';
import "./Textbox.css";
function Textbox() {
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="userInput"></input>
        <button type="button" className="mybutton">Generate WordCloud</button>
      </header>
    </div>
  );
}

export default Textbox;



//   Have textbox with the ability to write characters
// On button press extract text
// Process text and look word by word and having a countMap for each character cMap[word]++ else cMap[word] = 0
// Sort the cMap from highest to smallest push the 5 highest words into the output array and change their size by array idx
// On changed text and button repress, resort and check if item is in array if it is then move the locate or keep, else add to the array or pop, etc.
  // Maybe have two arrays one with old output and one with new output then compare and move accordingly