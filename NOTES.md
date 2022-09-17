# REST API

Endpoints mit jeweils einer Funktion im Backend pro Endpoint / HTTP method Kombination: 
```plaintext
/api/execute?cmd=reboot
  GET:  Einfache Befehle (auch shutdown etc.)

/api/control[?cmd=play]
  GET:  Infos über aktuell gespielten Track / aktuelle RFID-Karte etc.
        WebSockets machen hier vermutlich Sinn
        Optional Befehle zum skippen, play/pause etc.

/api/cover
  GET:  Aktuelles Cover-Image holen

/api/settings[?section=wifi]
  GET:  Aktuelle Settings holen (inkl. WLAN, FTP, MQTT, ...)
        Optional auch nur Teile davon
  PUT:  Settings setzen

/api/debug
  GET:  Systemparameter holen
        Quasi das aktuelle "/info". Momentan ist es einfacher Text. Ich würde hier JSON mit fester Struktur bevorzugen.
        Englisch-only reicht, ist ja quasi nur für Debugging.

/api/log
  GET:  Log holen
        Hier ist Plaintext völlig okay
```

Dazu kommt noch ein `files` Endpoint, den ich erstmal etwas außen vor gelassen habe. Wird genutzt, um den Dateibaum anzuzeigen, Dateien/Ordner hochzuladen etc. Das muss ich mir noch genauer anschauen, scheint ja schon einiges an Hirnschmalz reingeflossen zu sein.
```plaintext
/api/files
  GET:  Datenverzeichnis holen

/api/files/upload
  POST: File upload
...
```

# Minor ToDos
- Replace DaisyUI with handmade range sliders without transparency