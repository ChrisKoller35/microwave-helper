import { useState, useRef } from "react";

// Funktions-Beschreibungen für die Mikrowelle
const functions = [
  {
    id: "quick-defrost",
    label: "Quick Defrost (Auftauen)",
    short:
      "Automatisches Auftauen von Fleisch, Geflügel, Fisch, Gemüse und Brot. Zeit und Leistung stellt das Gerät für dich ein.",
    steps: [
      "Quick-Defrost-Taste drücken.",
      "Mit dem Drehrad die Lebensmittelgruppe (z. B. Fleisch, Geflügel, Gemüse) wählen und mit \"Auswahl/Uhr\" bestätigen.",
      "Mit dem Drehrad das Gewicht einstellen.",
      "START/+30s drücken. Beim Signalton Speisen wenden und erneut START/+30s drücken, um fortzufahren."
    ],
    hint:
      "Hilft dir, gefrorene Lebensmittel ohne Umrechnen der Auftauzeit schonend vorzubereiten."
  },
  {
    id: "auto-cook",
    label: "Auto Cook (Garprogramme)",
    short:
      "20 automatische Programme für typische Gerichte – Leistung und Zeit werden für dich gewählt.",
    steps: [
      "Auto-Cook-Taste drücken.",
      "Mit dem Drehrad das passende Gericht wählen (z. B. Fertiggericht, Gemüse, Reis) und mit \"Auswahl/Uhr\" bestätigen.",
      "START/+30s drücken und das Programm laufen lassen."
    ],
    hint:
      "Ideal, wenn du kein Gefühl für Leistungsstufen und Zeiten hast oder es einfach bequem möchtest."
  },
  {
    id: "keep-warm",
    label: "Keep Warm (Warmhalten)",
    short:
      "Hält bereits gegarte Speisen bis zu 60 Minuten warm, ohne sie stark weiter zu garen.",
    steps: [
      "Keep-Warm-Taste drücken.",
      "Am Drehrad \"heiß\" oder \"warm\" wählen.",
      "START/+30s drücken – die voreingestellte Zeit von 60 Minuten läuft.",
      "Zum Beenden Tür öffnen oder STOP/ECO drücken."
    ],
    hint:
      "Nur für frisch gegarte Speisen nutzen – nicht zum Aufwärmen von kalten Resten gedacht."
  },
  {
    id: "deodorization",
    label: "Deodorization (Geruchsbeseitigung)",
    short:
      "Entfernt Gerüche aus dem Garraum nach stark riechenden oder rauchigen Gerichten.",
    steps: [
      "Garraum grob reinigen und Essensreste entfernen.",
      "Deodorization-Taste drücken – der Vorgang startet automatisch.",
      "Bei Bedarf mit START/+30s die Laufzeit in 30-Sekunden-Schritten verlängern."
    ],
    hint:
      "Standardlaufzeit sind 5 Minuten, maximal 15 Minuten – praktisch nach Fisch, Käse oder angebrannten Speisen."
  },
  {
    id: "microwave",
    label: "Microwave (Mikrowelle)",
    short:
      "Klassisches Erwärmen und Garen mit frei wählbarer Leistungsstufe (z. B. 800 W, 600 W).",
    steps: [
      "Lebensmittel auf den Drehteller stellen und Tür schließen.",
      "Microwave-Taste drücken – es wird zunächst die höchste Leistung angezeigt.",
      "Mit dem Drehrad die gewünschte Leistungsstufe wählen und mit \"Auswahl/Uhr\" bestätigen.",
      "Mit dem Drehrad die Garzeit einstellen.",
      "START/+30s drücken, um den Vorgang zu starten."
    ],
    hint:
      "Für gleichmäßiges Erwärmen lieber eine mittlere Leistung wählen und etwas länger garen."
  },
  {
    id: "grill",
    label: "Grill",
    short:
      "Bräunt Speisen von oben, ähnlich wie ein kleiner Backofengrill.",
    steps: [
      "Lebensmittel auf den hohen Rost legen und in die Mikrowelle stellen.",
      "Grill-Taste drücken – die Grilltemperatur ist fest vorgegeben.",
      "Mit dem Drehrad die Grillzeit einstellen (bis zu 60 Minuten).",
      "START/+30s drücken. Speisen nach Bedarf einmal wenden."
    ],
    hint:
      "Perfekt für Toast, Baguettes, Würstchen oder Gratins – immer Ofenhandschuhe verwenden, da das Geschirr sehr heiß wird."
  },
  {
    id: "combi",
    label: "Combi (Mikrowelle + Grill)",
    short:
      "Kombiniert Mikrowellenhitze und Grill, damit Speisen innen schnell gar und außen gebräunt werden.",
    steps: [
      "Lebensmittel auf den geeigneten Rost legen und Tür schließen.",
      "Combi-Taste drücken und mit dem Drehrad den gewünschten Kombi-Modus auswählen.",
      "Mit dem Drehrad die Garzeit einstellen.",
      "START/+30s drücken. Speisen ggf. einmal wenden, wenn sie von beiden Seiten gebräunt werden sollen."
    ],
    hint:
      "Gut für Aufläufe, Pasta, Hähnchenteile oder Tiefkühlgerichte, die innen heiß und außen knusprig sein sollen."
  },
  {
    id: "grill-30",
    label: "Grill+30s",
    short:
      "Startet den Grill oder verlängert die Grillzeit in 30-Sekunden-Schritten.",
    steps: [
      "Lebensmittel in den Garraum stellen.",
      "Grill+30s drücken, um den Grill sofort zu starten.",
      "Für mehr Zeit Grill+30s mehrfach drücken – jede Betätigung fügt 30 Sekunden hinzu."
    ],
    hint:
      "Ideal, um am Ende noch etwas mehr Bräunung zu geben, z. B. für Käsekrusten oder Brot."
  },
  {
    id: "dial",
    label: "Drehrad",
    short:
      "Stellt je nach Modus Gewicht, Programmnummer, Temperatur oder Zeit ein.",
    steps: [
      "Nach dem Drücken einer Funktionstaste das Drehrad drehen, um zwischen Optionen zu wählen.",
      "Häufig mit der Taste \"Auswahl/Uhr\" bestätigen.",
      "Während des Garens kann das Drehrad verwendet werden, um die Restzeit zu verlängern oder zu verkürzen."
    ],
    hint:
      "Das Drehrad ist dein Hauptregler – fast jede Einstellung läuft hierüber."
  },
  {
    id: "select-clock",
    label: "Auswahl / Uhr",
    short:
      "Bestätigt Einstellungen, startet Programme und stellt die Uhrzeit ein.",
    steps: [
      "Nach einer Einstellung mit dem Drehrad die Taste \"Auswahl/Uhr\" drücken, um zu bestätigen.",
      "Zum Einstellen der Uhrzeit die Taste \"Auswahl/Uhr\" länger gedrückt halten, bis die Anzeige blinkt.",
      "Mit dem Drehrad Stunden und Minuten einstellen und jeweils mit \"Auswahl/Uhr\" bestätigen."
    ],
    hint:
      "Diese Taste ist die Kombination aus Bestätigen und Uhrzeit-Funktion – ohne sie wird eine Drehrad-Einstellung oft nicht übernommen."
  },
  {
    id: "start",
    label: "START / +30s",
    short:
      "Startet den gewählten Modus und verlängert laufende Programme um jeweils 30 Sekunden.",
    steps: [
      "Nach Wahl von Funktion, Leistung und Zeit START/+30s drücken, um zu starten.",
      "Während des Betriebs START/+30s drücken, um die Zeit um 30 Sekunden zu verlängern.",
      "Für einen schnellen Start kannst du mehrfach START/+30s drücken, um nur mit Standardleistung zu arbeiten."
    ],
    hint:
      "Wenn du unsicher bist: Essen rein, grob Zeit wählen und mit START/+30s nachsteuern."
  },
  {
    id: "stop-eco",
    label: "STOP / ECO",
    short:
      "Stoppt den Garvorgang oder schaltet das Gerät in den Energiesparmodus.",
    steps: [
      "Einmal drücken, um den aktuellen Vorgang zu unterbrechen.",
      "Nochmals drücken, um alle Einstellungen zu löschen.",
      "Bei inaktivem Gerät STOP/ECO drücken, um das Display auszuschalten (Energiesparmodus)."
    ],
    hint:
      "Deine Notbremse bei falschen Einstellungen – und gleichzeitig der Knopf zum Stromsparen."
  }
];

export default function MicrowaveHelperApp() {
  const [selectedId, setSelectedId] = useState("quick-defrost");
  const selected = functions.find((f) => f.id === selectedId) ?? functions[0];
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      // Nach dem Rendern immer ganz nach unten scrollen, damit die Funktions-Erklärung voll sichtbar ist
      window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.scrollTo({ top: maxScroll, behavior: "smooth" });
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-900/80 rounded-2xl shadow-xl border border-slate-800 overflow-hidden flex flex-col lg:flex-row">
        {/* Linke Seite: Mikrowellen-Preview */}
        <div className="lg:w-1/2 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col gap-4">
          <header className="mb-2">
            <h1 className="text-xl font-semibold text-slate-50">
              Mikrowellenhilfe
            </h1>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {/* Foto der echten Mikrowellen-Bedienoberfläche mit Hotspots */}
            <div className="relative w-full max-w-sm lg:max-w-none mx-auto rounded-2xl border border-slate-800 overflow-hidden shadow-inner bg-black">
              <img
                src="/microwave-front.jpg"
                alt="Bedienoberfläche deiner Mikrowelle"
                className="w-full h-auto block"
              />

              {/* Hotspots für die Programmtasten (4 Reihen, 2 Spalten) */}
              <div className="pointer-events-none absolute left-[18%] right-[18%] top-[26%] h-[32%] grid grid-cols-2 grid-rows-4 gap-y-[6%]">
                <button
                  aria-label="Quick Defrost"
                  onClick={() => handleSelect("quick-defrost")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Auto Cook"
                  onClick={() => handleSelect("auto-cook")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Keep Warm"
                  onClick={() => handleSelect("keep-warm")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Deodorization"
                  onClick={() => handleSelect("deodorization")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Microwave"
                  onClick={() => handleSelect("microwave")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Grill"
                  onClick={() => handleSelect("grill")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Combi"
                  onClick={() => handleSelect("combi")}
                  className="pointer-events-auto w-full h-full"
                />
                <button
                  aria-label="Grill +30s"
                  onClick={() => handleSelect("grill-30")}
                  className="pointer-events-auto w-full h-full"
                />
              </div>

              {/* Drehrad-Hotspot */}
              <button
                aria-label="Drehrad"
                onClick={() => handleSelect("dial")}
                className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-[64%] w-[32%] aspect-square rounded-full"
              />

              {/* Auswahl/Uhr-Hotspot (kleine Taste rechts vom Drehrad) */}
              <button
                aria-label="Auswahl / Uhr"
                onClick={() => handleSelect("select-clock")}
                className="pointer-events-auto absolute top-[64%] right-[20%] w-[12%] aspect-square rounded"
              />

              {/* STOP/ECO und START/+30s-Hotspots */}
              <div className="pointer-events-none absolute left-[18%] right-[18%] bottom-[10%] flex gap-[8%]">
                <button
                  aria-label="STOP / ECO"
                  onClick={() => handleSelect("stop-eco")}
                  className="pointer-events-auto flex-1 h-10"
                />
                <button
                  aria-label="START / +30s"
                  onClick={() => handleSelect("start")}
                  className="pointer-events-auto flex-1 h-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rechte Seite: Funktionsdetails */}
        <div ref={detailRef} className="lg:w-1/2 p-6 lg:p-8 flex flex-col gap-4 bg-slate-950/40">
          <div className="inline-flex items-center gap-2 text-[0.7rem] text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 self-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Funktions-Erklärung
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-50 mb-1">{selected.label}</h2>
            <p className="text-sm text-slate-300">{selected.short}</p>
          </div>

          <div className="mt-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Schritt für Schritt</h3>
            <ol className="space-y-2 text-sm text-slate-200">
              {selected.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full border border-slate-600 flex items-center justify-center text-[0.75rem] text-slate-300">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-2 p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-[0.8rem] text-slate-300">
            <span className="block font-medium text-slate-100 mb-1">Hinweis</span>
            <p>{selected.hint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
