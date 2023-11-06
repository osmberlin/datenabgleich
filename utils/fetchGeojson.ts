import createDebug from 'debug'
import { FeatureCollection } from '../types'
import { createWfsUrl } from './createWfsUrl'

export const fetchGeojson = async (wfsUrl: ReturnType<typeof createWfsUrl>) => {
  const debug = createDebug('pull')
  debug('Fetching', wfsUrl)

  const userAgend = 'https://github.com/osmberlin/datenabgleich/'
  const response = await fetch(wfsUrl, {
    mode: 'cors',
    redirect: 'follow',
    headers: { 'User-Agent': userAgend },
  })

  if (!response.ok) {
    console.error(response.statusText, { statusCode: response.status, url: wfsUrl, response })
    throw new Error(response.statusText)
  }

  const jsonText = await response.text()
  const json = (await JSON.parse(jsonText)) as FeatureCollection
  debug('Success', json?.features?.length, 'features')

  return json
}
