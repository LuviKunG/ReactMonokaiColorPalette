import { createContext } from 'react';
import defaultColors from '../colors/default.json';
import neoColors from '../colors/neo.json';
import brightColors from '../colors/bright.json';
const ColorContext = createContext({
    default: defaultColors,
    neo: neoColors,
    bright: brightColors
});
export default ColorContext;