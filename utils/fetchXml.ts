import createDebug from 'debug'

export const fetchXml = async (wfsUrl: URL) => {
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
