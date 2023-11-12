import * as turf from '@turf/turf'
import createDebug from 'debug'
import { BufferGeojson } from '../../../utils/bufferGeojson'
import { GeoJsonPointFeatureCollection } from '../../../utils/types'
import {
  fileMatchedOfficialDataWithoutOsm,
  fileMatchedOsmDataWithoutOfficial,
  fileOfficialDataBuffered,
  fileOsmDataRaw,
} from '../config.const'
const debug = createDebug('matching')
debug('Start')

const overpass = (await Bun.file(fileOsmDataRaw).json()) as GeoJsonPointFeatureCollection

const official = (await Bun.file(fileOfficialDataBuffered).json()) as BufferGeojson

// Filter the official Data down to only those features that are missing in OSM.
// Return the centroid for those official data features.
// NEXT: This data need to be added to OSM or marked as irrelevant.
const matchedOfficialFeaturesWithoutOsm = official.features
  .map((officialFeature) => {
    const isInside = overpass.features.some((overpassFeature) => {
      return turf.booleanPointInPolygon(overpassFeature, officialFeature)
    })

    return isInside
      ? null
      : turf.centroid(officialFeature, { properties: officialFeature.properties })
  })
  .filter(Boolean)
const matchedOfficialDataWithoutOsm = turf.featureCollection(matchedOfficialFeaturesWithoutOsm)

debug('Write', fileMatchedOfficialDataWithoutOsm)
debug('Stats', official.features.length, 'official features')
debug('Stats', matchedOfficialFeaturesWithoutOsm.length, 'official features without OSM')
debug(
  'Stats',
  official.features.length - matchedOfficialFeaturesWithoutOsm.length,
  'official where filtered (already in OSM)',
)
Bun.write(
  fileMatchedOfficialDataWithoutOsm,
  JSON.stringify(matchedOfficialDataWithoutOsm, undefined, 2),
)

// Filter the OSM Data down to only those features that are missing in the official data.
// Returns the OSM features.
// NEXT: Data can be used to validate if the OSM data are in fact a crossing.
//       In some situations we might want to delete them.
//       But most of the time it will be due to a different pedestrian base network, which is fine.
const matchedOsmFeaturesWithoutOfficialFeatures = overpass.features.filter((overpassFeature) => {
  const isInside = official.features.some((officialFeature) => {
    return turf.booleanPointInPolygon(overpassFeature, officialFeature)
  })

  return !isInside
})
const matchedOsmDataWithoutOfficialFeatures = turf.featureCollection(
  matchedOsmFeaturesWithoutOfficialFeatures,
)

debug('Write', fileMatchedOsmDataWithoutOfficial)
debug(
  'Stats',
  matchedOsmFeaturesWithoutOfficialFeatures.length,
  'OSM features that are not in official data',
)
Bun.write(
  fileMatchedOsmDataWithoutOfficial,
  JSON.stringify(matchedOsmDataWithoutOfficialFeatures, undefined, 2),
)
