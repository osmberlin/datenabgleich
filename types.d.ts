import * as turf from '@turf/turf'

// OUR OWN ===
export type FeatureCollection = ReturnType<typeof turf.featureCollection>

export type Config = {
  bbox?: number[]
  endpoint: string
  layer: string
  allowedPropertyKeys: AllowedPropertyKeys
  /** @desc All features will be filterd to only include features that have a property of `key=value` */
  featuresFilter: FeaturesFilter
}

// BUN specific ===
// We might need https://bun.sh/docs/typescript#dom-types

// RESET ===
// https://github.com/total-typescript/ts-reset fixes .filter(Boolean) and similar cases
// https://www.totaltypescript.com/ts-reset
import '@total-typescript/ts-reset'
