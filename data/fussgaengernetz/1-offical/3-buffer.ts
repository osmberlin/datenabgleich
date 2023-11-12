import createDebug from 'debug'
import { bufferGeojson } from '../../../utils/bufferGeojson'
import { FilterGeojson } from '../../../utils/filterGeojsonByProperty'
import {
  configOfficialData,
  fileOfficialDataBuffered,
  fileOfficialDataFiltered,
} from '../config.const'
const debug = createDebug('official:buffer')
debug('Start')

const geojson = (await Bun.file(fileOfficialDataFiltered).json()) as FilterGeojson

const bufferedGeojson = bufferGeojson(geojson, configOfficialData.bufferMeters)

debug('Write', fileOfficialDataBuffered)
Bun.write(fileOfficialDataBuffered, JSON.stringify(bufferedGeojson, undefined, 2))
