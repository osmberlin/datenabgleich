import { bbox } from '@turf/turf'
import { getFeatures } from 'query-fis-broker-wfs'

const bbox = [386000, 5812000, 386000, 5813000]

const endpoint = 'https://gdi.berlin.de/services/wfs/fussgaengernetz'

const layer = 'fussgaengernetz:b_strassenelemente'

const features = getFeatures(endpoint, layer, { bbox })

for await (const feature of features) {
  console.log(feature)
}
