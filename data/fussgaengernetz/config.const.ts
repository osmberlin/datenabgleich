import { Config } from '../../types'

export const config: Config = {
  bbox: [386000, 5812000, 386000, 5813000],
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
  featuresFilter: { STRKLASSE: 'Q' },
}

export const fileRaw = `${import.meta.dir}/data/officialDataRaw.geojson`

export const fileFiltered = `${import.meta.dir}/data/officialDataFiltered.geojson`

export const fileBuffered = `${import.meta.dir}/data/officialDataBuffered.geojson`
