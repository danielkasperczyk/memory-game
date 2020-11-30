import { pickLevel } from './handlers.js';
import { levels } from './queries.js';
import { showRecords } from './unit.js'

levels.forEach(level => level.addEventListener('click', pickLevel))
window.addEventListener('load', showRecords);
