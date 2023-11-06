import { createGeoJson } from './createGeoJson'

export const filterGeojson = (
  geojson: ReturnType<typeof createGeoJson>,
  keyValueFilter: { [key: string]: string },
) => {
  const [filterKey, filterValue] = Object.entries(keyValueFilter)[0]
  const filteredFeatures = geojson.filter((feature) => {
    Object.entries(feature.properties).find(([key, value]) => {
      key.toLowerCase() === filterKey.toLowerCase() &&
        value.toLowerCase() === filterValue.toLowerCase()
    })
  })
  return filteredFeatures
}
