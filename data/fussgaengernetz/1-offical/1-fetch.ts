import createDebug from 'debug'
import { createWfsUrl } from '../../../utils/createWfsUrl'
import { fetchGeojson } from '../../../utils/fetchGeojson'
import { configOfficialData } from '../config.const'
import { fileOfficialDataRaw } from '../config.const'
const debug = createDebug('offical:fetch')
debug('Start')

const wfsUrl = createWfsUrl(configOfficialData.endpoint, configOfficialData.layer, {
  bbox: configOfficialData?.bbox,
})
const geojson = await fetchGeojson(wfsUrl)

debug('Write', fileOfficialDataRaw)
Bun.write(fileOfficialDataRaw, JSON.stringify(geojson, undefined, 2))
