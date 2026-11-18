/* ==========================================================================
   TIERPFOTEN DARMSTADT – Interaktionen ("Tierheim-Fanzine")
   --------------------------------------------------------------------------
   1. HUNDEDATEN       ← hier Hunde ändern, hinzufügen oder entfernen
   2. SPENDEN-WIRKUNG  ← hier die Texte des Leckerli-Kontos ändern
   3. Ab "TECHNIK" folgt der Code, der alles zum Leben erweckt.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. HUNDEDATEN (die "Hunde-Datenbank")
   Jeder Hund ist ein Block { ... }. Quartettkarte, Steckbrief, Suche, Filter,
   Sortierung und Schnüffel-Test werden automatisch daraus gebaut.

   id:         kurzer Name ohne Leerzeichen/Umlaute (z. B. "greta")
   code:       Quartett-Nummer oben links auf der Karte (z. B. "A1")
   farbe:      "pink", "gelb" oder "blau" – Druckfarbe der Karte
   sticker:    lustiger Aufkleber auf dem Foto
   bild:       Pfad zum Foto im Ordner assets/bilder
               → null = noch kein Foto, dann erscheint "FOTO FOLGT"
   fokus:      "oben", "mitte", "links" oder "rechts" – Bildausschnitt
   geschlecht: "Hündin", "Rüde" oder "Hündin & Rüde" (bei Pärchen)
   alterJahre: Alter als Zahl (z. B. 0.6 für 7 Monate) – für Sortierung & Filter
   alter:      Alter als Text für die Anzeige
   cm:         Schulterhöhe in cm (daraus wird S / M / L)
   kastriert:  true = ja, false = nein, "jung" = noch zu jung
   seit:       Ankunft im Tierheim als "JJJJ-MM-TT" (daraus: "wartet seit … Tagen")
   kategorien: "familie", "aktiv", "senior", "geduld" (für die Typ-Filter)
   quartett:   Spielwerte von 1 bis 10 (der höchste Wert wird "Trumpf ★")
   match:      Werte für Schnüffel-Test, Filter "Passt zu" und Verträglichkeits-Anzeige
     energie:   1 = gemütlich, 2 = mittel, 3 = sehr aktiv
     kinder / hunde / katzen / wohnung:  0 = eher nicht, 1 = nach Kennenlernen, 2 = super
     erfahrung: 1 = auch für Anfänger, 2 = etwas Erfahrung, 3 = viel Erfahrung nötig
   -------------------------------------------------------------------------- */
const DOGS = [
  {
    id: "balu", code: "A1", farbe: "pink", sticker: "Apportier-Profi",
    name: "Balu", geschlecht: "Rüde", alterJahre: 3, alter: "3 Jahre", rasse: "Mischling", cm: 52,
    kastriert: true, seit: "2026-05-02",
    bild: "assets/bilder/dog_balu.jpg", fokus: "mitte",
    kategorien: ["familie", "aktiv"],
    tags: ["Kinderlieb", "Verspielt", "Apportier-Profi"],
    teaser: "Freundlicher Wirbelwind, der Menschen liebt und gern noch das Hunde-Einmaleins lernt.",
    charakter: "Aufgeschlossen, neugierig, sehr menschenbezogen und verspielt.",
    geschichte: "Balu kam als Abgabehund zu uns, weil seine Vorbesitzer umgezogen sind. Er kann die Grundkommandos (Sitz, Platz, Pfote) und liebt Apportierspiele im Garten.",
    vertraeglichkeit: "Mit Hündinnen nach Sympathie verträglich. Bei Katzen entscheidet der erste Eindruck. Ideal für Familien mit Kindern ab 6 Jahren.",
    gesundheit: "Vollständig geimpft, gechippt, entwurmt und tierärztlich durchgecheckt.",
    quartett: { kuscheln: 8, sofa: 6, ball: 10, gassi: 7 },
    match: { energie: 2, kinder: 2, hunde: 1, katzen: 1, erfahrung: 1, wohnung: 1 }
  },
  {
    id: "luna", code: "A2", farbe: "gelb", sticker: "Wasserratte",
    name: "Luna", geschlecht: "Hündin", alterJahre: 1.5, alter: "1,5 Jahre", rasse: "Labrador-Mix", cm: 48,
    kastriert: true, seit: "2026-07-19",
    bild: "assets/bilder/dog_luna.jpg", fokus: "oben",
    kategorien: ["aktiv"],
    tags: ["Sportlich", "Wasserfan", "Lernt schnell"],
    teaser: "Sportlich und lernbegierig. Sucht aktive Menschen mit Lust auf lange Touren oder Agility.",
    charakter: "Sportlich, intelligent, lebhaft und extrem lernfreudig.",
    geschichte: "Luna hat viel Energie und möchte auch im Kopf gefordert werden. Suchspiele und Wasser liebt sie über alles.",
    vertraeglichkeit: "Super verträglich mit Artgenossen. Sucht sportliche Menschen mit Lust auf Hundesport oder Wanderungen.",
    gesundheit: "Geimpft, gechippt, kastriert, kerngesund.",
    quartett: { kuscheln: 6, sofa: 3, ball: 8, gassi: 10 },
    match: { energie: 3, kinder: 1, hunde: 2, katzen: 1, erfahrung: 2, wohnung: 1 }
  },
  {
    id: "rocky", code: "A3", farbe: "blau", sticker: "Bodyguard",
    name: "Rocky", geschlecht: "Rüde", alterJahre: 5, alter: "5 Jahre", rasse: "Schäferhund-Mix", cm: 60,
    kastriert: false, seit: "2026-01-10",
    bild: "assets/bilder/dog_rocky.jpg", fokus: "mitte",
    kategorien: ["aktiv"],
    tags: ["Treu", "Wachsam", "Leinenführig"],
    teaser: "Souveräner, treuer Begleiter. Sucht ein hundeerfahrenes Zuhause mit klarer, liebevoller Struktur.",
    charakter: "Treu, aufmerksam, loyal und eng an seine Bezugsperson gebunden.",
    geschichte: "Rocky braucht eine souveräne Führung mit klarer Struktur. Wer einmal sein Vertrauen hat, für den geht er durchs Feuer.",
    vertraeglichkeit: "Am besten als Einzelhund in einem ruhigen Haushalt ohne Kleinkinder, bei hundeerfahrenen Menschen.",
    gesundheit: "Geimpft, gechippt, bekommt regelmäßig Gelenkprophylaxe.",
    quartett: { kuscheln: 5, sofa: 4, ball: 5, gassi: 8 },
    match: { energie: 2, kinder: 0, hunde: 0, katzen: 1, erfahrung: 3, wohnung: 1 }
  },
  {
    id: "mila", code: "A4", farbe: "pink", sticker: "Sofa-tauglich",
    name: "Mila", geschlecht: "Hündin", alterJahre: 4, alter: "4 Jahre", rasse: "Kleiner Mischling", cm: 34,
    kastriert: false, seit: "2026-04-22",
    bild: "assets/bilder/dog_mila.jpg", fokus: "oben",
    kategorien: ["familie"],
    tags: ["Ruhig", "Schmusehund", "Katzenfreundlich"],
    teaser: "Sensible Kuschelexpertin. Perfekt für einen ruhigeren Haushalt oder eine gemütliche Wohnung.",
    charakter: "Sanft, verschmust, sensibel und bescheiden.",
    geschichte: "Mila brauchte anfangs etwas Zeit. Inzwischen genießt sie jede Kuscheleinheit auf dem Sofa.",
    vertraeglichkeit: "Sehr verträglich mit anderen kleinen Hunden und Katzen. Perfekt für ein ruhigeres Zuhause oder eine Stadtwohnung mit Aufzug.",
    gesundheit: "Geimpft, gechippt, entwurmt.",
    quartett: { kuscheln: 10, sofa: 10, ball: 2, gassi: 3 },
    match: { energie: 1, kinder: 1, hunde: 2, katzen: 2, erfahrung: 1, wohnung: 2 }
  },
  {
    id: "barney", code: "B1", farbe: "gelb", sticker: "Opa-Charme",
    name: "Barney", geschlecht: "Rüde", alterJahre: 9, alter: "9 Jahre", rasse: "Retriever-Mix", cm: 56,
    kastriert: true, seit: "2026-03-03",
    bild: "assets/bilder/dog_barney.jpg", fokus: "mitte",
    kategorien: ["senior", "familie"],
    tags: ["Tiefenentspannt", "Verträglich", "Kinderlieb"],
    teaser: "Tiefenentspannter Traumhund für Senior:innen oder Familien, die gemütliche Waldrunden lieben.",
    charakter: "Tiefenentspannt, friedliebend, kinderlieb und voller Lebensfreude.",
    geschichte: "Unser Senior-Liebling! Barney will keine Marathons mehr laufen, aber gemütliche Schnüffelrunden im Darmstädter Stadtwald liebt er über alles.",
    vertraeglichkeit: "Freundlich zu allen Menschen, Hunden und Katzen. Ein Traum für Senior:innen oder gemütliche Familien.",
    gesundheit: "Altersgerechter Check-up ohne Befund, geimpft und gechippt.",
    quartett: { kuscheln: 9, sofa: 9, ball: 3, gassi: 4 },
    match: { energie: 1, kinder: 2, hunde: 2, katzen: 2, erfahrung: 1, wohnung: 1 }
  },
  {
    id: "bella", code: "B2", farbe: "blau", sticker: "Turbo-Eleganz",
    name: "Bella", geschlecht: "Hündin", alterJahre: 2, alter: "2 Jahre", rasse: "Windhund-Mix", cm: 50,
    kastriert: true, seit: "2026-09-05",
    bild: "assets/bilder/dog_bella.jpg", fokus: "mitte",
    kategorien: ["familie", "aktiv"],
    tags: ["Sehr sozial", "Feinfühlig", "Ideal als Zweithund"],
    teaser: "Sanftmütig, elegant und sozial. Versteht sich bestens mit Artgenossen, ideal als Zweithund.",
    charakter: "Feinfühlig, anschmiegsam, sozial und elegant.",
    geschichte: "Bella stammt aus einem befreundeten Tierschutzprojekt und blüht in Darmstadt richtig auf. Sie liebt es, im gesicherten Auslauf ihre Runden zu drehen.",
    vertraeglichkeit: "Sehr sozial im Rudel und ideal als Zweithund.",
    gesundheit: "Geimpft, gechippt, kastriert.",
    quartett: { kuscheln: 8, sofa: 7, ball: 4, gassi: 7 },
    match: { energie: 2, kinder: 1, hunde: 2, katzen: 1, erfahrung: 1, wohnung: 1 }
  },
  {
    id: "kruemel", code: "B3", farbe: "blau", sticker: "Charme-Bolzen",
    name: "Krümel", geschlecht: "Rüde", alterJahre: 6, alter: "6 Jahre", rasse: "Terrier-Mischling", cm: 45,
    kastriert: true, seit: "2026-02-03",
    bild: "assets/bilder/hero_dog_darmstadt.png", fokus: "mitte",
    kategorien: ["familie"],
    tags: ["Charmeur", "Stadttauglich", "Läuft gern mit"],
    teaser: "Zotteliger Charmeur mit Wuschelbart, der dir auf Schritt und Tritt folgt und jeden Park zum Laufsteg macht.",
    charakter: "Verschmitzt, neugierig, verschmust und ein echter Menschenfreund.",
    geschichte: "Krümel wurde als Fundhund im Darmstädter Bürgerpark entdeckt, vermisst hat ihn niemand. Heute ist er unser inoffizielles Maskottchen und posiert für jedes Foto.",
    vertraeglichkeit: "Super mit Kindern und anderen Hunden. Katzen findet er spannend, da hilft ein ruhiges Kennenlernen. Kommt prima in einer Wohnung klar.",
    gesundheit: "Geimpft, gechippt, kastriert, Zähne frisch saniert.",
    quartett: { kuscheln: 8, sofa: 7, ball: 6, gassi: 7 },
    match: { energie: 2, kinder: 2, hunde: 2, katzen: 1, erfahrung: 1, wohnung: 2 }
  },
  {
    id: "nala", code: "B4", farbe: "pink", sticker: "Wander-Queen",
    name: "Nala", geschlecht: "Hündin", alterJahre: 4, alter: "4 Jahre", rasse: "Schäferhund-Mix", cm: 55,
    kastriert: true, seit: "2025-11-20",
    bild: "assets/bilder/gassigehen_ehrenamt.png", fokus: "rechts",
    kategorien: ["aktiv"],
    tags: ["Ausdauernd", "Will Aufgaben", "Wanderhund"],
    teaser: "Ausdauernde Wanderfreundin, die mit dir jeden Waldweg bis zum Felsenmeer laufen würde, am liebsten zweimal.",
    charakter: "Sportlich, aufmerksam, arbeitsfreudig und manchmal etwas stürmisch.",
    geschichte: "Nala ist der Liebling unserer Gassigeher:innen. Sie braucht Bewegung und Kopfarbeit und lernt gerade, an der Leine nicht mehr wie ein Schlittenhund zu ziehen.",
    vertraeglichkeit: "Gut mit anderen Hunden. Für Kinder ab ca. 10 Jahren nach Kennenlernen. Katzen jagt sie leider gern.",
    gesundheit: "Geimpft, gechippt, kastriert, topfit.",
    quartett: { kuscheln: 6, sofa: 3, ball: 7, gassi: 10 },
    match: { energie: 3, kinder: 1, hunde: 2, katzen: 0, erfahrung: 2, wohnung: 1 }
  },
  {
    id: "buster", code: "C1", farbe: "gelb", sticker: "Pfötchen-Geber",
    name: "Buster", geschlecht: "Rüde", alterJahre: 10, alter: "10 Jahre", rasse: "Terrier-Mix", cm: 42,
    kastriert: true, seit: "2026-06-10",
    bild: "assets/bilder/spenden_care.png", fokus: "links",
    kategorien: ["senior", "familie"],
    tags: ["Gibt Pfötchen", "Liebt Bürsten", "Gemütlich"],
    teaser: "Alter Gentleman mit Schlappohr, der zur Begrüßung Pfötchen gibt und sich für jede Bürsteneinheit bedankt.",
    charakter: "Sanft, höflich, dankbar und ein bisschen eitel.",
    geschichte: "Buster kam zu uns, als sein Herrchen ins Pflegeheim musste. Er hat sein Namensschild noch am Halsband und wartet auf ein ruhiges Zuhause für seinen Lebensabend.",
    vertraeglichkeit: "Lieb zu Kindern und Katzen. Mit anderen Hunden nach Sympathie. Ideal für eine ruhige Wohnung.",
    gesundheit: "Geimpft, gechippt, kastriert. Leichte Arthrose, gut eingestellt.",
    quartett: { kuscheln: 9, sofa: 8, ball: 4, gassi: 5 },
    match: { energie: 1, kinder: 2, hunde: 1, katzen: 2, erfahrung: 1, wohnung: 2 }
  },
  {
    id: "lotte-ole", code: "C2", farbe: "pink", sticker: "Doppelpack", paar: true,
    name: "Lotte & Ole", geschlecht: "Hündin & Rüde", alterJahre: 3, alter: "beide 3 Jahre", rasse: "Dackel-Mix", cm: 30,
    kastriert: true, seit: "2026-08-01",
    bild: null, // FOTO FOLGT: hier später z. B. "assets/bilder/dog_lotte_ole.jpg" eintragen
    fokus: "mitte",
    kategorien: ["familie"],
    tags: ["Nur zu zweit", "Unzertrennlich", "Kleine Nasen"],
    teaser: "Zwei Dackel-Geschwister, ein Herz: Lotte und Ole ziehen nur gemeinsam um und sind doppelt so lustig.",
    charakter: "Neugierig, verspielt, verfressen und völlig unzertrennlich.",
    geschichte: "Lotte und Ole sind Geschwister und wurden gemeinsam abgegeben. Getrennt werden sie unruhig, zusammen sind sie das fröhlichste Duo im ganzen Tierheim.",
    vertraeglichkeit: "Super mit Kindern und anderen Hunden. Katzen nach Kennenlernen. Klein genug für jede Wohnung.",
    gesundheit: "Beide geimpft, gechippt und kastriert.",
    quartett: { kuscheln: 9, sofa: 9, ball: 5, gassi: 6 },
    match: { energie: 2, kinder: 2, hunde: 2, katzen: 1, erfahrung: 1, wohnung: 2 }
  },
  {
    id: "fiete", code: "C3", farbe: "gelb", sticker: "Schuh-Gourmet",
    name: "Fiete", geschlecht: "Rüde", alterJahre: 0.6, alter: "7 Monate", rasse: "Border-Collie-Mix", cm: 40,
    kastriert: "jung", seit: "2026-10-12",
    bild: null, // FOTO FOLGT: hier später z. B. "assets/bilder/dog_fiete.jpg" eintragen
    fokus: "mitte",
    kategorien: ["aktiv"],
    tags: ["Junghund", "Lernt in Sekunden", "Kaut alles"],
    teaser: "Junger Wirbelwind mit Superhirn. Lernt jeden Trick in Sekunden und testet auch gern, wie Schuhe schmecken.",
    charakter: "Clever, verspielt, voller Energie und noch etwas tollpatschig.",
    geschichte: "Fiete ist noch ein halbes Baby und wächst noch. Er braucht Menschen, die mit ihm in die Hundeschule gehen und ihm geduldig beibringen, dass Sofakissen kein Spielzeug sind.",
    vertraeglichkeit: "Liebt andere Hunde. Für Kinder geeignet, wenn sie seinen Übermut verkraften. Katzen nach Kennenlernen.",
    gesundheit: "Grundimmunisiert, gechippt, entwurmt. Für die Kastration noch zu jung.",
    quartett: { kuscheln: 7, sofa: 2, ball: 10, gassi: 9 },
    match: { energie: 3, kinder: 1, hunde: 2, katzen: 1, erfahrung: 2, wohnung: 1 }
  },
  {
    id: "greta", code: "C4", farbe: "blau", sticker: "Braucht Geduld",
    name: "Greta", geschlecht: "Hündin", alterJahre: 5, alter: "5 Jahre", rasse: "Hirtenhund-Mix", cm: 62,
    kastriert: true, seit: "2025-12-15",
    bild: null, // FOTO FOLGT: hier später z. B. "assets/bilder/dog_greta.jpg" eintragen
    fokus: "mitte",
    kategorien: ["geduld"],
    tags: ["Schüchtern", "Taut langsam auf", "Sanfter Riese"],
    teaser: "Sanfte Riesin mit großer Angst vor der Welt. Wer ihr Zeit gibt, gewinnt eine Freundin fürs Leben.",
    charakter: "Ängstlich, vorsichtig, sehr sensibel und, wenn sie Vertrauen gefasst hat, unglaublich anhänglich.",
    geschichte: "Greta hat in ihrem früheren Leben wenig Gutes erlebt. Bei uns hat sie gelernt, dass Menschen Leckerlis bringen. Jetzt sucht sie ein ruhiges Haus mit Garten und viel Geduld.",
    vertraeglichkeit: "Orientiert sich gern an souveränen Hunden. Keine Kinder, kein Trubel. Katzen nach Kennenlernen. Kein Stadtleben, lieber ruhige Randlage.",
    gesundheit: "Geimpft, gechippt, kastriert, gesund.",
    quartett: { kuscheln: 4, sofa: 5, ball: 1, gassi: 6 },
    match: { energie: 1, kinder: 0, hunde: 2, katzen: 1, erfahrung: 3, wohnung: 0 }
  }
];

// Namen der Quartett-Werte (Reihenfolge = Reihenfolge auf der Karte)
const QUARTETT_LABELS = {
  kuscheln: "Kuschelfaktor",
  sofa: "Sofa-Anspruch",
  ball: "Ball-Besessenheit",
  gassi: "Gassi-Ausdauer"
};

/* --------------------------------------------------------------------------
   2. SPENDEN-WIRKUNG (Leckerli-Konto)
   -------------------------------------------------------------------------- */
const IMPACT_LEVELS = [
  { ab: 15,  text: "Sichert eine Woche hochwertiges Spezialfutter, Kauartikel und Pflegeutensilien für einen geschwächten Hund." },
  { ab: 35,  text: "Ermöglicht einen tierärztlichen Eingangs-Check, Entwurmung und Flohprophylaxe für einen neu aufgenommenen Schützling." },
  { ab: 75,  text: "Finanziert die komplette Grundimmunisierung, den EU-Heimtierausweis und die Chip-Registrierung." },
  { ab: 150, text: "Ermöglicht eine dringend benötigte Kastration oder eine medizinische Notfall-Untersuchung." }
];
const FUTTER_PRO_WOCHE = 15; // 15 € = 1 Woche Spezialfutter

/* --------------------------------------------------------------------------
   3. KI- UND WETTER-ADRESSEN (n8n)
   Alle "Mittelsmänner" wohnen seit 18.11.2026 als Workflows in n8n.
   Die geheimen Schlüssel (OpenAI, OpenWeatherMap) liegen NUR dort,
   nie in diesen Dateien. Deshalb darf die Website öffentlich online stehen.
   -------------------------------------------------------------------------- */
const N8N_ADRESSE = "https://ki-automatisierung.startplatz-ai-hub.de/webhook/";
const KI_ADRESSEN = {
  wuffi:      N8N_ADRESSE + "tierpfoten-wuffi",       // Workflow "Tierpfoten: Frag Wuffi (Website-Chat)"
  rasse:      N8N_ADRESSE + "tierpfoten-rasse",       // Workflow "Tierpfoten: KI-Rasseberater (Website)"
  hundeblick: N8N_ADRESSE + "tierpfoten-hundeblick",  // Workflow "Tierpfoten: Hundeblick (Website)"
  wetter:     N8N_ADRESSE + "tierpfoten-wetter"       // Workflow "Tierpfoten: Gassi-Wetter (Website)"
};


/* ==========================================================================
   TECHNIK – ab hier muss normalerweise nichts geändert werden
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const scrollBehavior = reduceMotion ? "auto" : "smooth";
  const dogById = (id) => DOGS.find((d) => d.id === id);
  const TONE = { pink: "pink", gelb: "yellow", blau: "blue" };

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  };

  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const restart = (el, cls) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  /* ======================================================================
     ABGELEITETE DATEN (werden automatisch aus den Hundedaten berechnet)
     ====================================================================== */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  DOGS.forEach((d) => {
    const arrived = new Date(d.seit + "T00:00:00");
    d.tage = Math.max(0, Math.round((today - arrived) / 864e5));
    d.seitText = arrived.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
    d.klasse = d.cm < 40 ? "S" : d.cm < 55 ? "M" : "L";
    d.altersgruppe = d.alterJahre < 2 ? "jung" : d.alterJahre < 8 ? "adult" : "senior";
    d.anfaenger = [2, 1, 0][d.match.erfahrung - 1];
    d.kastriertText = d.kastriert === "jung" ? "noch zu jung" : d.kastriert ? "ja" : "nein";
  });
  const longestWaiter = DOGS.reduce((a, b) => (b.tage > a.tage ? b : a));
  DOGS.forEach((d) => {
    d.status = d.tage <= 30 ? "Neu bei uns"
      : d === longestWaiter ? "Wartet am längsten"
      : d.paar ? "Nur zu zweit"
      : d.altersgruppe === "senior" ? "Senior-Liebling"
      : "Sucht Zuhause";
  });
  const tageText = (n) => (n === 1 ? "1 Tag" : `${n} Tagen`);
  const sexSymbol = (d) => (d.paar ? "♀♂" : d.geschlecht === "Rüde" ? "♂" : "♀");
  const LEVEL_TEXT = ["eher nicht", "nach Kennenlernen", "ja"];
  const COMPAT = [
    ["kinder", "Kinder", (d) => d.match.kinder],
    ["katzen", "Katzen", (d) => d.match.katzen],
    ["hunde", "Hunde", (d) => d.match.hunde],
    ["wohnung", "Wohnung", (d) => d.match.wohnung],
    ["anfaenger", "Anfänger", (d) => d.anfaenger]
  ];

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(html) {
    if (!toastEl) return;
    toastEl.innerHTML = html;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }

  /* ======================================================================
     EFFEKTE: Knochen-Konfetti, Pfotenspur, Pfotenregen
     ====================================================================== */
  const fx = $("#fxLayer");
  const BONE_COLORS = ["#FF4FA3", "#FFE14D", "#2B3BD1", "#FBF6EA"];
  const boneSVG = (c) => `<svg viewBox="0 0 48 24"><path d="M9 3.5a5 5 0 0 1 4.6 3h20.8a5 5 0 1 1 4.6 7 5 5 0 1 1-4.6 7H13.6a5 5 0 1 1-4.6-7 5 5 0 1 1 0-10z" fill="${c}" stroke="#1E1B2E" stroke-width="2.5"/></svg>`;

  function boneConfetti(x, y, count = 26) {
    if (!fx || reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const b = document.createElement("span");
      b.className = "fx-bone";
      b.innerHTML = boneSVG(BONE_COLORS[i % BONE_COLORS.length]);
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 260;
      b.style.setProperty("--x0", `${x - 17}px`);
      b.style.setProperty("--y0", `${y - 8}px`);
      b.style.setProperty("--x1", `${x - 17 + Math.cos(angle) * dist}px`);
      b.style.setProperty("--y1", `${y - 8 + Math.sin(angle) * dist + 160}px`);
      b.style.setProperty("--r", `${(Math.random() - .5) * 900}deg`);
      fx.appendChild(b);
      setTimeout(() => b.remove(), 1500);
    }
  }

  function pawRain() {
    if (!fx) return;
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("span");
      p.className = "fx-rain";
      p.innerHTML = `<svg viewBox="0 0 24 24" fill="${BONE_COLORS[i % 3]}"><use href="#i-paw"/></svg>`;
      p.style.setProperty("--x0", `${Math.random() * window.innerWidth}px`);
      p.style.setProperty("--r", `${(Math.random() - .5) * 720}deg`);
      p.style.animationDelay = `${Math.random() * 1.2}s`;
      fx.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }

  // Pfotenspur hinter dem Mauszeiger (nur im Kopfbereich und in der Fußzeile)
  if (fx && finePointer && !reduceMotion) {
    let last = { x: -999, y: -999 }, step = 0;
    $$(".hero, .site-footer").forEach((zone) => zone.addEventListener("pointermove", (e) => {
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      if (dx * dx + dy * dy < 70 * 70) return;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
      last = { x: e.clientX, y: e.clientY };
      step++;
      const side = step % 2 ? -9 : 9;
      const p = document.createElement("span");
      p.className = "fx-paw";
      p.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><use href="#i-paw"/></svg>`;
      p.style.transform = `translate(${e.clientX - 13 + side}px, ${e.clientY - 13}px) rotate(${angle}deg)`;
      fx.appendChild(p);
      setTimeout(() => p.remove(), 1100);
    }));
  }

  /* ---------- Easter Egg: "wuff" tippen oder 5× aufs Logo klicken ---------- */
  function easterEgg() {
    toast(`${icon("paw", "icon--fill")} Wuff! Du hast das Geheimnis gefunden`);
    if (reduceMotion) return;
    pawRain();
    document.body.classList.add("party");
    setTimeout(() => document.body.classList.remove("party"), 3600);
  }
  let typed = "";
  document.addEventListener("keydown", (e) => {
    if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
    if (!e.key || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === "wuff") { typed = ""; easterEgg(); }
  });
  let logoClicks = [];
  $("#logo")?.addEventListener("click", () => {
    const now = Date.now();
    logoClicks = logoClicks.filter((t) => now - t < 2000).concat(now);
    if (logoClicks.length >= 5) { logoClicks = []; easterEgg(); }
  });

  /* ======================================================================
     FARBMODUS
     ====================================================================== */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  function syncTheme() {
    const dark = currentTheme() === "dark";
    root.setAttribute("data-theme", dark ? "dark" : "light");
    themeBtn?.setAttribute("aria-label", dark ? "Hellen Modus einschalten" : "Dunklen Modus einschalten");
    $('meta[name="theme-color"]')?.setAttribute("content", dark ? "#17141F" : "#EFE6D2");
  }
  syncTheme();
  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("tierpfoten-theme", next); } catch (e) {}
    syncTheme();
  });

  /* ======================================================================
     LIVE-ÖFFNUNGSSTATUS + "Heute" im Stundenplan
     ====================================================================== */
  const statusEl = $("#liveStatus");
  function updateOpeningStatus() {
    if (!statusEl) return;
    const now = new Date();
    const day = now.getDay();
    const t = now.getHours() + now.getMinutes() / 60;
    let text, state = "";
    if (day >= 3 && day <= 6) {
      if (t >= 14 && t < 17.5) { text = "Jetzt geöffnet · bis 17:30"; state = "is-open"; }
      else if (t < 14) text = "Heute ab 14:00 geöffnet";
      else text = day === 6 ? "Geschlossen · So 11–14 mit Termin" : "Geschlossen · morgen ab 14:00";
    } else if (day === 0) {
      if (t >= 11 && t < 14) { text = "Heute 11–14 · nur mit Termin"; state = "is-appointment"; }
      else text = "Geschlossen · Mi ab 14:00";
    } else {
      text = "Ruhetag · Mi ab 14:00";
    }
    statusEl.className = "status-pill " + state;
    $(".status-pill__text", statusEl).textContent = text;
    $$("#hoursList [data-day]").forEach((li) => li.classList.toggle("is-today", Number(li.dataset.day) === day));
  }
  updateOpeningStatus();
  setInterval(updateOpeningStatus, 60 * 1000);

  /* ======================================================================
     KOPFZEILE, MENÜ, HANDY-LEISTE
     ====================================================================== */
  const nav = $("#mainNav");
  const menuBtn = $("#menuToggle");
  const dock = $("#dock");
  const toTop = $("#toTop");
  const hero = $(".hero");

  function onScroll() {
    const y = window.scrollY;
    toTop?.classList.toggle("is-visible", y > 700);
    if (dock && hero) {
      const pastHero = y > hero.offsetHeight * 0.6;
      const nearEnd = window.innerHeight + y > document.body.scrollHeight - 160;
      dock.classList.toggle("is-visible", pastHero && !nearEnd);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav?.classList.toggle("is-open", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
    menuBtn?.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }
  menuBtn?.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("#mainNav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) { setMenu(false); menuBtn?.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (nav?.classList.contains("is-open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: scrollBehavior }));

  const navLinks = $$("#mainNav a");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach((a) => { const s = $(a.getAttribute("href")); if (s) so.observe(s); });
  }

  /* ======================================================================
     BAUSTEINE: Foto bzw. "Foto folgt"-Platzhalter, Werte, Verträglichkeit
     ====================================================================== */
  const heartButton = (dog) =>
    `<button type="button" class="heart-btn" data-fav="${dog.id}" aria-pressed="false" aria-label="${dog.name} auf die Merkliste setzen">${icon("heart")}</button>`;

  function placeholder(dog, size = "") {
    return `<div class="ph ${size}" role="img" aria-label="Noch kein Foto von ${dog.name}">
      <span class="ph__q" aria-hidden="true">?</span>
      <svg class="ph__paws" aria-hidden="true" viewBox="0 0 120 120"><use href="#i-paw" x="8" y="70" width="22" height="22"/><use href="#i-paw" x="40" y="48" width="22" height="22"/><use href="#i-paw" x="70" y="62" width="22" height="22"/><use href="#i-paw" x="92" y="30" width="22" height="22"/></svg>
      <span class="ph__stamp" aria-hidden="true">Foto folgt<small>hält nicht still</small></span>
    </div>`;
  }

  function photo(dog, { color = false, lazy = true, alt = true } = {}) {
    if (!dog.bild) return placeholder(dog);
    const a = alt ? `${dog.name}, ${dog.rasse}` : "";
    const l = lazy ? ' loading="lazy"' : "";
    let html = `<img src="${dog.bild}" alt="${a}"${l} class="img-${dog.fokus}">`;
    if (color) html += `<img src="${dog.bild}" alt=""${l} class="img-color img-${dog.fokus}">`;
    return html;
  }

  function statsHTML(dog) {
    const vals = dog.quartett;
    const max = Math.max(...Object.values(vals));
    return `<div class="stats-table" role="list" aria-label="Quartett-Werte von ${dog.name}">` +
      Object.entries(QUARTETT_LABELS).map(([key, label]) => {
        const v = vals[key];
        const bars = Array.from({ length: 10 }, (_, i) => `<i${i < v ? ' class="on"' : ""}></i>`).join("");
        return `<div class="stat${v === max ? " is-trumpf" : ""}" role="listitem">
          <span class="stat__label">${label}</span>
          <span class="stat__bar" aria-hidden="true">${bars}</span>
          <span class="stat__val"><span class="sr-only">${label}: </span>${v}<span class="sr-only"> von 10</span></span>
        </div>`;
      }).join("") + `</div>`;
  }

  function compatHTML(dog) {
    return `<ul class="compat" aria-label="Verträglichkeit von ${dog.name}">` +
      COMPAT.map(([, label, get]) => {
        const lvl = get(dog);
        return `<li class="compat__item lvl-${lvl}"><span aria-hidden="true" class="compat__mark">${["✗", "~", "✓"][lvl]}</span>${label}<span class="sr-only">: ${LEVEL_TEXT[lvl]}</span></li>`;
      }).join("") + `</ul>`;
  }

  /* ======================================================================
     QUARTETTKARTEN
     ====================================================================== */
  const grid = $("#dogGrid");
  const favEmpty = $("#favEmpty");
  const filterStatus = $("#filterStatus");

  function cardHTML(dog) {
    const tone = TONE[dog.farbe] || "pink";
    return `
      <article class="qcard qcard--${tone}" data-id="${dog.id}">
        <div class="qcard__top">
          <span class="qcard__code">${dog.code}</span>
          <span class="qcard__wait">Wartet seit<br><strong>${tageText(dog.tage)}</strong></span>
          ${heartButton(dog)}
        </div>
        <div class="qcard__media riso riso--${tone}">
          ${photo(dog, { color: true })}
          <span class="sticker qcard__status">${dog.status}</span>
          <span class="sticker qcard__sticker">${dog.sticker}</span>
          <span class="fav-stamp" aria-hidden="true">Gemerkt ♥</span>
        </div>
        <div class="qcard__body">
          <div class="qcard__name">
            <h3>${dog.name}</h3>
            <span class="qcard__sex">${dog.geschlecht} ${sexSymbol(dog)}</span>
          </div>
          <p class="qcard__meta">${dog.rasse} · ${dog.alter} · ${dog.cm} cm <span class="size-badge" title="Größenklasse">${dog.klasse}</span></p>
          <p class="qcard__teaser">${dog.teaser}</p>
          ${compatHTML(dog)}
          ${statsHTML(dog)}
          <button type="button" class="qcard__more" data-open-dog="${dog.id}" aria-haspopup="dialog">
            Steckbrief von ${dog.name} ${icon("arrow")}
          </button>
        </div>
      </article>`;
  }

  if (grid) grid.innerHTML = DOGS.map(cardHTML).join("");
  const cards = new Map($$(".qcard", grid).map((c) => [c.dataset.id, c]));
  $$("[data-dog-count]").forEach((el) => (el.textContent = DOGS.length));
  ["all", "familie", "aktiv", "senior", "geduld"].forEach((f) => {
    const el = $(`[data-filter-count="${f}"]`);
    if (el) el.textContent = f === "all" ? DOGS.length : DOGS.filter((d) => d.kategorien.includes(f)).length;
  });

  /* ======================================================================
     MERKLISTE (Herz + Stempel)
     ====================================================================== */
  let favs = new Set(store.get("tierpfoten-favs", []).filter((id) => dogById(id)));

  function updateFavUI() {
    const n = favs.size;
    $$("[data-fav-count]").forEach((el) => { el.textContent = n; restart(el, "bump"); });
    $$("[data-show-favs]").forEach((btn) => {
      btn.classList.toggle("has-favs", n > 0);
      btn.setAttribute("aria-label", `Merkliste anzeigen (${n} ${n === 1 ? "Hund" : "Hunde"} gemerkt)`);
    });
    const c = $('[data-filter-count="favs"]');
    if (c) c.textContent = n;
    $$(".heart-btn[data-fav]").forEach((btn) => {
      const on = favs.has(btn.dataset.fav);
      const dog = dogById(btn.dataset.fav);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? `${dog.name} von der Merkliste entfernen` : `${dog.name} auf die Merkliste setzen`);
    });
    $$("[data-id]").forEach((card) => card.classList.toggle("is-fav", favs.has(card.dataset.id)));
  }

  function toggleFav(id, btn) {
    const dog = dogById(id);
    if (!dog) return;
    if (favs.has(id)) {
      favs.delete(id);
      toast(`${icon("heart")} ${dog.name} von der Merkliste entfernt`);
    } else {
      favs.add(id);
      toast(`${icon("heart")} ${dog.name} ${dog.paar ? "sind" : "ist"} gestempelt & gemerkt!`);
      restart(btn, "pop");
      $$(`[data-id="${id}"]`).forEach((card) => { restart(card, "stamped"); if (!reduceMotion) restart(card, "shake"); });
    }
    store.set("tierpfoten-favs", Array.from(favs));
    updateFavUI();
    if (state.cat === "favs") applyFilters(false);
  }

  /* ======================================================================
     HUNDE-DATENBANK: Suche, Typ-Filter, weitere Filter, Sortierung
     ====================================================================== */
  const state = { cat: "all", size: null, age: null, sex: null, flags: new Set(), q: "", sort: "wartet" };
  const searchInput = $("#dogSearch");
  const sortSelect = $("#dogSort");
  const moreFilters = $("#moreFilters");
  const filterToggle = $("#filterToggle");
  const activeCount = $("#filterActiveCount");
  const dbCount = $("#dbCount");
  const resetAllBtn = $("#filterResetAll");

  const SORTERS = {
    wartet: (a, b) => b.tage - a.tage,
    neu: (a, b) => a.tage - b.tage,
    jung: (a, b) => a.alterJahre - b.alterJahre,
    alt: (a, b) => b.alterJahre - a.alterJahre,
    name: (a, b) => a.name.localeCompare(b.name, "de"),
    kuscheln: (a, b) => b.quartett.kuscheln - a.quartett.kuscheln
  };
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function matches(dog) {
    if (state.cat === "favs" && !favs.has(dog.id)) return false;
    if (state.cat !== "all" && state.cat !== "favs" && !dog.kategorien.includes(state.cat)) return false;
    if (state.size && dog.klasse !== state.size) return false;
    if (state.age && dog.altersgruppe !== state.age) return false;
    if (state.sex && !dog.geschlecht.includes(state.sex)) return false;
    for (const f of state.flags) {
      const lvl = f === "anfaenger" ? dog.anfaenger : dog.match[f];
      if (lvl !== 2) return false;
    }
    if (state.q) {
      const hay = norm([dog.name, dog.rasse, dog.sticker, dog.charakter, ...dog.tags].join(" "));
      if (!norm(state.q).split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  }

  function extraFilterCount() {
    return (state.size ? 1 : 0) + (state.age ? 1 : 0) + (state.sex ? 1 : 0) + state.flags.size;
  }

  function applyFilters(animate = true) {
    // Typ-Chips
    $$("[data-filter]").forEach((b) => {
      const on = b.dataset.filter === state.cat;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    // weitere Filter-Chips
    $$("[data-fgroup]").forEach((b) => {
      const g = b.dataset.fgroup, v = b.dataset.fvalue;
      const on = g === "flag" ? state.flags.has(v) : state[g] === v;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const extra = extraFilterCount();
    if (activeCount) activeCount.textContent = extra || "";

    // sortieren + filtern
    const sorted = DOGS.slice().sort(SORTERS[state.sort] || SORTERS.wartet);
    let shown = 0;
    sorted.forEach((dog) => {
      const card = cards.get(dog.id);
      grid.appendChild(card);
      const ok = matches(dog);
      card.hidden = !ok;
      card.classList.remove("is-entering");
      if (ok) {
        if (animate && !reduceMotion) { card.style.setProperty("--delay", `${Math.min(shown, 8) * 55}ms`); restart(card, "is-entering"); }
        shown++;
      }
    });

    const anyFilter = state.cat !== "all" || extra > 0 || state.q;
    if (resetAllBtn) resetAllBtn.hidden = !anyFilter;
    if (dbCount) dbCount.textContent = `${shown} von ${DOGS.length} Fellnasen`;
    if (filterStatus) filterStatus.textContent = "";

    if (favEmpty) {
      favEmpty.hidden = shown > 0;
      const onlyFavs = state.cat === "favs" && favs.size === 0;
      $("#emptyTitle").textContent = onlyFavs ? "Noch kein Hund gemerkt" : "Keine Fellnase passt zu allen Filtern";
      $("#emptyText").textContent = onlyFavs
        ? "Drück bei einer Karte aufs Herz, dann bekommt der Hund einen Stempel und landet hier."
        : "Lass einen Filter weg oder such nach etwas anderem. Und frag uns ruhig: Manchmal passt ein Hund besser, als die Daten verraten.";
    }
  }

  function resetAll() {
    state.cat = "all"; state.size = null; state.age = null; state.sex = null; state.flags.clear(); state.q = "";
    if (searchInput) searchInput.value = "";
    applyFilters();
  }

  $$("[data-filter]").forEach((btn) => btn.addEventListener("click", () => { state.cat = btn.dataset.filter; applyFilters(); }));
  $$("[data-fgroup]").forEach((btn) => btn.addEventListener("click", () => {
    const g = btn.dataset.fgroup, v = btn.dataset.fvalue;
    if (g === "flag") { state.flags.has(v) ? state.flags.delete(v) : state.flags.add(v); }
    else state[g] = state[g] === v ? null : v; // nochmal klicken = abwählen
    applyFilters();
  }));
  let searchTimer;
  searchInput?.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.q = searchInput.value.trim(); applyFilters(false); }, 150);
  });
  sortSelect?.addEventListener("change", () => { state.sort = sortSelect.value; applyFilters(); });
  resetAllBtn?.addEventListener("click", resetAll);
  $("[data-filter-reset]")?.addEventListener("click", resetAll);

  function setFiltersOpen(open) {
    if (!moreFilters || !filterToggle) return;
    moreFilters.hidden = !open;
    filterToggle.setAttribute("aria-expanded", String(open));
  }
  filterToggle?.addEventListener("click", () => setFiltersOpen(moreFilters.hidden));
  setFiltersOpen(window.matchMedia("(min-width: 900px)").matches);

  $$("[data-show-favs]").forEach((btn) => btn.addEventListener("click", () => {
    setMenu(false);
    state.size = null; state.age = null; state.sex = null; state.flags.clear(); state.q = "";
    if (searchInput) searchInput.value = "";
    state.cat = "favs";
    applyFilters();
    $("#hunde")?.scrollIntoView({ behavior: scrollBehavior });
  }));

  document.addEventListener("click", (e) => {
    const heart = e.target.closest(".heart-btn[data-fav]");
    if (heart) { e.preventDefault(); toggleFav(heart.dataset.fav, heart); return; }
    const opener = e.target.closest("[data-open-dog]");
    if (opener) { e.preventDefault(); openDog(opener.dataset.openDog); }
  });

  applyFilters(false);

  /* ======================================================================
     STECKBRIEF-FENSTER
     ====================================================================== */
  const modal = $("#dogModal");
  const modalInner = $("#modalInner");
  let lastFocus = null;
  let modalList = DOGS.map((d) => d.id); // Blätter-Reihenfolge = aktuelle Sortierung
  let currentDogIndex = 0;

  function modalHTML(dog) {
    const tone = TONE[dog.farbe] || "pink";
    return `
      <div class="modal__media riso--none qcard--${tone}${dog.bild ? "" : " modal__media--ph"}" data-id="${dog.id}">
        ${photo(dog, { lazy: false })}
        <span class="sticker qcard__status">${dog.status}</span>
        <span class="sticker qcard__sticker">${dog.sticker}</span>
        <span class="fav-stamp" aria-hidden="true">Gemerkt ♥</span>
        <div class="modal__pager">
          <button type="button" data-modal-step="-1" aria-label="Vorheriger Hund">${icon("chev-left")}</button>
          <button type="button" data-modal-step="1" aria-label="Nächster Hund">${icon("chev-right")}</button>
        </div>
      </div>
      <div class="modal__content qcard--${tone}">
        <button type="button" class="modal__close" data-modal-close aria-label="Steckbrief schließen">${icon("close")}</button>
        <div class="modal__head">
          <span class="qcard__code">${dog.code}</span>
          <span class="qcard__series">Steckbrief ·<br>Tierpfoten-Quartett</span>
          ${heartButton(dog)}
        </div>
        <h2 class="modal__title" id="modalTitle">${dog.name}</h2>
        <p class="modal__sub">${dog.charakter}</p>
        <div class="voice">
          <button type="button" class="btn btn--yellow btn--sm voice__btn" data-hundeblick>🐾 Lass ${dog.name} selbst erzählen</button>
          <div class="voice__out" aria-live="polite"></div>
        </div>
        <dl class="facts">
          <div><dt>Rasse</dt><dd>${dog.rasse}</dd></div>
          <div><dt>Alter</dt><dd>${dog.alter}</dd></div>
          <div><dt>Geschlecht</dt><dd>${dog.geschlecht} ${sexSymbol(dog)}</dd></div>
          <div><dt>Größe</dt><dd>ca. ${dog.cm} cm · Klasse ${dog.klasse}</dd></div>
          <div><dt>Kastriert</dt><dd>${dog.kastriertText}</dd></div>
          <div><dt>Im Tierheim seit</dt><dd>${dog.seitText} (${dog.tage === 1 ? "1 Tag" : dog.tage + " Tage"})</dd></div>
          <div><dt>Besonders</dt><dd>${dog.tags.join(" · ")}</dd></div>
        </dl>
        <div class="modal__section"><h3>Verträglich mit</h3>${compatHTML(dog)}</div>
        ${statsHTML(dog)}
        <div class="modal__section"><h3>Geschichte &amp; Alltag</h3><p>${dog.geschichte}</p></div>
        <div class="modal__section"><h3>Verträglichkeit im Detail</h3><p>${dog.vertraeglichkeit}</p></div>
        <div class="modal__health"><strong>Gesundheit ✚</strong><p>${dog.gesundheit}</p></div>
        <div class="modal__actions">
          <button type="button" class="btn btn--blue" data-modal-contact="kennenlernen">${dog.name} kennenlernen ${icon("arrow")}</button>
          <button type="button" class="btn btn--paper" data-modal-contact="pate">Pate werden</button>
        </div>
      </div>`;
  }

  function renderDog(index) {
    currentDogIndex = (index + modalList.length) % modalList.length;
    const dog = dogById(modalList[currentDogIndex]);
    modalInner.innerHTML = modalHTML(dog);
    if (geschichten.has(dog.id)) zeigeGeschichte(dog, geschichten.get(dog.id), "geschichte"); // schon erzählt? gleich zeigen
    modalInner.scrollTop = 0;
    $(".modal__content", modalInner)?.scrollTo?.(0, 0);
    updateFavUI();
  }
  function openDog(id) {
    if (!dogById(id) || !modal) return;
    // Blättern folgt der sichtbaren Reihenfolge im Raster (falls der Hund dort sichtbar ist)
    const visible = $$(".qcard", grid).filter((c) => !c.hidden).map((c) => c.dataset.id);
    modalList = visible.includes(id) ? visible : $$(".qcard", grid).map((c) => c.dataset.id);
    lastFocus = document.activeElement;
    renderDog(modalList.indexOf(id));
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    document.body.classList.add("modal-open");
    $(".modal__close", modal)?.focus();
  }
  function closeDog() {
    if (!modal?.open) return;
    if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
  }
  modal?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  });
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) { closeDog(); return; }
    if (e.target.closest("[data-modal-close]")) { closeDog(); return; }
    const step = e.target.closest("[data-modal-step]");
    if (step) {
      renderDog(currentDogIndex + Number(step.dataset.modalStep));
      $(`[data-modal-step="${step.dataset.modalStep}"]`, modal)?.focus();
      return;
    }
    if (e.target.closest("[data-hundeblick], [data-hundeblick-neu]")) {
      hundeblick(dogById(modalList[currentDogIndex]), !!e.target.closest("[data-hundeblick-neu]"));
      return;
    }
    if (e.target.closest("[data-hundeblick-teilen]")) {
      teileGeschichte(dogById(modalList[currentDogIndex]));
      return;
    }
    const contact = e.target.closest("[data-modal-contact]");
    if (contact) {
      const dog = dogById(modalList[currentDogIndex]);
      lastFocus = null;
      closeDog();
      prefillContact(contact.dataset.modalContact, dog);
    }
  });
  modal?.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    renderDog(currentDogIndex + (e.key === "ArrowRight" ? 1 : -1));
    $(".modal__close", modal)?.focus();
  });

  /* ======================================================================
     HUNDEBLICK – "Lass [Name] selbst erzählen" (KI über n8n)
     ----------------------------------------------------------------------
     1. Klick auf den Knopf im Steckbrief.
     2. Die Website schickt NUR den Steckbrief dieses Hundes an n8n
        (Workflow "Tierpfoten: Hundeblick", Adresse KI_ADRESSEN.hundeblick).
     3. n8n fragt OpenAI mit festen Regeln ("nur Fakten aus dem Steckbrief").
     4. Die Geschichte erscheint als Notizzettel. Sie wird nur hier im Browser
        für diesen Besuch gemerkt (nicht gespeichert, nicht verschickt).
     ====================================================================== */
  const geschichten = new Map(); // Hund-ID -> Text (nur solange die Seite offen ist)

  function steckbriefText(dog) {
    return `${hundZeile(dog)}\nGeschichte: ${dog.geschichte}\nBesonderheiten: ${dog.tags.join(", ")}. Spitzname-Aufkleber: ${dog.sticker}.` +
      (dog.paar ? "\nACHTUNG: Das sind zwei Hunde, die nur zusammen vermittelt werden." : "");
  }

  function zeigeGeschichte(dog, inhalt, art) {
    const out = $(".voice__out", modal);
    const knopf = $("[data-hundeblick]", modal);
    if (!out) return;
    if (art === "geschichte") {
      if (knopf) knopf.hidden = true;
      out.innerHTML = `
        <figure class="voice__note">
          <blockquote><p></p></blockquote>
          <figcaption>✶ KI-Geschichte, fiktiv nach echten Steckbrief-Daten</figcaption>
          <div class="voice__actions">
            <button type="button" class="chip chip--mini" data-hundeblick-neu>Neue Geschichte ↻</button>
            <button type="button" class="chip chip--mini" data-hundeblick-teilen>Teilen (Text kopieren)</button>
          </div>
        </figure>`;
      $("blockquote p", out).textContent = inhalt; // als reiner Text eingesetzt (sicher)
    } else {
      if (knopf) knopf.hidden = art === "laedt";
      out.innerHTML = `<p class="voice__msg voice__msg--${art}"></p>`;
      $("p", out).textContent = inhalt;
    }
  }

  async function hundeblick(dog, neu = false) {
    if (!dog) return;
    if (!neu && geschichten.has(dog.id)) { zeigeGeschichte(dog, geschichten.get(dog.id), "geschichte"); return; }
    zeigeGeschichte(dog, `${dog.name} kaut gerade nachdenklich auf dem Bleistift … 🐾`, "laedt");
    try {
      const antwort = await fetch(KI_ADRESSEN.hundeblick, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: dog.name, steckbrief: steckbriefText(dog) })
      });
      if (antwort.status === 404) { zeigeGeschichte(dog, `${dog.name} ${dog.paar ? "schlafen" : "schläft"} gerade 💤 (Der Hundeblick-Workflow in n8n ist nicht veröffentlicht.)`, "warn"); return; }
      const daten = await antwort.json().catch(() => ({}));
      // Falls der Nutzer inzwischen zu einem anderen Hund geblättert hat: nichts überschreiben
      if (dogById(modalList[currentDogIndex]) !== dog) { if (daten.answer) geschichten.set(dog.id, daten.answer); return; }
      if (!antwort.ok || !daten.answer) { zeigeGeschichte(dog, daten.error || "Das hat nicht geklappt. Versuch es gleich nochmal.", "warn"); return; }
      geschichten.set(dog.id, daten.answer.trim());
      zeigeGeschichte(dog, daten.answer.trim(), "geschichte");
    } catch (err) {
      zeigeGeschichte(dog, "Die Geschichten-KI ist gerade nicht erreichbar. Versuch es gleich nochmal.", "warn");
    }
  }

  async function teileGeschichte(dog) {
    const text = geschichten.get(dog?.id);
    if (!text) return;
    const zumKopieren = `„${text}“\n– ${dog.name}, Tierpfoten Darmstadt e.V. (KI-Geschichte nach echtem Steckbrief)`;
    try { await navigator.clipboard.writeText(zumKopieren); toast(`${icon("check")} Geschichte kopiert, jetzt einfach einfügen`); }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = zumKopieren; ta.setAttribute("readonly", ""); ta.className = "sr-only";
      modal.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e2) {}
      ta.remove();
      toast(ok ? `${icon("check")} Geschichte kopiert` : "Bitte den Text markieren und mit Strg+C kopieren");
    }
  }

  /* ======================================================================
     POSTKARTE (Kontaktformular)
     ====================================================================== */
  const form = $("#contactForm");
  const formCard = $("#kontakt");
  const msg = $("#formMsg");
  const success = $("#formSuccess");

  const PREFILL_TEXT = {
    kennenlernen: (dog) => dog
      ? `Hallo Tierpfoten-Team, ich interessiere mich sehr für ${dog.name} und würde mich über einen Kennenlerntermin freuen!`
      : "Hallo Tierpfoten-Team, ich möchte gern einen Hund adoptieren und würde mich über ein Beratungsgespräch freuen.",
    gassi: () => "Hallo Tierpfoten-Team, ich möchte gern ehrenamtlich Gassi gehen. Wann ist die nächste Einführung?",
    pate: (dog) => dog
      ? `Hallo Tierpfoten-Team, ich würde gern eine Patenschaft für ${dog.name} übernehmen. Wie funktioniert das?`
      : "Hallo Tierpfoten-Team, ich interessiere mich für eine Patenschaft oder Spende. Wie kann ich am besten helfen?",
    allgemein: () => ""
  };

  function prefillContact(topic, dog) {
    if (!form) return;
    if (success && !success.hidden) resetForm();
    const radio = $(`input[name="topic"][value="${topic}"]`, form);
    if (radio) radio.checked = true;
    const text = PREFILL_TEXT[topic] ? PREFILL_TEXT[topic](dog) : "";
    if (text && msg && (!msg.value.trim() || msg.dataset.prefilled === "1")) { msg.value = text; msg.dataset.prefilled = "1"; }
    formCard?.scrollIntoView({ behavior: scrollBehavior, block: "center" });
    if (!reduceMotion) restart(formCard, "flash");
    setTimeout(() => $("#formName")?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
  }
  $$("[data-prefill]").forEach((btn) => btn.addEventListener("click", (e) => { e.preventDefault(); prefillContact(btn.dataset.prefill); }));
  msg?.addEventListener("input", () => { msg.dataset.prefilled = "0"; });

  function setError(input, text) {
    const field = input.closest(".field");
    const err = $(".field__error", field);
    field.classList.toggle("has-error", !!text);
    input.setAttribute("aria-invalid", text ? "true" : "false");
    if (err) err.textContent = text || "";
  }
  function validate() {
    const name = $("#formName"), email = $("#formEmail");
    let firstBad = null;
    [
      [name, name.value.trim().length >= 2 ? "" : "Wie heißt du? Bitte Namen eintragen."],
      [email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? "" : "Hm, die E-Mail sieht nicht ganz richtig aus."],
      [msg, msg.value.trim().length >= 5 ? "" : "Schreib uns ein paar Worte, bitte!"]
    ].forEach(([input, error]) => { setError(input, error); if (error && !firstBad) firstBad = input; });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  $$(".field input, .field textarea", form || document).forEach((input) =>
    input.addEventListener("input", () => { if (input.closest(".field").classList.contains("has-error")) setError(input, ""); })
  );
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    const submitBtn = $('button[type="submit"]', form);
    const r = submitBtn.getBoundingClientRect();
    const name = $("#formName").value.trim().split(" ")[0];
    const topic = $('input[name="topic"]:checked', form)?.value;
    const what = { kennenlernen: "deine Kennenlern-Anfrage", gassi: "deine Gassi-Anmeldung", pate: "deine Anfrage zu Spende & Patenschaft" }[topic] || "deine Postkarte";
    $("#formSuccessTitle").textContent = `Danke, ${name}!`;
    $("#formSuccessText").textContent = `So würde es aussehen, wenn wir ${what} bekommen hätten. Aber Tierpfoten ist ein Übungsprojekt: Es wurde nichts verschickt und nichts gespeichert. Für eine echte Adoption wende dich bitte an ein Tierheim in deiner Nähe.`;
    form.hidden = true;
    success.hidden = false;
    success.focus();
    boneConfetti(r.left + r.width / 2, r.top + r.height / 2, 34);
  });
  function resetForm() {
    form.reset();
    msg.dataset.prefilled = "0";
    $$(".field", form).forEach((f) => f.classList.remove("has-error"));
    $$(".field__error", form).forEach((x) => (x.textContent = ""));
    success.hidden = true;
    form.hidden = false;
  }
  $("#formAgain")?.addEventListener("click", () => { resetForm(); $("#formName")?.focus(); });

  /* ======================================================================
     SCHNÜFFEL-TEST (Quiz) – nutzt automatisch alle Hunde aus der Datenbank
     ====================================================================== */
  const quizForm = $("#quizForm");
  const steps = $$(".quiz__step", quizForm || document);
  const quizBar = $("#quizBar");
  const quizLabel = $("#quizStepLabel");
  const quizBack = $("#quizBack");
  const quizNext = $("#quizNext");
  const quizResult = $("#quizResult");
  let step = 0;

  function showStep(i) {
    step = i;
    steps.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    if (quizBar) quizBar.style.width = `${((i + 1) / steps.length) * 100}%`;
    if (quizLabel) quizLabel.textContent = `Frage ${i + 1} von ${steps.length}`;
    if (quizBack) quizBack.disabled = i === 0;
    if (quizNext) {
      quizNext.disabled = !$("input:checked", steps[i]);
      quizNext.innerHTML = (i === steps.length - 1 ? "Ergebnis zeigen " : "Weiter ") + icon("chev-right");
    }
  }

  function scoreDog(dog, a) {
    const m = dog.match;
    const level = (v) => [0, 1.5, 3][v];
    let s = 0;
    s += Math.max(0, 3 - Math.abs(m.energie - a.energy) * 1.5);
    s += { kids: level(m.kinder), adults: 3, dogs: level(m.hunde), cats: level(m.katzen) }[a.household];
    s += a.experience >= m.erfahrung ? 3 : Math.max(0, 3 - (m.erfahrung - a.experience) * 1.5);
    s += a.home === "house" ? 3 : level(m.wohnung);
    return Math.round((s / 12) * 100);
  }
  function reasonFor(dog, a) {
    const m = dog.match;
    const p = dog.paar;
    const v = (sg, pl) => (p ? pl : sg);
    const bits = [];
    if (m.energie === a.energy) bits.push(a.energy === 3 ? v("teilt deine Lust auf Bewegung", "teilen deine Lust auf Bewegung") : a.energy === 1 ? v("liebt es genauso gemütlich wie du", "lieben es genauso gemütlich wie du") : v("passt zu deinem abwechslungsreichen Alltag", "passen zu deinem abwechslungsreichen Alltag"));
    if (a.household === "kids" && m.kinder === 2) bits.push(v("ist super mit Kindern", "sind super mit Kindern"));
    if (a.household === "dogs" && m.hunde === 2) bits.push(v("versteht sich prima mit Artgenossen", "verstehen sich prima mit Artgenossen"));
    if (a.household === "cats" && m.katzen === 2) bits.push(v("kommt gut mit Katzen klar", "kommen gut mit Katzen klar"));
    if (a.home === "flat" && m.wohnung === 2) bits.push(v("fühlt sich auch in einer Wohnung wohl", "fühlen sich auch in einer Wohnung wohl"));
    if (a.experience === 1 && m.erfahrung === 1) bits.push(v("ist auch für Hunde-Neulinge geeignet", "sind auch für Hunde-Neulinge geeignet"));
    if (!bits.length) bits.push(v("könnte gut zu dir passen. Am besten lernt ihr euch persönlich kennen", "könnten gut zu dir passen. Am besten lernt ihr euch persönlich kennen"));
    return `${dog.name} ${bits.slice(0, 2).join(" und ")}. ${v("Wartet", "Warten")} übrigens schon seit ${tageText(dog.tage)} bei uns.`;
  }

  function showResult() {
    const data = new FormData(quizForm);
    const a = { energy: Number(data.get("energy")), household: data.get("household"), experience: Number(data.get("experience")), home: data.get("home") };
    // Bei Gleichstand gewinnt, wer schon länger wartet
    const ranked = DOGS.map((d) => ({ dog: d, score: scoreDog(d, a) })).sort((x, y) => y.score - x.score || y.dog.tage - x.dog.tage);
    const best = ranked[0];
    const tone = TONE[best.dog.farbe] || "pink";
    quizResult.innerHTML = `
      <div class="result-top">
        <div class="result-photo riso riso--${tone} qcard--${tone}">
          ${photo(best.dog, { lazy: false, alt: true })}
          <div class="stamp" aria-hidden="true"><span>Match</span><strong>${best.score}%</strong><span>✶ Wuff ✶</span></div>
        </div>
        <div>
          <p class="label">Dein Top-Match</p>
          <h3>${best.dog.name}!</h3>
          <p><span class="sr-only">${best.score} Prozent Übereinstimmung. </span>${reasonFor(best.dog, a)}</p>
          <div class="result-actions">
            <button type="button" class="btn btn--blue btn--sm" data-open-dog="${best.dog.id}">Steckbrief ansehen ${icon("arrow")}</button>
            <button type="button" class="btn btn--pink btn--sm" data-quiz-fav="${best.dog.id}">${icon("heart")} Merken</button>
          </div>
        </div>
      </div>
      <div class="result-others">
        <h4>Passen auch gut zu dir:</h4>
        <ul>${ranked.slice(1, 5).map((o) => `
          <li><button type="button" class="result-mini qcard--${TONE[o.dog.farbe] || "pink"}" data-open-dog="${o.dog.id}">
            <span class="result-mini__img riso riso--${TONE[o.dog.farbe] || "pink"}">${o.dog.bild ? `<img src="${o.dog.bild}" alt="" class="img-${o.dog.fokus}">` : `<span class="ph ph--mini" aria-hidden="true"><span class="ph__q">?</span></span>`}</span>
            <span><strong>${o.dog.name}</strong><span>${o.score}% Match</span></span>
          </button></li>`).join("")}
        </ul>
      </div>
      <button type="button" class="btn btn--paper btn--sm result-restart" id="quizRestart">${icon("refresh")} Test neu starten</button>`;

    quizForm.hidden = true;
    if (quizBar) quizBar.style.width = "100%";
    if (quizLabel) quizLabel.textContent = "Geschafft!";
    quizResult.hidden = false;
    quizResult.focus({ preventScroll: true });
    const ph = $(".result-photo", quizResult).getBoundingClientRect();
    setTimeout(() => boneConfetti(ph.left + ph.width / 2, ph.top + ph.height / 2, 18), 250);

    $("[data-quiz-fav]", quizResult)?.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.quizFav;
      if (!favs.has(id)) toggleFav(id); else toast(`${icon("heart")} ${dogById(id).name} ist schon gemerkt`);
    });
    $("#quizRestart")?.addEventListener("click", () => {
      quizForm.reset();
      quizResult.hidden = true;
      quizForm.hidden = false;
      showStep(0);
      $('input[name="energy"]', quizForm)?.focus();
    });
  }

  function advance() {
    if (!$("input:checked", steps[step])) return;
    if (step < steps.length - 1) { showStep(step + 1); $("input", steps[step])?.focus({ preventScroll: true }); }
    else showResult();
  }
  // Maus/Finger: antippen → automatisch weiter. Tastatur: Pfeiltasten wählen, Enter oder "Weiter".
  let pickedByPointer = false;
  quizForm?.addEventListener("pointerdown", () => { pickedByPointer = true; });
  quizForm?.addEventListener("keydown", (e) => {
    pickedByPointer = false;
    if (e.key === "Enter" && e.target.matches('input[type="radio"]')) { e.preventDefault(); advance(); }
  });
  quizForm?.addEventListener("change", (e) => {
    if (!e.target.matches('input[type="radio"]')) return;
    if (quizNext) quizNext.disabled = false;
    if (pickedByPointer) setTimeout(advance, reduceMotion ? 0 : 320);
    pickedByPointer = false;
  });
  quizForm?.addEventListener("submit", (e) => e.preventDefault());
  quizNext?.addEventListener("click", advance);
  quizBack?.addEventListener("click", () => { if (step > 0) showStep(step - 1); });
  if (steps.length) showStep(0);

  /* ======================================================================
     LECKERLI-KONTO (Spendenrechner)
     ====================================================================== */
  const range = $("#amountRange");
  const amountOut = $("#amountOutput");
  const impactText = $("#impactText");
  const impactExtra = $("#impactExtra");
  const impactBox = $("#impactBox");
  const amountChips = $$("[data-amount]");
  let lastLevel = null;

  function updateAmount(value) {
    const v = Number(value);
    const min = Number(range.min), max = Number(range.max);
    range.value = v;
    range.style.setProperty("--pct", `${((v - min) / (max - min)) * 100}%`);
    range.setAttribute("aria-valuetext", `${v} Euro`);
    amountOut.innerHTML = `${v}&nbsp;€`;
    restart(amountOut, "tick");
    const level = IMPACT_LEVELS.filter((l) => v >= l.ab).pop() || IMPACT_LEVELS[0];
    if (level !== lastLevel) { impactText.textContent = level.text; restart(impactBox, "swap"); lastLevel = level; }
    const weeks = Math.floor(v / FUTTER_PRO_WOCHE);
    impactExtra.innerHTML = `Anders gerechnet: rund <strong>${weeks} ${weeks === 1 ? "Woche" : "Wochen"}</strong> Spezialfutter für einen geschwächten Hund.`;
    amountChips.forEach((c) => {
      const on = Number(c.dataset.amount) === v;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
  }
  if (range) {
    range.addEventListener("input", () => updateAmount(range.value));
    amountChips.forEach((c) => c.addEventListener("click", () => updateAmount(c.dataset.amount)));
    updateAmount(range.value);
  }

  const copyBtn = $("#copyIban");
  copyBtn?.addEventListener("click", async () => {
    const iban = $("#ibanCode").textContent.replace(/\s/g, "");
    const label = $("span", copyBtn);
    const done = () => {
      copyBtn.classList.add("is-done");
      label.textContent = "Kopiert!";
      toast(`${icon("check")} IBAN ist in der Zwischenablage`);
      setTimeout(() => { copyBtn.classList.remove("is-done"); label.textContent = "IBAN kopieren"; }, 2500);
    };
    try { await navigator.clipboard.writeText(iban); done(); }
    catch (err) {
      // Ersatzweg, falls die Zwischenablage blockiert ist (z. B. bei Doppelklick-Öffnung)
      const ta = document.createElement("textarea");
      ta.value = iban; ta.setAttribute("readonly", ""); ta.className = "sr-only";
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e2) {}
      ta.remove();
      if (ok) done(); else toast("Bitte IBAN markieren und mit Strg+C kopieren");
    }
  });

  /* ======================================================================
     FRAG WUFFI – KI-Chat, läuft jetzt über n8n (seit 18.11.2026)
     ----------------------------------------------------------------------
     Wichtig: Die Website spricht hier NICHT direkt mit OpenAI!
       1. Du tippst eine Frage.
       2. Die Website schickt sie an unseren Mittelsmann: den n8n-Workflow
          "Tierpfoten: Frag Wuffi (Website-Chat)" (Adresse: WUFFI_N8N_URL).
       3. n8n prüft und kürzt die Anfrage, hängt Wuffis Charakter-Regeln an
          und fragt OpenAI mit dem Schlüssel, der nur in n8n gespeichert ist.
       4. Die Antwort kommt zurück und erscheint hier als Sprechblase.
     So steht der Geld-Schlüssel nirgends im Code der Website.
     Der alte Weg über ki-server/server.ps1 wird nicht mehr gebraucht.
     Sicherung der alten Fassung: Ordner _sicherung-vor-n8n.
     ====================================================================== */
  const WUFFI_N8N_URL = KI_ADRESSEN.wuffi;
  const chatLog = $("#chatLog");
  const chatForm = $("#chatForm");
  const chatInput = $("#chatInput");
  const chatSend = $("#chatSend");
  const wuffiStatus = $("#wuffiStatus");
  const verlauf = []; // bisherige Unterhaltung: [{ role: "user"|"assistant", content: "..." }]

  function setWuffiStatus(art, text) {
    if (!wuffiStatus) return;
    wuffiStatus.className = "wuffi__status wuffi__status--" + art;
    $(".wuffi__status-text", wuffiStatus).textContent = text;
  }

  // Das "Wissen" über die Hunde: automatisch aus der Hunde-Datenbank gebaut
  // (wird von Wuffi UND vom KI-Rasseberater benutzt)
  function hundeWissen() {
    return DOGS.map(hundZeile).join("\n");
  }
  function hundZeile(d) {
    const lvl = (v) => LEVEL_TEXT[v];
    return (
      `- ${d.name} (${d.geschlecht}, ${d.alter}, ${d.rasse}, ${d.cm} cm = Größe ${d.klasse}, kastriert: ${d.kastriertText}, ` +
      `seit ${d.tage} Tagen im Tierheim, Status: ${d.status}). Charakter: ${d.charakter} ${d.teaser} ` +
      `Verträglich mit Kindern: ${lvl(d.match.kinder)}, Katzen: ${lvl(d.match.katzen)}, Hunden: ${lvl(d.match.hunde)}, ` +
      `Wohnung: ${lvl(d.match.wohnung)}, für Anfänger: ${lvl(d.anfaenger)}. Details: ${d.vertraeglichkeit} Gesundheit: ${d.gesundheit} ` +
      `Quartett: Kuschelfaktor ${d.quartett.kuscheln}/10, Sofa-Anspruch ${d.quartett.sofa}/10, Ball-Besessenheit ${d.quartett.ball}/10, Gassi-Ausdauer ${d.quartett.gassi}/10.`
    );
  }

  // Wuffi bekommt zusätzlich Infos zum Tierheim
  function wuffiWissen() {
    return `HUNDE (${DOGS.length}):\n${hundeWissen()}\n\nTIERHEIM:\n` +
      "- WICHTIG: Tierpfoten Darmstadt ist ein ausgedachtes Tierheim (Übungsprojekt). Adresse, Telefon, E-Mail und Spendenkonto sind Platzhalter. Wer wirklich einen Hund adoptieren oder spenden möchte, wendet sich an ein echtes Tierheim in der Nähe. Sag das ehrlich, wenn jemand nach Kontakt, Besuch, Adoption oder Spende fragt.\n" +
      "- Adresse (fiktiv): Pfotenweg 1, 64297 Darmstadt-Eberstadt. Telefon und Notruf (fiktiv): 06151 / 00 00 00, E-Mail info@tierpfoten-darmstadt-dummy.de.\n" +
      "- Besuchszeiten: Mi–Sa 14:00–17:30, So 11:00–14:00 nur mit Termin, Mo & Di Ruhetage. Erstbesuche bitte kurz vorher anmelden.\n" +
      "- Gassigehen für Ehrenamtliche: Mi & Sa ab 14:00, kostenlose Einführung und Versicherung.\n" +
      "- Schutzgebühr: 350 € für ausgewachsene Hunde, 250 € für Senioren (geimpft, gechippt, entwurmt, EU-Heimtierausweis, wenn möglich kastriert).\n" +
      "- Ablauf Adoption: Kontaktformular/Fragebogen, mehrere Kennenlern-Spaziergänge, Vorkontrolle zu Hause, Schutzvertrag und Einzug. Rücknahme im Notfall jederzeit, lebenslange Beratung.\n" +
      "- Mietwohnung ist möglich mit schriftlicher Erlaubnis der Vermietung.\n" +
      "- Spenden: nur ein Beispiel-Konto (IBAN DE00 0000 0000 0000 0000 00), bitte nichts überweisen. Patenschaften gibt es nur im Spiel.";
  }

  function addBubble(rolle, text, extraKlasse = "") {
    const div = document.createElement("div");
    div.className = `bubble bubble--${rolle} ${extraKlasse}`.trim();
    const p = document.createElement("p");
    // Sicherheit: Antworttext immer als reinen Text einsetzen (nie als HTML)
    p.textContent = text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/__(.+?)__/g, "$1");
    div.appendChild(p);
    if (rolle === "wuffi" && !extraKlasse) {
      // Wenn Wuffi Hunde nennt: Knöpfe zum Steckbrief anbieten
      const genannt = DOGS.filter((d) => d.name.split(" & ").some((n) => new RegExp(`\\b${n}\\b`).test(text)));
      if (genannt.length) {
        const leiste = document.createElement("div");
        leiste.className = "bubble__dogs";
        genannt.slice(0, 4).forEach((d) => {
          const b = document.createElement("button");
          b.type = "button"; b.className = "chip chip--mini"; b.dataset.openDog = d.id;
          b.textContent = `Steckbrief: ${d.name}`;
          leiste.appendChild(b);
        });
        div.appendChild(leiste);
      }
    }
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
    return div;
  }

  function pruefeWuffi() {
    if (!chatLog) return;
    addBubble("wuffi", "Wuff! Ich bin Wuffi 🐾 Frag mich alles über unsere Fellnasen, zum Beispiel wer zu dir passt, wer am längsten wartet oder wann du vorbeikommen kannst.");
    // Kein lokaler KI-Server mehr nötig: Wuffi wohnt jetzt in n8n.
    // Ob er wirklich antwortet, zeigt sich bei der ersten Frage.
    setWuffiStatus("wach", "Wuffi ist wach (über n8n · OpenAI)");
  }

  async function frageWuffi(frage) {
    frage = frage.trim();
    if (!frage || !chatLog) return;
    addBubble("ich", frage);
    chatInput.value = "";
    verlauf.push({ role: "user", content: frage });
    const tippt = addBubble("wuffi", "Wuffi schnüffelt nach einer Antwort …", "bubble--typing");
    chatSend.disabled = true; chatInput.disabled = true;

    try {
      // Schritt 1+2: Frage samt bisherigem Verlauf und Wissen an den n8n-Workflow schicken
      const antwort = await fetch(WUFFI_N8N_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: verlauf.slice(-10), context: wuffiWissen() })
      });
      // Schritt 3: Antwort (JSON) auspacken
      const daten = await antwort.json().catch(() => ({}));
      tippt.remove();
      if (!antwort.ok || !daten.answer) {
        // Schritt 5: Fehler freundlich anzeigen (Details stehen in n8n unter "Executions")
        verlauf.pop();
        const meldung = daten.error
          || (antwort.status === 404 ? "Mein Körbchen bei n8n ist noch zu 💤 Der Workflow „Tierpfoten: Frag Wuffi“ muss in n8n veröffentlicht sein." : "")
          || "Da ist etwas schiefgegangen. Versuch es gleich nochmal.";
        addBubble("wuffi", meldung, "bubble--error");
        return;
      }
      // Schritt 4: Antwort anzeigen und für die nächste Frage merken
      verlauf.push({ role: "assistant", content: daten.answer });
      addBubble("wuffi", daten.answer);
    } catch (e) {
      tippt.remove();
      verlauf.pop();
      setWuffiStatus("schlaeft", "Wuffi schläft (n8n nicht erreichbar)");
      addBubble("wuffi", "Ich erreiche mein Körbchen bei n8n gerade nicht 💤 Prüf, ob du online bist und ob der Workflow „Tierpfoten: Frag Wuffi“ in n8n veröffentlicht ist.", "bubble--error");
    } finally {
      chatSend.disabled = false; chatInput.disabled = false; chatInput.focus();
    }
  }

  chatForm?.addEventListener("submit", (e) => { e.preventDefault(); frageWuffi(chatInput.value); });
  $$("[data-ask]").forEach((b) => b.addEventListener("click", () => frageWuffi(b.dataset.ask)));
  pruefeWuffi();

  /* ======================================================================
     KI-RASSEBERATER – freie Beschreibung -> passende Rassen + Tierheim-Hunde
     ----------------------------------------------------------------------
     Ablauf:
       1. Du beschreibst in eigenen Worten, was du an Hunden magst.
       2. Die Website schickt die Beschreibung + die Liste unserer 12 Hunde
          an n8n (Workflow "Tierpfoten: KI-Rasseberater") – nicht direkt an OpenAI.
       3. n8n fragt OpenAI mit festen Regeln und bittet um eine
          Antwort als JSON (feste Datenform, damit wir sie schön anzeigen können).
       4. Die Website prüft die Antwort: Nur Hunde, die es bei uns WIRKLICH gibt,
          werden angezeigt (falls die KI sich mal einen Namen ausdenkt).
       5. Ergebnis als Karten. Ein Mensch aus dem Team berät dann persönlich.
     ====================================================================== */
  const tabKlassisch = $("#tabKlassisch");
  const tabKi = $("#tabKi");
  const aiForm = $("#aiForm");
  const aiText = $("#aiText");
  const aiSend = $("#aiSend");
  const aiCount = $("#aiCount");
  const aiResult = $("#aiResult");

  // --- Reiter "4 Fragen" / "KI-Rasseberater" umschalten ---
  function zeigeModus(ki) {
    if (!tabKi) return;
    [[tabKlassisch, $("#quiz"), !ki], [tabKi, $("#aiquiz"), ki]].forEach(([tab, panel, aktiv]) => {
      tab.classList.toggle("is-active", aktiv);
      tab.setAttribute("aria-selected", String(aktiv));
      tab.tabIndex = aktiv ? 0 : -1;
      panel.hidden = !aktiv;
    });
  }
  tabKlassisch?.addEventListener("click", () => zeigeModus(false));
  tabKi?.addEventListener("click", () => { zeigeModus(true); aiText?.focus({ preventScroll: true }); });
  [tabKlassisch, tabKi].forEach((tab) => tab?.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const ki = tab === tabKlassisch;
    zeigeModus(ki); (ki ? tabKi : tabKlassisch).focus();
  }));

  // --- Bausteine antippen fügt Sätze in das Textfeld ein ---
  function zaehle() { if (aiCount) aiCount.textContent = `${aiText.value.length} / 1200`; }
  aiText?.addEventListener("input", zaehle);
  $$("[data-add]").forEach((b) => b.addEventListener("click", () => {
    const satz = b.dataset.add;
    if (!aiText.value.includes(satz)) aiText.value = (aiText.value.trim() + " " + satz).trim().slice(0, 1200);
    zaehle(); aiText.focus();
  }));

  const sicher = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function zeigeKiHinweis(titel, text, art = "info") {
    aiResult.innerHTML = `<div class="aiquiz__msg aiquiz__msg--${art}"><p class="aiquiz__msg-title">${sicher(titel)}</p><p>${sicher(text)}</p></div>`;
  }

  function zeigeKiErgebnis(e) {
    // Sicherheitsnetz: nur echte Tierheim-Hunde übernehmen
    const tierheim = (Array.isArray(e.tierheim) ? e.tierheim : [])
      .map((t) => ({ dog: DOGS.find((d) => d.name.toLowerCase() === String(t.name || "").trim().toLowerCase()), warum: t.warum }))
      .filter((t) => t.dog).slice(0, 3);
    const rassen = (Array.isArray(e.rassen) ? e.rassen : []).slice(0, 3);
    const toene = ["pink", "yellow", "blue"];

    if (!rassen.length && !tierheim.length) {
      zeigeKiHinweis("Hm, da fehlt mir was", e.rueckfrage || e.verstanden || "Erzähl mir bitte etwas mehr darüber, was du an Hunden magst.");
      return;
    }
    const badge = (label, wert) => wert ? `<li><b>${label}</b> ${sicher(wert)}</li>` : "";
    aiResult.innerHTML = `
      ${e.verstanden ? `<p class="aiquiz__understood"><span>Das hab ich verstanden:</span> ${sicher(e.verstanden)}</p>` : ""}
      <h4 class="aiquiz__h">Rassen &amp; Typen, die zu dir passen könnten</h4>
      <div class="breeds">
        ${rassen.map((r, i) => `
          <article class="breed qcard--${toene[i % 3]}">
            <span class="breed__rank">${i + 1}</span>
            ${Number.isFinite(Number(r.passung)) ? `<span class="breed__score">${Math.max(0, Math.min(100, Math.round(Number(r.passung))))}%</span>` : ""}
            <h5>${sicher(r.name)}</h5>
            <p>${sicher(r.warum)}</p>
            ${r.achtung ? `<p class="breed__note"><b>Gut zu wissen:</b> ${sicher(r.achtung)}</p>` : ""}
            <ul class="breed__facts">${badge("Energie", r.energie)}${badge("Größe", r.groesse)}${badge("Pflege", r.pflege)}</ul>
          </article>`).join("")}
      </div>
      ${tierheim.length ? `
        <h4 class="aiquiz__h">Diese Fellnasen bei uns passen dazu</h4>
        <ul class="ai-dogs">
          ${tierheim.map(({ dog, warum }) => `
            <li><button type="button" class="result-mini qcard--${TONE[dog.farbe] || "pink"}" data-open-dog="${dog.id}">
              <span class="result-mini__img riso riso--${TONE[dog.farbe] || "pink"}">${dog.bild ? `<img src="${dog.bild}" alt="" class="img-${dog.fokus}">` : `<span class="ph ph--mini" aria-hidden="true"><span class="ph__q">?</span></span>`}</span>
              <span><strong>${sicher(dog.name)}</strong><span>${sicher(warum || dog.rasse)}</span></span>
            </button>
            <p class="ai-dogs__facts">Fakten aus unserer Kartei:</p>${compatHTML(dog)}</li>`).join("")}
        </ul>` : ""}
      ${e.rueckfrage ? `<p class="aiquiz__followup"><b>Rückfrage der KI:</b> ${sicher(e.rueckfrage)} <button type="button" class="scribble-btn" id="aiErgaenzen">Antwort ergänzen</button></p>` : ""}
      <p class="aiquiz__disclaimer">✶ KI-Empfehlung zur Orientierung, kein Ersatz für ein Gespräch mit unserem Team. Rassen beschreiben nur Tendenzen, jeder Hund ist ein Einzelstück.</p>
      <div class="result-actions">
        <button type="button" class="btn btn--pink btn--sm" data-ai-kontakt>Beratung beim Team anfragen</button>
        <button type="button" class="btn btn--paper btn--sm" id="aiNeu">${icon("refresh")} Neue Beschreibung</button>
      </div>`;

    $("#aiErgaenzen", aiResult)?.addEventListener("click", () => { aiText.focus(); aiText.setSelectionRange(aiText.value.length, aiText.value.length); });
    $("#aiNeu", aiResult)?.addEventListener("click", () => { aiText.value = ""; zaehle(); aiResult.innerHTML = ""; aiText.focus(); });
    $("[data-ai-kontakt]", aiResult)?.addEventListener("click", () => prefillContact("kennenlernen", tierheim[0]?.dog));
    const r = aiResult.getBoundingClientRect();
    boneConfetti(r.left + r.width / 2, Math.max(80, r.top + 60), 16);
  }

  aiForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const beschreibung = aiText.value.trim();
    if (beschreibung.length < 10) { zeigeKiHinweis("Ein bisschen mehr, bitte!", "Schreib ein, zwei Sätze, was dir an Hunden gefällt. Die Bausteine unter dem Feld helfen dir dabei.", "warn"); aiText.focus(); return; }

    zeigeKiHinweis("Die KI schnüffelt sich durch die Rassen und unsere 12 Steckbriefe …", "Das dauert ein paar Sekunden.", "laedt");
    aiSend.disabled = true;
    try {
      // Schritt 1+2: Beschreibung + Hundeliste an unseren n8n-Workflow schicken
      const antwort = await fetch(KI_ADRESSEN.rasse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ beschreibung, hunde: hundeWissen() })
      });
      if (antwort.status === 404) {
        zeigeKiHinweis("Der Rasseberater macht Pause 💤", "Der Workflow „Tierpfoten: KI-Rasseberater“ ist in n8n gerade nicht veröffentlicht.", "warn");
        return;
      }
      const daten = await antwort.json().catch(() => ({}));
      if (!antwort.ok || !daten.answer) { zeigeKiHinweis("Das hat nicht geklappt", daten.error || "Versuch es gleich nochmal.", "error"); return; }
      // Schritt 3: Die KI-Antwort ist JSON-Text -> in Daten verwandeln
      let ergebnis;
      try { ergebnis = JSON.parse(daten.answer); }
      catch { zeigeKiHinweis("Die KI hat etwas wirr geantwortet", "Bitte einfach nochmal auf „KI um Rat fragen“ klicken.", "error"); return; }
      // Schritt 4+5: prüfen und anzeigen
      zeigeKiErgebnis(ergebnis);
      aiResult.focus({ preventScroll: true });
    } catch (err) {
      zeigeKiHinweis("KI gerade nicht erreichbar", "Prüf deine Internetverbindung und versuch es gleich nochmal.", "error");
    } finally {
      aiSend.disabled = false;
    }
  });

  /* ======================================================================
     GASSI-WETTER – unser erster API-Anschluss (OpenWeatherMap)
     ----------------------------------------------------------------------
     Eine API ist wie ein Kellner: Wir geben eine Bestellung auf (Anfrage),
     der Wetterdienst bringt die Daten zurück (Antwort).
     Seit 18.11.2026 bestellt nicht mehr die Website selbst, sondern n8n
     (Workflow "Tierpfoten: Gassi-Wetter"). Der API-Schlüssel, unser
     "Mitgliedsausweis" beim Wetterdienst, liegt nur noch in n8n.
     So kann ihn niemand aus dem Quelltext der Website kopieren.
     ====================================================================== */
  const wetterBox = $("#weatherBody");
  const wetterMeta = $("#weatherMeta");
  // Ort (Darmstadt-Eberstadt, lat 49.82 / lon 8.65) ist im n8n-Workflow eingestellt.

  async function ladeWetter() {
    if (!wetterBox) return;
    zeigeWetterHinweis("laedt");

    try {
      // Schritt 1+2: Bei unserem n8n-Workflow nachfragen. "fetch" heißt "hol mir das",
      //              "await" heißt: warte, bis die Antwort da ist.
      //              n8n holt dann "Wetter jetzt" und die 5-Tage-Vorhersage beim Wetterdienst.
      const antwort = await holeMitZeitlimit(KI_ADRESSEN.wetter);

      // Schritt 3: Hat n8n "OK" gesagt? (200 = alles gut)
      if (!antwort.ok) throw new Error("n8n antwortet mit Status " + antwort.status);

      // Schritt 4: Die Antwort auspacken. Sie kommt als JSON (Text in einem festen Datenformat)
      //            und wird hier in ein JavaScript-Objekt verwandelt.
      const daten = await antwort.json();
      const jetzt = daten.jetzt;
      const vorhersage = daten.vorhersage && Array.isArray(daten.vorhersage.list) ? daten.vorhersage : null;
      if (!jetzt || !jetzt.main) throw new Error("Keine Wetterdaten in der Antwort");
      console.log("So sieht die Antwort des Wetterdienstes aus:", jetzt);

      // Schritt 5: Die Daten auf der Seite anzeigen.
      zeigeWetter(jetzt, vorhersage);
    } catch (fehler) {
      // Schritt 6: Fehler abfangen (z. B. kein Internet). Die Seite soll nie kaputtgehen.
      console.warn("Gassi-Wetter konnte nicht geladen werden:", fehler);
      zeigeWetterHinweis("offline");
    }
  }

  // Hilfsfunktion: Anfrage nach 12 Sekunden abbrechen, falls keine Antwort kommt
  function holeMitZeitlimit(url) {
    const abbruch = new AbortController();
    const timer = setTimeout(() => abbruch.abort(), 12000);
    return fetch(url, { signal: abbruch.signal }).finally(() => clearTimeout(timer));
  }

  // Wettercode von OpenWeatherMap -> Symbol (Liste der Codes: openweathermap.org/weather-conditions)
  function wetterSymbol(id) {
    if (id >= 200 && id < 300) return "⛈️";
    if (id >= 300 && id < 400) return "🌦️";
    if (id >= 500 && id < 600) return "🌧️";
    if (id >= 600 && id < 700) return "❄️";
    if (id >= 700 && id < 800) return "🌫️";
    if (id === 800) return "☀️";
    if (id <= 802) return "⛅";
    return "☁️";
  }

  // Unser eigenes Gassi-Urteil aus den Wetterdaten
  function gassiUrteil(id, temp, windKmh, regenMm) {
    if (id >= 200 && id < 300) return { titel: "Gewitter!", text: "Heute lieber drinnen kuscheln. Die Hunde sehen das genauso.", ton: "rot" };
    if (id >= 600 && id < 700) return { titel: "Schnee!", text: "Pfotenabdrücke garantiert. Danach Pfoten abtrocknen.", ton: "blau" };
    if ((id >= 300 && id < 600) || regenMm > 0.2) return { titel: "Matschpfoten-Alarm", text: "Regenjacke an, Handtuch bereit. Die Hunde lieben Pfützen.", ton: "blau" };
    if (temp >= 28) return { titel: "Zu heiß!", text: "Nur kurze Runde im Schatten und Wasser mitnehmen.", ton: "rot" };
    if (temp <= 0) return { titel: "Bibberkalt", text: "Gute Runde, aber danach die Pfoten checken (Streusalz!).", ton: "blau" };
    if (windKmh >= 40) return { titel: "Stürmisch", text: "Ohren festhalten! Lieber nicht durch den Wald.", ton: "gelb" };
    return { titel: "Perfektes Gassi-Wetter!", text: "Leine schnappen, die Hunde warten schon.", ton: "gruen" };
  }

  // Die nächsten Gassizeiten (Mi & Sa 14 Uhr) in der 5-Tage-Vorhersage suchen
  function naechsteGassizeiten(vorhersage) {
    if (!vorhersage || !Array.isArray(vorhersage.list)) return [];
    const jetzt = new Date();
    const termine = [];
    for (let i = 0; i < 8 && termine.length < 2; i++) {
      const tag = new Date(jetzt); tag.setDate(jetzt.getDate() + i); tag.setHours(14, 0, 0, 0);
      if ((tag.getDay() === 3 || tag.getDay() === 6) && tag > jetzt) termine.push(tag);
    }
    return termine.map((termin) => {
      const naechster = vorhersage.list.reduce((best, e) =>
        Math.abs(e.dt * 1000 - termin) < Math.abs(best.dt * 1000 - termin) ? e : best);
      const passt = Math.abs(naechster.dt * 1000 - termin) <= 2 * 3600 * 1000;
      return { termin, eintrag: passt ? naechster : null };
    });
  }

  function zeigeWetter(jetzt, vorhersage) {
    const id = jetzt.weather?.[0]?.id ?? 800;
    const temp = Math.round(jetzt.main?.temp ?? 0);
    const gefuehlt = Math.round(jetzt.main?.feels_like ?? temp);
    const windKmh = Math.round((jetzt.wind?.speed ?? 0) * 3.6); // m/s -> km/h
    const regenMm = jetzt.rain?.["1h"] ?? 0;
    const beschreibung = jetzt.weather?.[0]?.description ?? "";
    const urteil = gassiUrteil(id, temp, windKmh, regenMm);
    const tagFormat = { weekday: "short", day: "2-digit", month: "2-digit" };

    const termineHTML = naechsteGassizeiten(vorhersage).map(({ termin, eintrag }) => {
      const wann = termin.toLocaleDateString("de-DE", tagFormat) + ", 14 Uhr";
      if (!eintrag) return `<li><b>${wann}</b><span>Vorhersage kommt noch</span></li>`;
      const regen = Math.round((eintrag.pop ?? 0) * 100);
      return `<li><b>${wann}</b><span>${wetterSymbol(eintrag.weather[0].id)} ${Math.round(eintrag.main.temp)} °C · ${regen} % Regenrisiko</span></li>`;
    }).join("");

    wetterBox.innerHTML = `
      <div class="weather__now">
        <span class="weather__emoji" aria-hidden="true">${wetterSymbol(id)}</span>
        <p class="weather__temp">${temp}<span>°C</span></p>
        <p class="weather__desc">${beschreibung}</p>
        <ul class="weather__facts">
          <li>Gefühlt ${gefuehlt} °C</li>
          <li>Wind ${windKmh} km/h</li>
          <li>Regen ${regenMm > 0 ? regenMm.toLocaleString("de-DE") + " mm/h" : "keiner"}</li>
        </ul>
      </div>
      <div class="weather__verdict weather__verdict--${urteil.ton}">
        <p class="weather__verdict-title">${urteil.titel}</p>
        <p>${urteil.text}</p>
      </div>
      ${termineHTML ? `<div class="weather__next"><h4>Nächste Gassizeiten</h4><ul>${termineHTML}</ul></div>` : ""}`;
    if (wetterMeta) wetterMeta.textContent = "Abgefragt um " + new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " Uhr";
  }

  function zeigeWetterHinweis(art) {
    const texte = {
      "laedt": ["Frage beim Wetterdienst nach …", "Die Anfrage ist unterwegs."],
      "offline": ["Wetterdienst gerade nicht erreichbar", "Vielleicht ist das Internet weg. Schau solange aus dem Fenster und klick später auf „Neu laden“."]
    };
    const [titel, text] = texte[art] || texte.offline;
    wetterBox.innerHTML = `<div class="weather__msg weather__msg--${art}"><p class="weather__msg-title">${titel}</p><p>${text}</p></div>`;
    if (wetterMeta) wetterMeta.textContent = "";
  }

  $("#weatherReload")?.addEventListener("click", ladeWetter);
  ladeWetter();

  /* ======================================================================
     SCROLL-ANIMATIONEN + ZAHLEN HOCHZÄHLEN
     ====================================================================== */
  function countUp(el) {
    const target = Number(el.dataset.countTo);
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now(), dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const revealEls = $$("[data-reveal]");
  revealEls.forEach((el) => {
    const sibs = Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal"));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 90}ms`);
  });
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      $$("[data-count-to]", entry.target).forEach(countUp);
      io.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  updateFavUI();
});
