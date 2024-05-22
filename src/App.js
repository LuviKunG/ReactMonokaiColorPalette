import { useState, useRef, useContext } from 'react';
import './App.css';
import ColorBlock from './ColorBlock';
import DisplayColor from './DisplayColor';
import ColorContext from './contexts/colorcontext';
import colorHelper from './modules/colorhelper';

function App() {
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);
  const timer = useRef(null);
  const colorContext = useContext(ColorContext);
  const onColorSelected = (event, color) => {
    setColor(color);
  };
  const onColorHexClicked = (event, color) => {
    navigator.clipboard.writeText(color);
    setMessage(color + ' copied to clipboard');
    setShowFlashMessage(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShowFlashMessage(false);
    }, 1000);
  };
  const onColorRGBClicked = (event, color) => {
    let colorRGBString = colorHelper.hexToRgb(color);
    navigator.clipboard.writeText(colorRGBString);
    setMessage(colorRGBString + ' copied to clipboard');
    setShowFlashMessage(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShowFlashMessage(false);
    }, 1000);
  };
  return (
    <div className="App">
      <header className="App-header">
        Monokai Color Palette
      </header>
      <div className="App-subheader">
        Create by Thanut Panichyotai (<a href="https://luvikung.github.io/">@LuviKunG</a>)
      </div>
      <div className="App-introduction">
        How to use: Click on the color to show the color code. Click on the color code (HEX or RGB) to copy it to the clipboard.
      </div>
      <div className="Color-container">
        {
          Object.values(colorContext).map((entryColors, entryIndex) => {
            return (
              <div className="Color-group" key={entryIndex}>
                <h2 className="Color-group-name">{entryColors.name}</h2>
                <div className="Color-group-color">
                  {
                    entryColors.colors.map((entry, index) => {
                      return (
                        <ColorBlock color={entry.color} onClick={onColorSelected} key={index}>{entry.name}</ColorBlock>
                      );
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
      {
        color &&
        <div className='FixedFlex' style={{ bottom: '120px' }}>
          <div className='FixedFlex-item'>
            <DisplayColor color={color} onHEXClick={onColorHexClicked} onRGBClick={onColorRGBClicked} />
          </div>
        </div>
      }
      {
        showFlashMessage &&
        <div className='FixedFlex' style={{ bottom: '80px' }}>
          <div className='FixedFlex-item'>
            {message}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
