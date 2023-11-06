import createDebug from 'debug'
import { bufferGeojson } from '../../utils/bufferGeojson'
import { FilterGeojson } from '../../utils/filterGeojson'
import { fileFiltered } from './config.const'
const debug = createDebug('buffer')
debug('Start')

const geojson = (await Bun.file(fileFiltered).json()) as FilterGeojson

const bufferedGeojson = bufferGeojson(geojson, 10)

const file = `${import.meta.dir}/data/officialDataBuffered.geojson`
debug('Write', file)
Bun.write(file, JSON.stringify(bufferedGeojson, undefined, 2))
