import createDebug from 'debug'
import { filterGeojson } from '../../utils/filterGeojson'
import { config } from './config.const'
import { fileRaw } from './1-fetch'
import { fetchGeojson } from '../../utils/fetchGeojson'
const debug = createDebug('filter')

const geojson = (await Bun.file(fileRaw).json()) as Awaited<ReturnType<typeof fetchGeojson>>
const filtredGeojson = filterGeojson(geojson, config.allowedPropertyKeys, config.featuresFilter)

export const fileFiltered = `${import.meta.dir}/data/officialDataFiltered.geojson`
debug('Write', fileFiltered)
Bun.write(fileFiltered, JSON.stringify(filtredGeojson, undefined, 2))
