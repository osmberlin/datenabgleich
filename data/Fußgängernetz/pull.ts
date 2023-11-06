import createDebug from 'debug'
import { createWfsUrl } from '../../utils/createWfsUrl'
import { fetchGeojson } from '../../utils/fetchGeojson'
import { AllowedPropertyKeys, FeaturesFilter, filterGeojson } from '../../utils/filterGeojson'
const debug = createDebug('pull')

const bbox = [386000, 5812000, 386000, 5813000]
const endpoint = 'https://gdi.berlin.de/services/wfs/fussgaengernetz'
const layer = 'fussgaengernetz:b_strassenelemente'
const allowedPropertyKeys: AllowedPropertyKeys = [
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
const featuresFilter: FeaturesFilter = { STRKLASSE: 'Q' }

const wfsUrl = createWfsUrl(endpoint, layer, { bbox })

const geojson = await fetchGeojson(wfsUrl)
Bun.write(`${import.meta.dir}/data/officialDataRaw.geojson`, JSON.stringify(geojson, undefined, 2))

const filtredGeojson = filterGeojson(geojson, allowedPropertyKeys, featuresFilter)
Bun.write(
  `${import.meta.dir}/data/officialDataFiltered.geojson`,
  JSON.stringify(filtredGeojson, undefined, 2),
)

// Processed at als Attribut
