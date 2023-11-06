import createDebug from 'debug'
import { createWfsUrl } from '../../utils/createWfsUrl'
import { fetchGeojson } from '../../utils/fetchGeojson'
import { config } from './config.const'
const debug = createDebug('fetch')

const wfsUrl = createWfsUrl(config.endpoint, config.layer, { bbox: config.bbox })
const geojson = await fetchGeojson(wfsUrl)

export const fileRaw = `${import.meta.dir}/data/officialDataRaw.geojson`
debug('Write', fileRaw)
Bun.write(fileRaw, JSON.stringify(geojson, undefined, 2))
