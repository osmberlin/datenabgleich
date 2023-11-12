import createDebug from 'debug'
import { FetchGeojson } from '../../../utils/fetchGeojson'
import { filterGeojsonByLength } from '../../../utils/filterGeojsonByLength'
import { filterGeojsonByProperty } from '../../../utils/filterGeojsonByProperty'
import { configOfficialData, fileOfficialDataFiltered, fileOfficialDataRaw } from '../config.const'
const debug = createDebug('official:filter')
debug('Start')

const geojson = (await Bun.file(fileOfficialDataRaw).json()) as FetchGeojson

const filterProperty = filterGeojsonByProperty(
  geojson,
  configOfficialData.allowedPropertyKeys,
  configOfficialData.featuresFilter,
)
const filterLength = filterGeojsonByLength(filterProperty, configOfficialData.minLengthMeters)

debug('Write', fileOfficialDataFiltered)
Bun.write(fileOfficialDataFiltered, JSON.stringify(filterLength, undefined, 2))
