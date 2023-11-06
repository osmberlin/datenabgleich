import createDebug from 'debug'
import { bufferGeojson } from '../../utils/bufferGeojson'
import { filterGeojson } from '../../utils/filterGeojson'
import { fileFiltered } from './2-filter'
import { config } from './config.const'
const debug = createDebug('filter')

const geojson = (await Bun.file(fileFiltered).json()) as Awaited<ReturnType<typeof filterGeojson>>

const bufferedGeojson = bufferGeojson(geojson, 10)

const file = `${import.meta.dir}/data/officialDataBuffered.geojson`
debug('Write', file)
Bun.write(file, JSON.stringify(bufferedGeojson, undefined, 2))
