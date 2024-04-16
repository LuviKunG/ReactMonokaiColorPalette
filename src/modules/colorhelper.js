const hexToRgb = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
};
const colorHelper = { hexToRgb };
export default colorHelper;