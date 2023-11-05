import * as xml2js from 'xml2js'

export const xmlToJson = async (xmlText: string, cleanupTagPrefix?: string) => {
  const cleanupLayerNameFromTagName = (name: string) => {
    if (cleanupTagPrefix) {
      return name.replace(`${cleanupTagPrefix}:`, '')
    }
    return name
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

  return json
}
