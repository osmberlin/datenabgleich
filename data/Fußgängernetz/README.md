# Datenabgleich Fußgängernetz Berlin

## Ziel

Überprüfen, ob in OpenStreetMap (OSM) alle Gehwege eingetragen sind, die in offiziellen Daten zu finden sind.

- Fehlende Gehwege werden in OSM nachgetragen.
- "Fehler" in den offiziellen Daten werden vermkert und für OSM ignoriert.

## Datenquelle

* Description https://daten.berlin.de/datensaetze/fu%C3%9Fg%C3%A4ngernetz-wms
* Map https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=k_fussgaengernetz@senstadt&bbox=394346,5814845,394569,5814989
* Documentation https://fbinter.stadt-berlin.de/fb_daten/beschreibung/datenformatbeschreibung/Datenformatbeschreibung_Fussgaengernetz.pdf
* URLs https://gdi.berlin.de/geonetwork/srv/ger/catalog.search#/metadata/f1995e5e-9930-3184-a9a4-136b59481f36
* WFS GetCapabilities https://gdi.berlin.de/services/wfs/fussgaengernetz?REQUEST=GetCapabilities&SERVICE=wfs

## Lizenz

> Für die Nutzung der Daten ist die Datenlizenz Deutschland - Namensnennung - Version 2.0 anzuwenden. Die Lizenz ist über https://www.govdata.de/dl-de/by-2-0 abrufbar. Der Quellenvermerk gemäß (2) der Lizenz lautet
> > Geoportal Berlin / Fußgängernetz

## Offizielle Beschribung der Datenquelle

> **Kurzbeschreibung:**
> Das Fußgängernetz ist ein Knoten-Kanten-Modell der Fußwege Berlins. Es ist ein eigenständiges, unabhängiges und gleichrangiges Netz neben dem Detailnetz. Die zwei Netze unterscheiden sich durch Ihre Nutzungsart. Das Fußgängernetz steht für das gesamte Land Berlin zur Verfügung und besteht aus zwei Einheiten, dem Kantennetz und den zugehörigen Knoten.
>
> **Datengrundlage:**
> - vermessungstechnische Straßenbefahrungen 2014-2016
> - automatische Generierung der Linien anhand bei der Straßenbefahrung erfassten Flächen
> - zusätzliche Datenerhebung für IGA-App 2017
> - manuelle Nachbearbeitung
>
> Maßstab der Erfassung:
> 1:1.000
>
> Koordinatensystem:
> ETRS89 / UTM zone 33N
>
> Anzeigbarer Maßstabsbereich:
> 1:250 - 1:210.000
>
> erzeugt am: 09.08.2022
> aktualisiert am:
>
> Aktualisierungszyklus:  wenn erforderlich
