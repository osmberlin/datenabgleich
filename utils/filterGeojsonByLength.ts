import * as turf from '@turf/turf'
import createDebug from 'debug'
import { filterGeojsonByProperty } from './filterGeojsonByProperty'

export type AllowedPropertyKeys = string[]
export type FeaturesFilter = { [key: string]: string }
export type FilterGeojson = Awaited<ReturnType<typeof filterGeojsonByProperty>>

export const filterGeojsonByLength = (
  geojson: Awaited<ReturnType<typeof filterGeojsonByProperty>>,
  minLengthMeters: number,
) => {
  const debug = createDebug('filterGeojsonByLength')
  const initialCount = geojson.features.length
  debug('Config', { minLengthMeters })

  const filteredFeatures = geojson.features.filter((feature) => {
    return turf.length(feature, { units: 'meters' }) >= minLengthMeters
  })

  debug(
    'Success',
    filteredFeatures.length,
    'features',
    initialCount - filteredFeatures.length,
    'removed',
  )

  return turf.featureCollection(filteredFeatures)
}
