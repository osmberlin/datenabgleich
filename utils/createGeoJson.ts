import * as turf from '@turf/turf'
import createDebug from 'debug'

export const createGeoJson = (
  jsonFeatures: Record<string, Record<string, any>>[],
  propertyFilter: string[],
) => {
  const debug = createDebug('createGeoJson')
  propertyFilter = propertyFilter.map((p) => p.toLowerCase())

  return jsonFeatures
    .map((featureWrapper) => {
      const key = Object.keys(featureWrapper).at(0) || ''
      const feature = featureWrapper[key]

      const properties = Object.fromEntries(
        Object.entries(feature).filter(([key, _]) => propertyFilter.includes(key.toLowerCase())),
      )

      const coords = feature?.['geom']?.['gml:LineString']?.['gml:posList']?.split(' ')?.map(Number)
      const coordinates = []
      for (let i = 0; i < coords.length; i += 2) {
        coordinates.push([coords[i], coords[i + 1]])
      }

      if (!properties) {
        debug('No properties found for feature', feature)
        return undefined
      }
      if (!coordinates) {
        debug('No coordinates found for feature', feature)
        return undefined
      }
      return turf.lineString(coordinates, properties)
    })
    .filter(Boolean)
}
