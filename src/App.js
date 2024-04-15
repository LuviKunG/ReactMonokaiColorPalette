import { useState, useRef, useContext } from 'react';
import './App.css';
import ColorBlock from './ColorBlock';
import DisplayColor from './DisplayColor';
import ColorContext from './contexts/ColorContext';

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
    const hexToRgb = (hex) => {
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      return `rgb(${r}, ${g}, ${b})`;
    };
    let colorRGBString = hexToRgb(color);
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
      <body>
        <div className="Color-container">
          {
            Object.entries(colorContext).map(([, entryColors]) => {
              return (
                <div className="Color-group">
                  <h2 className="Color-group-name">{entryColors.name}</h2>
                  <div className="Color-group-color">
                    {
                      entryColors.colors.map((entry) => {
                        return (
                          <ColorBlock color={entry.color} onClick={onColorSelected}>{entry.name}</ColorBlock>
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
      </body>
    </div>
  );
}

export default App;
