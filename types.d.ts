import * as turf from '@turf/turf'

// OUR OWN ===
export type FeatureCollection = ReturnType<typeof turf.featureCollection>

// BUN specific ===
// We might need https://bun.sh/docs/typescript#dom-types

// RESET ===
// https://github.com/total-typescript/ts-reset fixes .filter(Boolean) and similar cases
// https://www.totaltypescript.com/ts-reset
import '@total-typescript/ts-reset'
