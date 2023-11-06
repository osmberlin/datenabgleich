import createDebug from 'debug'
import { FetchGeojson } from '../../utils/fetchGeojson'
import { filterGeojson } from '../../utils/filterGeojson'
import { fileRaw } from './config.const'
import { config } from './config.const'
import { fileFiltered } from './config.const'
const debug = createDebug('filter')
debug('Start')

const geojson = (await Bun.file(fileRaw).json()) as FetchGeojson
const filtredGeojson = filterGeojson(geojson, config.allowedPropertyKeys, config.featuresFilter)

debug('Write', fileFiltered)
Bun.write(fileFiltered, JSON.stringify(filtredGeojson, undefined, 2))
