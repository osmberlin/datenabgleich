import createDebug from 'debug'
import * as xml2js from 'xml2js'

// Based on https://github.com/derhuerst/query-fis-broker-wfs/blob/master/get-features.js
const bbox = [386000, 5812000, 386000, 5813000]
const endpoint = 'https://gdi.berlin.de/services/wfs/fussgaengernetz'
const cleanupTagPrefix = 'fussgaengernetz'
const layer = 'fussgaengernetz:b_strassenelemente'
const createWfsUrl = (
  endpoint: string,
  layer: string,
  opt?: {
    bbox?: number[]
    crs?: string
    results?: number
    sortBy?: string
    props?: any[]
  },
) => {
  const debug = createDebug('createWfsUrl')
  debug('input', endpoint, layer, opt)

  const url = new URL(endpoint)
  url.searchParams.append('service', 'WFS')
  url.searchParams.append('version', '2.0.0')
  url.searchParams.append('request', 'GetFeature')
  url.searchParams.append('typeNames', layer)
  url.searchParams.append('srsName', opt?.crs || 'EPSG:4326')
  opt?.bbox && url.searchParams.append('bbox', opt.bbox.join(','))
  opt?.results && url.searchParams.append('results', String(opt.results))
  opt?.sortBy && url.searchParams.append('sortBy', opt.sortBy)
  opt?.props && url.searchParams.append('props', opt.props.join(','))

  debug('created', url.toJSON())

  return url
}

const wfsUrl = createWfsUrl(endpoint, layer, { bbox })

const fetchXml = async (wfsUrl: URL) => {
  const debug = createDebug('pull')
  debug('Fetching', wfsUrl)

  const userAgend = 'https://github.com/osmberlin/datenabgleich/'
  const response = await fetch(wfsUrl, {
    mode: 'cors',
    redirect: 'follow',
    headers: {
      'User-Agent': userAgend,
      Accept: 'text/xml; subtype=gml/3.2.1',
    },
  })

  if (!response.ok) {
    console.error(response.statusText, { statusCode: response.status, url: wfsUrl, response })
    throw new Error(response.statusText)
  }

  const xmlText = await response.text()
  debug('Success')

  return xmlText
}

const debug = createDebug('pull')
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
