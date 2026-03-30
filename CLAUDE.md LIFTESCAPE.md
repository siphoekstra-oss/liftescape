# CLAUDE.md — Liftescape Projectkennisbestand

> Dit bestand dient als primaire kennisbasis voor Claude binnen het Liftescape Senior Project.
> Bijgewerkt: maart 2026 | Versie: 1.0

---

## 1. Kernpositioning

**Kernzin (VLR-pitch):**
> Liftescape is een onafhankelijk coördinatieplatform dat gecertificeerde bevrijders verbindt met liftopsluitingen in real-time, zodat de sector eindelijk de lange responstijden structureel kan oplossen zonder afhankelijk te zijn van de brandweer.

**Wat Liftescape NIET is:**
- Geen liftonderhoudsbedrijf
- Geen concurrent van KONE, Otis of andere onderhoudsbedrijven
- Geen brandweervervanging
- Geen consumentenproduct

**Wat Liftescape WEL is:**
- Een onafhankelijk, centraal coördinatieplatform voor liftbevrijdingen
- Een dispatchsysteem dat de dichtstbijzijnde gecertificeerde bevrijder (BRL K10006) koppelt aan een actieve opsluiting
- Een proceslog- en incidentmanagementsysteem dat zorgplichtdocumentatie borgt voor gebouweigenaren
- Een sectorstandaard in wording, ter validatie bij VLR

---

## 2. Projectcontext

| Veld | Waarde |
|---|---|
| Opleiding | International Business & Entrepreneurship, EuroCollege |
| Opdrachtgever | Harm, Elseco B.V. |
| Projectfase | Periode 2 — validatie en Go/No-Go |
| Harde deadline | Eind april 2026 |
| Primaire doelstelling | Go/No-Go beslissing vanuit de sector (VLR) |
| Voertaal deliverables | Nederlands |

**Definitie Go/No-Go:**
Als het concept te complex, niet werkbaar of onduidelijk wordt bevonden door sectorpartijen → No-Go, project stopt in huidige vorm. Het einddoel is een besluitrijp pakket dat VLR overtuigt van begrijpelijkheid, uitvoerbaarheid en schaalbaarheid.

---

## 3. Probleemanalyse

**Het kernprobleem:**
Te lange responstijden bij liftopsluitingen in Nederland.

**Onderbouwing met cijfers:**
- Jaarlijks raken ca. 49.000 mensen opgesloten in een lift in Nederland (Liftinstituut)
- 1 op de 5 Nederlanders heeft dit ooit meegemaakt
- Gemiddelde wachttijd voor monteur: bijna 60 minuten
- Landelijk gemiddelde storingsoplossing: 91 minuten
- Gemiddelde behandeltijd opsluiting: 32 minuten (onderscheid is procesrelevant)
- De brandweer wordt te vaak ingezet als fallback, terwijl dit niet hun primaire taak is (NOS, 2025)

**Structurele oorzaken:**
- De sector is gefragmenteerd: ca. 70 onderhoudsbedrijven, geen centrale coördinatie
- Bevrijders zijn gekoppeld aan hun eigen onderhoudsbedrijf — geen sectorbreed netwerk
- Noodtelefoon (POTS/GSM) is de enige trigger in de meeste systemen — bij defect: blinde vlek
- BHV-gecertificeerde bevrijders op locatie zijn een onhoudbare aanname voor VvE's en onbemande gebouwen
- Personeelstekort vergroot de responstijdproblematiek structureel

**Juridische driver:**
Gebouweigenaren hebben een zorgplicht (Burgerlijk Wetboek + Arbowet). Liftescape fungeert als aantoonbaar registratie-instrument ter documentatie van die zorgplicht.

---

## 4. Het Platform — Functionele beschrijving

**Kernfuncties:**
1. **Alarmdetectie** — ontvangst van melding via noodtelefoon of onafhankelijke sensor (beweging/aanwezigheid als fallback bij noodtelefoondefect)
2. **Urgentiebepaling** — classificatie op basis van oorzaak, passagiersstatus en gebouwcontext; vereist verplicht menselijk contactmoment vóór definitieve classificatie
3. **Dispatch** — automatische koppeling aan dichtstbijzijnde beschikbare gecertificeerde bevrijder (BRL K10006)
4. **Proceslog** — real-time tijdregistratie van alle acties, als juridisch bewijs van zorgplichtnaleving
5. **Escalatie** — geautomatiseerde parallel-alarmering van 112 bij kritische scenario's
6. **Communicatie** — continue verbale verbinding met passagier om zelfbevrijdingspogingen te voorkomen

**Wat het platform NIET doet:**
- Stuurt niet op onderhoud of storingsoplossing
- Vervangt geen monteur of onderhoudsbedrijf
- Neemt geen aansprakelijkheid over van gebouweigenaar

---

## 5. Scenariodefinitie (procesrelevant)

Liftescape moet alle zes onderstaande scenario's structureel kunnen afhandelen.

| Scenario | Oorzaak | Context | Passagier | Urgentie |
|---|---|---|---|---|
| **A** — Standaard, intern oplosbaar | Deurfout / technische storing | Gebouw met huismeester of BHV | Rustig, geen medisch risico | Standaard |
| **B** — Buiten kantooruren, geen hulp | Stroomuitval / sensor | Kantoor of VvE na sluitingstijd | Wisselend profiel | Verhoogd |
| **C** — Medisch kwetsbaar | Elke oorzaak | Zorginstelling of wooncomplex | Rolstoelgebruiker / kind / paniek | Hoog |
| **D** — Geen communicatie (blinde vlek) | Noodtelefoon defect + stroom | Onbemand gebouw / parkeergarage | Onbekend — sensor detectie | Kritisch |
| **E** — Calamiteit in gebouw | Brand / externe calamiteit | Lift naar begane grond automatisch | Potentieel kwetsbaar | Kritisch |
| **F** — Zelfbevrijdingspoging | Lange wachttijd / communicatiestilte | Elke context | Gefrustreerd / in paniek | Verhoogd |

**Kritische proceslacunes (geïdentificeerd):**

1. **Noodtelefoondefect als blinde vlek** — als de noodknop de enige trigger is, valt een passagier buiten detectiebereik bij defect. Liftescape vereist een onafhankelijk detectiemechanisme (bewegingssensor, tijdsgebaseerde alarmlogica).
2. **Urgentiebepaling vereist menselijk contactmoment** — algoritme alleen is onvoldoende; communicatie met passagier is verplichte stap vóór classificatie.
3. **Buiten kantoortijden is structureel anders** — aanwezige BHV is een onhoudbare aanname voor VvE's en onbemande gebouwen; remote monitoring wordt dan de enige pijler.
4. **Wettelijke aansprakelijkheid is een procesdriver** — eigenaar is verantwoordelijk voor veiligheid van liftinstallatie én gebruiker; Liftescape's registratiefunctie is juridisch relevant, niet optioneel.

---

## 6. Verdienmodel

**Primaire keuze: hybride asset-based model**

Kern: vast maandabonnement **per lift per maand** als primaire value-metric.

**Onderbouwing keuze:**
- Waarde van het systeem ontstaat op assetniveau (veiligheid, respons, logging), niet per gebruiker
- Sluit aan bij sectorpraktijk: Ascend Alert (2024) hanteert vaste prijs per lift per maand; Safeline via Userbase.be (2015) rekent €75/jaar per lift
- Vergelijkingsreferentie: POTS-lijnen kosten $60–120/maand per lijn; vervangende diensten $44/maand (Destra, 2025)

**Structuur:**

| Laag | Inhoud |
|---|---|
| **Basis** | Alarmdetectie, dispatch, proceslog, standaard rapportage |
| **Pro** | Uitgebreide analytics, SLA-garanties, integraties (Teams/Slack) |
| **Enterprise** | Multi-site, maatwerk, uitgebreide governance, hoge SLA |

**Bewust UITGESLOTEN modellen (met rationale):**

| Model | Reden uitsluiting |
|---|---|
| Seat-based pricing | Waarde ontstaat per lift, niet per gebruiker |
| Usage-based op incidenten | Creëert perverse prikkel: minder melden = lagere kosten; haaks op veiligheidsfunctie |
| Pay-per-interventie als basismodel | Financiële drempel per incident ondermijnt meldbereidheid |

**Aanvullende inkomstenstromen:**
- PaaS-component: beperkte activatiefee per lift + maandelijks bedrag inclusief hardware, connectiviteit, updates
- Optionele upsell: uitgebreide dataretentie, AI-analyses, bulk-exports (uitsluitend niet-kritische extra's)
- Implementatie en migratie (POTS → 4G/VoIP)
- Interventies in principe opgenomen in abonnement, met transparant plafond voor uitzonderlijke gevallen

**Prijsniveau: nog niet vastgesteld** — marktreferenties beschikbaar, maar concrete tarieven vereisen verdere validatie.

**Intern vastgestelde streefwaarde ROI: 15%**

---

## 7. Stakeholderanalyse

**Primaire adoptiepartner: VLR (Vereniging Liften en Roltrappen)**
VLR moet als eerste ja zeggen. Zij zijn de sectorstandaard-eigenaar. Zonder VLR-draagvlak geen sectoradoptie.

**Stakeholderoverzicht:**

| Stakeholder | Rol | Belang | Aandachtspunt |
|---|---|---|---|
| **VLR** | Sectorstandaard-eigenaar | Hoog | Wil sectorlogica zien, geen academisch concept |
| **Liftinstituut** | Certificerende instantie | Hoog | BRL K10006 is de certificeringsgrond voor bevrijders |
| **KONE / Otis / grote bedrijven** | Onderhoud + potentieel bevrijdersnetwerk | Hoog | Willen controle behouden; zien Liftescape mogelijk als bedreiging |
| **Kleine onafhankelijke bedrijven** | Potentiële partners / bevrijders | Middel | Meer open voor samenwerking dan grote spelers |
| **Gebouweigenaren / VvE's** | Betalende klant | Hoog | Willen ontzorging en zorgplichtdocumentatie |
| **Brandweer** | Fallback / escalatiepartner | Middel | Worden ontlast door Liftescape; potentieel voorstander |
| **Harm / Elseco B.V.** | Opdrachtgever | Hoog | Eindverantwoordelijk voor Go/No-Go richting EuroCollege |

**Aanbevolen stakeholderaanpak:**
Power/Interest Grid als initieel overzicht → Salience Model voor regulerende en urgente stakeholders (ILT, Liftinstituut) → levend Stakeholder Register gedurende het project.

---

## 8. Kritische risico's en blokkades

| Risico | Ernst | Status |
|---|---|---|
| Te weinig gecertificeerde bevrijders (BRL K10006) in netwerk | Hoog | Onopgelost — bevrijdersnetwerk bestaat nog niet |
| Onderhoudsbedrijven willen controle houden | Hoog | Onopgelost — adoptiestrategie vereist aanpak |
| VLR-pitch niet gevalideerd door sector | Hoog | Gepland — deadline eind april 2026 |
| Verdienmodel prijzen niet vastgesteld | Middel | Marktreferenties aanwezig, tarieven open |
| Procesflow heeft nog edge cases die ontbreken | Middel | Deels uitgewerkt, completering nodig |
| Aansprakelijkheidsstructuur juridisch onduidelijk | Hoog | Flagged als structureel risico |

**Vragen die VLR hoogstwaarschijnlijk zal stellen:**
1. Wie is aansprakelijk als de bevrijder te laat is?
2. Hoe borgen jullie dat alleen gecertificeerde bevrijders (BRL K10006) worden ingezet?
3. Hoe gaan onderhoudsbedrijven meewerken als dit hun klantrelatie raakt?
4. Wat doen jullie als er geen bevrijder beschikbaar is?
5. Hoe verschilt dit van wat wij (VLR) zelf al doen of plannen?

---

## 9. Opgeleverde deliverables

| Deliverable | Status | Formaat |
|---|---|---|
| Interactief dispatch dashboard | ✅ Opgeleverd | Standalone HTML/JS (`liftescape_dispatch_dashboard.html`) |
| PowerPoint pitch (10 slides, NL) | ✅ Opgeleverd | pptxgenjs, speaker notes in gesproken Nederlands |
| Academisch verdienmodel document | ✅ Opgeleverd | `.docx` via Node.js, APA-7, 10 secties |
| Stakeholderanalyse | ✅ Opgeleverd | Onderdeel `onderzoekresultaat_LE.docx` |
| Scenariodefinitie liftbevrijding | ✅ Opgeleverd | Onderdeel `onderzoekresultaat_LE.docx` |
| Procesflow (ISO-conform) | ⚠️ Deels opgeleverd | Edge cases ontbreken nog |
| Lovable UI demo prompt | ✅ Opgeleverd | Gedetailleerde prompt voor Lovable platform |
| VLR-pitch gevalideerd door sector | ❌ Nog niet | Gepland voor week 4 |

---

## 10. Visuele identiteit

**Primaire stijl (Lovable demo / pitchmaterialen):**
- Achtergrond: near-black `#0A0A0A`
- Accent: antique gold `#C9A84C`
- Esthetiek: Bloomberg Terminal meets modern SaaS
- Logo: tekst-gebaseerd "LE" lettermark
- Taal: altijd Nederlands

**Dispatch dashboard (HTML prototype):**
- Achtergrond: warm off-white `#F8F7F4`
- Primair blauw: `#0C447C`
- Sidebar: `#F1EFE8`
- Status-kleuren: rood `#E24B4A`, amber `#EF9F27`, groen `#639922`, blauw `#378ADD`
- Typografie: system font stack (-apple-system, BlinkMacSystemFont, Segoe UI)

---

## 11. Technische stack deliverables

| Tool | Gebruik |
|---|---|
| Standalone HTML/JS | Dispatch dashboard prototype (pitchtool VLR) |
| pptxgenjs | PowerPoint generatie via code |
| docx (Node.js) | `.docx` documentgeneratie |
| Lovable | AI app-building platform voor UI demo |

---

## 12. Domeinterminologie (verplicht correct gebruiken)

| Term | Betekenis |
|---|---|
| Bevrijder | Gecertificeerde professional die liftopsluiting oplost |
| BRL K10006 | Nederlandse certificeringsrichtlijn voor liftbevrijders |
| Liftopsluiting / liftbevrijding | Incident waarbij persoon in lift vastzit |
| Noodtelefoon | Verplichte spreek-luisterverbinding in lift (POTS of 4G/VoIP) |
| POTS | Plain Old Telephone System — verouderde telefoonlijn in liften |
| Urgentiebepaling | Classificatie van ernst van opsluiting vóór dispatch |
| Proceslog | Tijdgestempelde registratie van alle processtappen per incident |
| Dispatching | Toewijzen van bevrijder aan actieve melding |
| VLR | Vereniging Liften en Roltrappen — brancheorganisatie |
| Liftinstituut | Onafhankelijk keuringsinstituut voor liften in Nederland |
| BHV | Bedrijfshulpverlening — interne noodhulp in gebouwen |
| VvE | Vereniging van Eigenaren — relevant als gebouwbeheerder |

---

## 13. Werkprincipes en output-standaard

**Framingregels:**
- Interne beslissingen worden gepresenteerd als vastgestelde keuzes, niet als aannames ("intern vastgestelde streefwaarde", niet "we gaan ervan uit dat")
- Geen gehedgde taal in deliverables richting opdrachtgever of sector
- Sectorlogica gaat altijd boven theoretische modellen: vraag altijd "zou KONE / VLR dit accepteren?"

**Outputstandaard:**
- Altijd professioneel Nederlands in klantgerichte documenten
- Geen bullet-point-dump; lopende tekst met heldere structuur
- Geschikt om direct in rapport te plakken
- Geen herhaling, geen opvulling

**Drie zelftestsvragen voor elk idee:**
1. Is dit praktisch uitvoerbaar?
2. Is dit logisch binnen de liftensector?
3. Is dit simpel genoeg om geaccepteerd te worden?

Zo niet → herschrijven.

---

## 14. Sleutelreferenties

- Liftinstituut (2024) — cijfers liftopsluitingen Nederland
- VLR (2024) — training medewerkers en certificering bevrijders
- LiftAcademy — opleiding liftbevrijding BRL K10006
- Ascend Alert (2024) — asset-based prijsmodel referentie
- Business Model Lab (2025) — PaaS-modelstructuur
- Wille, B. (2010) — verdienmodellen software, Universiteit Twente
- NOS (2025) — brandweer te vaak ingezet bij liftopsluitingen
- KONE Nederland — technische informatie brandweerliften
- Horden & Vandenbemd (2017) — SIPOC-methodologie (intern WEMO-rapport)

---

*Einde CLAUDE.md v1.0 — bij projectwijzigingen dit bestand updaten.*
