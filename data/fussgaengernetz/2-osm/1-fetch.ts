import createDebug from 'debug'
import { fetchOverpass } from '../../../utils/fetchOverpass'
import { configOsmData, fileOsmDataRaw } from '../config.const'
const debug = createDebug('osm:fetch')
debug('Start')

const geojson = await fetchOverpass(configOsmData.overpassConditions, configOsmData.geoJsonBbox)

debug('Write', fileOsmDataRaw)
Bun.write(fileOsmDataRaw, JSON.stringify(geojson, undefined, 2))
