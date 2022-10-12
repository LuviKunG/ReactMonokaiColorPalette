import React from 'react';
import './App.css';
import ColorBlock from './ColorBlock';
import DisplayColor from './DisplayColor';
import colorDefault from './colors/default';
import colorBright from './colors/bright';
import colorNeo from './colors/neo';

function App() {
  const [showFlashMessage, setShowFlashMessage] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [color, setColor] = React.useState(null);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFlashMessage(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [showFlashMessage]);
  const colors = {
    "Default": colorDefault,
    "Bright": colorBright,
    "Neo": colorNeo,
  };
  const onColorSelected = (e, color) => {
    setColor(color);
  };
  const onColorHexClicked = (e, color) => {
    navigator.clipboard.writeText(color);
    setMessage('HEX copied to clipboard');
    setShowFlashMessage(true);
  };
  const onColorRGBClicked = (e, color) => {
    const hexToRgb = (hex) => {
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      return `rgb(${r}, ${g}, ${b})`;
    };
    navigator.clipboard.writeText(hexToRgb(color));
    setMessage('RGB copied to clipboard');
    setShowFlashMessage(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        Monokai Color Palette
      </header>
      <body>
        <div className="Color-container">
          {
            Object.entries(colors).map(([groupName, colorMaps]) => {
              return (
                <div className="Color-group">
                  <h2 className="Color-group-name">{groupName}</h2>
                  {
                    colorMaps.map((entry) => {
                      return (
                        <ColorBlock color={entry.color} onClick={onColorSelected}>{entry.name}</ColorBlock>
                      );
                    })
                  }
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
