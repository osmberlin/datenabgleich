import * as turf from '@turf/turf'
import createDebug from 'debug'
import { filterGeojson } from './filterGeojson'

export type Buffer =
  /** Buffer in Meter (m) */
  number
export type BufferGeojson = Awaited<ReturnType<typeof bufferGeojson>>

export const bufferGeojson = (
  geojson: Awaited<ReturnType<typeof filterGeojson>>,
  buffer: Buffer,
) => {
  const debug = createDebug('bufferGeojson')
  debug('Config', buffer, 'meters')

  const bufferedFeatures = geojson.features.map((feature) =>
    // https://turfjs.org/docs/#buffer
    turf.buffer(feature, buffer, { units: 'meters' }),
  )
  debug('Success', bufferedFeatures.length, 'features')

  return turf.featureCollection(bufferedFeatures)
}
