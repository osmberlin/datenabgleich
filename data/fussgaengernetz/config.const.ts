import { Bbox, ConfigOfficialData } from '../../utils/types'

export const configOfficialData: ConfigOfficialData = {
  // bbox: [386000, 5812000, 386000, 5813000],
  endpoint: 'https://gdi.berlin.de/services/wfs/fussgaengernetz',
  layer: 'fussgaengernetz:b_strassenelemente',
  allowedPropertyKeys: [
    // Fortlaufende Nummer
    'FID',
    // Element-Nr. des Fußgängernetzes (inhaltlich an Detailnetz angelehnt), wird von Verbindungspunkten begonnen und abgeschlossen (VON_VP und BIS_VP)
    'ELE M_NR',
    // Wir wollen: „fgfb“: „Auf der Fahrbahn“: Kante verläuft in 0,5 m Abstand zum rechten Fahrbahnrand oder ist eine Querungskante (im Kreuzungsbereich)
    'EL_LAGE',
    // Straßenname
    'STR_NAME',
    // Wir wollen: „Q“: Querung (im Kreuzungsbereich)
    'STRKLASSE',
    'BEZIRK',
    // Methode der Datenerhebung 1. „alki“: Amtliches Liegenschaftskatasterinformationssystem (ALKIS) 2. „gnr“: Automatische Generierung aus den Daten der Berlinweiten Straßenbefahrung 3. „lbil“: Luftbild 4. „unbk“: Unbekannt
    'ERHEBUNG',
    // Datenquelle 1. „bwbf“: Berlinweite Straßenbefahrung 2. „rbsv“: Regionales Bezugssystem 3. „vmse“: Verkehrsmanagementsystem EDV Dr. Haller 4. „VMZ“: VMZ Betreibergesellschaft
    'HERKUNFT',
  ],
  bufferMeters: 3,
  featuresFilter: { STRKLASSE: 'Q' },
  minLengthMeters: 2,
}

export const configOsmData = {
  overpassConditions: `node["highway"="crossing"]({{bbox}})`,
  // Take the bbox from `officialDataBbox.geojson`
  geoJsonBbox: [13.09020528, 52.34037715, 13.74161157, 52.66000148] satisfies Bbox,
}

export const fileOfficialDataRaw = `${import.meta.dir}/data/officialDataRaw.geojson`

export const fileOfficialDataFiltered = `${import.meta.dir}/data/officialDataFiltered.geojson`

export const fileOfficialDataBuffered = `${import.meta.dir}/data/officialDataBuffered.geojson`
export const fileOfficialDataBbox = `${import.meta.dir}/data/officialDataBbox.geojson`

export const fileOsmDataRaw = `${import.meta.dir}/data/osmDataRaw.geojson`
export const fileMatchedOsmDataWithoutOfficial = `${
  import.meta.dir
}/data/matchedOsmDataWithoutOfficial.geojson`
export const fileMatchedOfficialDataWithoutOsm = `${
  import.meta.dir
}/data/matchedOfficialDataWithoutOsm.geojson`
