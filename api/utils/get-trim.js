import trims from '../data/trims.json'

export const getTrim = (uuid) => trims.find(trim => trim.uuid === uuid)