import createDebug from 'debug'
import * as xml2js from 'xml2js'
import { fetchXml } from '../../utils/fetchXml'
import { createWfsUrl } from '../../utils/createWfsUrl'
const debug = createDebug('pull')

// Based on https://github.com/derhuerst/query-fis-broker-wfs/blob/master/get-features.js
const bbox = [386000, 5812000, 386000, 5813000]
const endpoint = 'https://gdi.berlin.de/services/wfs/fussgaengernetz'
const cleanupTagPrefix = 'fussgaengernetz'
const layer = 'fussgaengernetz:b_strassenelemente'

const wfsUrl = createWfsUrl(endpoint, layer, { bbox })

const xmlText = await fetchXml(wfsUrl)
Bun.write('./test.xml', xmlText)

const cleanupLayerNameFromTagName = (name: string) => {
  return name.replace(`${cleanupTagPrefix}:`, '')
}
const json = await xml2js
  .parseStringPromise(xmlText, {
    trim: true,
    explicitArray: false,
    tagNameProcessors: [cleanupLayerNameFromTagName],
  })
  .then((result) => {
    return result
  })
  .catch((error) => {
    console.error(error)
  })

debug('JSON with', json['wfs:FeatureCollection']['wfs:member']?.length, 'lines')
Bun.write('./test.json', JSON.stringify(json, undefined, 2))
