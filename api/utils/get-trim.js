import trims from '../data/trims.min.json'

export const getTrim = (uuid) => trims.find(trim => trim.uuid === uuid)