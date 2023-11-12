import * as turf from '@turf/turf'
import createDebug from 'debug'
import { FetchGeojson } from '../../../utils/fetchGeojson'
import { fileOfficialDataBbox, fileOfficialDataRaw } from '../config.const'
const debug = createDebug('official:bbox')
debug('Start')

const geojson = (await Bun.file(fileOfficialDataRaw).json()) as FetchGeojson

const bboxes = geojson.features.map((f) => f.bbox).filter(Boolean)
const featureCollection = turf.featureCollection(bboxes.map((bbox) => turf.bboxPolygon(bbox)))
const maxBbox = turf.bbox(featureCollection)

debug('Write', fileOfficialDataBbox)
debug('maxBbox', maxBbox)
Bun.write(fileOfficialDataBbox, JSON.stringify(maxBbox, undefined, 2))
