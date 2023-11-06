import createDebug from 'debug'
import { createWfsUrl } from '../../utils/createWfsUrl'
import { fetchXml } from '../../utils/fetchXml'
import { xmlToJson } from '../../utils/xmlToJson'
import { createGeoJson } from '../../utils/createGeoJson'
import { filterGeojson } from '../../utils/filterGeojson'
const debug = createDebug('pull')

const bbox = [386000, 5812000, 386000, 5813000]
const endpoint = 'https://gdi.berlin.de/services/wfs/fussgaengernetz'
const cleanupTagPrefix = 'fussgaengernetz'
const layer = 'fussgaengernetz:b_strassenelemente'
const propertyFilter = [
  'FID', // Fortlaufende Nummer
  'ELE M_NR', // Element-Nr. des Fußgängernetzes (inhaltlich an Detailnetz angelehnt), wird von Verbindungspunkten begonnen und abgeschlossen (VON_VP und BIS_VP)
  'EL_LAGE', // Wir wollen: „fgfb“: „Auf der Fahrbahn“: Kante verläuft in 0,5 m Abstand zum rechten Fahrbahnrand oder ist eine Querungskante (im Kreuzungsbereich)
  'STR_NAME', // Straßenname
  'STRKLASSE', // Wir wollen: „Q“: Querung (im Kreuzungsbereich)
  'BEZIRK',
  'ERHEBUNG', // Methode der Datenerhebung 1. „alki“: Amtliches Liegenschaftskatasterinformationssystem (ALKIS) 2. „gnr“: Automatische Generierung aus den Daten der Berlinweiten Straßenbefahrung 3. „lbil“: Luftbild 4. „unbk“: Unbekannt
  'HERKUNFT', // Datenquelle 1. „bwbf“: Berlinweite Straßenbefahrung 2. „rbsv“: Regionales Bezugssystem 3. „vmse“: Verkehrsmanagementsystem EDV Dr. Haller 4. „VMZ“: VMZ Betreibergesellschaft
]
// Will filter features for the property `[key]: value`
const keyValueFilter = { STRKLASSE: 'Q' }

const wfsUrl = createWfsUrl(endpoint, layer, { bbox })

const xmlText = await fetchXml(wfsUrl)
Bun.write(`${import.meta.dir}/data/officialDataRaw.xml`, xmlText)

const json = await xmlToJson(xmlText, cleanupTagPrefix)
const jsonFeatures = json['wfs:FeatureCollection']['wfs:member']
debug('JSON with', jsonFeatures?.length, 'lines')
Bun.write(`${import.meta.dir}/data/officialDataRaw.json`, JSON.stringify(json, undefined, 2))

const fullGeojsonFeatures = createGeoJson(jsonFeatures, propertyFilter)
Bun.write(
  `${import.meta.dir}/data/officialDataFull.geojson`,
  JSON.stringify(fullGeojsonFeatures, undefined, 2),
)

const filteredGeojsonFeatures = filterGeojson(fullGeojsonFeatures, keyValueFilter)
Bun.write(
  `${import.meta.dir}/data/officialDataFiltered.geojson`,
  JSON.stringify(filteredGeojsonFeatures, undefined, 2),
)

// Processed at als Attribut
