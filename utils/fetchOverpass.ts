import createDebug from 'debug'
import osmtogeojson from 'osmtogeojson'
import { Bbox } from './types'

export type FetchOverpass = Awaited<ReturnType<typeof fetchOverpass>>

export const geoJsonBboxToOverpassBbox = (bbox: Bbox) => {
  return [bbox[1], bbox[0], bbox[3], bbox[2]] as const
}

export const fetchOverpass = async (overpassConditions: string, bbox: Bbox) => {
  const debug = createDebug('fetchOverpass')
  const overpassBbox = geoJsonBboxToOverpassBbox(bbox)

  const conditions = overpassConditions.replaceAll('{{bbox}}', overpassBbox.join(','))
  const query = `[out:json][timeout:25];${conditions};out geom;`

  debug('Fetching', query)

  const userAgend = 'https://github.com/osmberlin/datenabgleich/'
  const overpassUrl = `http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
  const response = await fetch(overpassUrl, {
    mode: 'cors',
    redirect: 'follow',
    headers: { 'User-Agent': userAgend },
  })

  if (!response.ok) {
    console.error(response.statusText, { statusCode: response.status, url: overpassUrl, response })
    throw new Error(response.statusText)
  }

  const jsonText = await response.text()
  const json = await JSON.parse(jsonText)
  const geoJson = osmtogeojson(json)
  debug('Success', geoJson?.features?.length, 'features')

  return geoJson
}
