import React from 'react';
import './App.css';
import ColorBlock from './ColorBlock';
import colorDefault from './colors/default';
import colorBright from './colors/bright';
import colorNeo from './colors/neo';

function App() {
  const [showMessage, setShowMessage] = React.useState(false);
  const [color, setColor] = React.useState(null);
  React.useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 1000);
    }
  }, [showMessage]);
  const colors = {
    "Default": colorDefault,
    "Bright": colorBright,
    "Neo": colorNeo,
  };
  const onColorSelected = (e, color) => {
    console.log('copied to clipboard: ' + color);
    navigator.clipboard.writeText(color);
    setShowMessage(true);
    setColor(color);
  };
  const hexToRgb = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
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
          color && <div className="DisplayColor"><p>{color} | {hexToRgb(color)}</p></div>
        }
        {
          showMessage && <div className="FlashMessage"><p>Color copied to clipboard</p></div>
        }
      </body>
    </div>
  );
}

export default App;
