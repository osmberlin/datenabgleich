import * as turf from '@turf/turf'
import { filterGeojson } from './filterGeojson'

export type Buffer =
  /** Buffer in Meter (m) */
  number

export const bufferGeojson = (
  geojson: Awaited<ReturnType<typeof filterGeojson>>,
  buffer: Buffer,
) => {
  const bufferedFeatures = geojson.features.map((feature) =>
    // https://turfjs.org/docs/#buffer
    turf.buffer(feature, buffer, { units: 'meters' }),
  )
  return turf.featureCollection(bufferedFeatures)
}
