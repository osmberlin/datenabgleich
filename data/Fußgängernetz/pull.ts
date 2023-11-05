import createDebug from 'debug'
import { createWfsUrl } from '../../utils/createWfsUrl'
import { fetchXml } from '../../utils/fetchXml'
import { xmlToJson } from '../../utils/xmlToJson'
const debug = createDebug('pull')

// Based on https://github.com/derhuerst/query-fis-broker-wfs/blob/master/get-features.js
const bbox = [386000, 5812000, 386000, 5813000]
const endpoint = 'https://gdi.berlin.de/services/wfs/fussgaengernetz'
const cleanupTagPrefix = 'fussgaengernetz'
const layer = 'fussgaengernetz:b_strassenelemente'

const wfsUrl = createWfsUrl(endpoint, layer, { bbox })

const xmlText = await fetchXml(wfsUrl)
Bun.write('./test.xml', xmlText)

const json = await xmlToJson(xmlText, cleanupTagPrefix)
debug('JSON with', json['wfs:FeatureCollection']['wfs:member']?.length, 'lines')
Bun.write('./test.json', JSON.stringify(json, undefined, 2))
