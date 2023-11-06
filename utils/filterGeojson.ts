import * as turf from '@turf/turf'
import { fetchGeojson } from './fetchGeojson'

export type AllowedPropertyKeys = string[]
export type FeaturesFilter = { [key: string]: string }

export const filterGeojson = (
  geojson: Awaited<ReturnType<typeof fetchGeojson>>,
  allowedPropertyKeys: AllowedPropertyKeys,
  featuresFilter: FeaturesFilter,
) => {
  const filterKey = Object.keys(featuresFilter).at(0)!.toLowerCase()
  const filterValue = Object.values(featuresFilter).at(0)!.toLowerCase()
  allowedPropertyKeys = allowedPropertyKeys.map((p) => p.toLowerCase())

  const cleanedFeatures = geojson.features.map((feature) => {
    const filteredProperties = Object.fromEntries(
      Object.entries(feature.properties as Record<string, string | number | null>).filter(
        ([key, _]) => allowedPropertyKeys.includes(key.toLowerCase()),
      ),
    )
    return { ...feature, properties: filteredProperties }
  })

  const filteredFeatures = cleanedFeatures.filter((feature) => {
    return Object.entries(feature.properties).some(([key, value]) => {
      return key.toLowerCase() === filterKey && String(value).toLowerCase() === filterValue
    })
  })

  return turf.featureCollection(filteredFeatures)
}
