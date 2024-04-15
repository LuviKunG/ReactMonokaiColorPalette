import './DisplayColor.css';

function DisplayColor({ color, onHEXClick, onRGBClick }) {
  const hexToRgb = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const onHEXClicked = (e) => {
    onHEXClick?.(e, color);
  }
  const onRGBClicked = (e) => {
    onRGBClick?.(e, color);
  }
  return (
    <div className="DisplayColor">
      <div className="DisplayColor-box">
        <button className="DisplayColor-button" onClick={onHEXClicked}>
          <span className="DisplayColor-button-text">{color}</span>
        </button>
      </div>
      <div className="DisplayColor-box">
        <button className="DisplayColor-button" onClick={onRGBClicked}>
          <span className="DisplayColor-button-text">{hexToRgb(color)}</span>
        </button>
      </div>
    </div>
  );
}

export default DisplayColor;