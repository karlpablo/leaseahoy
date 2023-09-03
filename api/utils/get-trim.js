import trims from '../data/trims.json'

export default (uuid) => trims.find(trim => trim.uuid === uuid)