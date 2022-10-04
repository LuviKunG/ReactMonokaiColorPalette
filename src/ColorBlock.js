import './ColorBlock.css';

function ColorBlock({ color, onClick, children }) {
    const calculateContrast = (color) => {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };
    const onButtonColorClicked = (e) => {
        onClick?.(e, color);
    }
    return (
        <div className="ColorBlock">
            <button className="ColorBlock-button" style={{ backgroundColor: color }} onClick={onButtonColorClicked}>
                <span className="ColorBlock-button-text" style={{ color: calculateContrast(color) }}>{children ?? color}</span>
            </button>
        </div>
    );
}

export default ColorBlock;