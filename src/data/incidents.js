import { liften } from './liften'
import { bevrijders } from './bevrijders'

let incidentCounter = 0

const scenarioTemplates = {
  A: {
    scenario: 'A',
    titel: 'Standaard opsluiting',
    beschrijving: 'Deurfout — cabinedeur vergrendeld',
    oorzaak: 'Deurfout (cabinedeur vergrendeld)',
    urgentie: 'standaard',
    passagiers: 1,
    medischRisico: false,
    communicatie: true,
    passagierStatus: 'Rustig, geen medisch risico',
    context: 'Kantoorgebouw, huismeester aanwezig',
    etaMin: 8,
    etaMax: 12,
    initialLog: [
      { actie: 'Melding ontvangen', detail: 'Noodtelefoon geactiveerd door passagier', type: 'default' },
      { actie: 'Contact met passagier', detail: '1 persoon, rustig, geen medisch risico', type: 'default' },
      { actie: 'Urgentie bepaald', detail: 'Standaard — deurfout, geen risicofactoren', type: 'default' },
      { actie: 'Bevrijder gealarmeerd', detail: 'Dichtstbijzijnde gecertificeerde bevrijder genotificeerd', type: 'dispatch' },
    ],
  },
  B: {
    scenario: 'B',
    titel: 'Opsluiting buiten kantooruren',
    beschrijving: 'Stroomuitval extern net — geen BHV beschikbaar',
    oorzaak: 'Stroomuitval extern net',
    urgentie: 'verhoogd',
    passagiers: 1,
    medischRisico: false,
    communicatie: true,
    passagierStatus: 'Profiel onbekend',
    context: 'VvE-complex, geen interne hulp beschikbaar',
    etaMin: 20,
    etaMax: 30,
    initialLog: [
      { actie: 'Melding ontvangen', detail: 'Noodtelefoon geactiveerd — buiten kantooruren', type: 'default' },
      { actie: 'Contact met passagier', detail: '1 persoon, profiel wordt beoordeeld', type: 'default' },
      { actie: 'BHV-check', detail: 'Geen BHV beschikbaar — buiten kantooruren', type: 'warning' },
      { actie: 'Urgentie verhoogd', detail: 'Verhoogd — geen lokale hulp, langere responstijd verwacht', type: 'warning' },
      { actie: 'Externe bevrijder gealarmeerd', detail: 'Dichtstbijzijnde bevrijder genotificeerd', type: 'dispatch' },
      { actie: '112 op standby', detail: 'Hulpdiensten geïnformeerd als achtervang', type: 'warning' },
    ],
  },
  C: {
    scenario: 'C',
    titel: 'Medisch kwetsbare passagier',
    beschrijving: 'Sensor defect — rolstoelgebruiker opgesloten',
    oorzaak: 'Sensor defect',
    urgentie: 'kritisch',
    passagiers: 1,
    medischRisico: true,
    communicatie: true,
    passagierStatus: 'Rolstoelgebruiker, hoog medisch risico',
    context: 'Woonzorgcentrum',
    etaMin: 8,
    etaMax: 10,
    initialLog: [
      { actie: 'Melding ontvangen', detail: 'Noodtelefoon geactiveerd vanuit woonzorgcentrum', type: 'default' },
      { actie: 'Contact met passagier', detail: 'Rolstoelgebruiker — medisch risico vastgesteld', type: 'critical' },
      { actie: 'Urgentie kritisch', detail: 'Hoog medisch risico — parallelle alarmering gestart', type: 'critical' },
      { actie: 'Bevrijder gealarmeerd', detail: 'Dichtstbijzijnde bevrijder met spoed genotificeerd', type: 'dispatch' },
      { actie: '112 gealarmeerd', detail: 'Parallelle alarmering hulpdiensten — medisch risico', type: 'critical' },
    ],
  },
  D: {
    scenario: 'D',
    titel: 'Geen communicatie mogelijk',
    beschrijving: 'Noodtelefoon defect + stroomstoring — sensor detectie',
    oorzaak: 'Noodtelefoon defect + stroomstoring',
    urgentie: 'kritisch',
    passagiers: 0,
    medischRisico: false,
    communicatie: false,
    passagierStatus: 'Onbekend — bewegingssensor detectie',
    context: 'Onbemande parkeergarage',
    etaMin: null,
    etaMax: null,
    initialLog: [
      { actie: 'Sensor trigger', detail: 'Bewegingssensor: >15 min stilstand gedetecteerd', type: 'warning' },
      { actie: 'Noodtelefoon check', detail: 'Noodtelefoon reageert niet — defect bevestigd', type: 'critical' },
      { actie: 'Onafhankelijke detectie actief', detail: 'Opsluiting vastgesteld via sensordata, geen spraakcontact', type: 'critical' },
      { actie: 'Urgentie kritisch', detail: 'Geen communicatie mogelijk — worst-case protocol', type: 'critical' },
      { actie: 'Escalatie 112', detail: 'Directe alarmering hulpdiensten — onbekende passagiersstatus', type: 'critical' },
      { actie: 'Bevrijder gealarmeerd', detail: 'Dichtstbijzijnde bevrijder met spoed genotificeerd', type: 'dispatch' },
    ],
  },
}

function getRandomLift(scenario) {
  const typeMap = {
    A: ['kantoor'],
    B: ['wooncomplex'],
    C: ['zorginstelling'],
    D: ['parkeergarage'],
  }
  const preferredTypes = typeMap[scenario] || []
  const preferred = liften.filter(l => preferredTypes.includes(l.type))
  const pool = preferred.length > 0 ? preferred : liften
  return pool[Math.floor(Math.random() * pool.length)]
}

function getAvailableBevrijder() {
  const beschikbaar = bevrijders.filter(b => b.status === 'beschikbaar')
  if (beschikbaar.length === 0) return bevrijders[0]
  return beschikbaar[Math.floor(Math.random() * beschikbaar.length)]
}

function formatTime(date) {
  return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function createIncident(scenarioKey) {
  const template = scenarioTemplates[scenarioKey]
  if (!template) return null

  incidentCounter++
  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
  const id = `INC-${dateStr}-${String(incidentCounter).padStart(3, '0')}`

  const lift = getRandomLift(scenarioKey)
  const bevrijder = getAvailableBevrijder()

  const eta = template.etaMin
    ? `${template.etaMin}–${template.etaMax} min`
    : 'Onbekend'

  const afstand = (Math.random() * 15 + 2).toFixed(1)

  const tijdlijn = template.initialLog.map((entry, i) => ({
    tijd: now.getTime() - (template.initialLog.length - i) * 8000,
    actie: entry.actie,
    detail: entry.detail,
    type: entry.type,
  }))

  return {
    id,
    scenario: template.scenario,
    titel: template.titel,
    beschrijving: template.beschrijving,
    oorzaak: template.oorzaak,
    urgentie: template.urgentie,
    passagiers: template.passagiers,
    medischRisico: template.medischRisico,
    communicatie: template.communicatie,
    passagierStatus: template.passagierStatus,
    context: template.context,
    eta,
    liftId: lift.id,
    adres: `${lift.adres}, ${lift.stad}`,
    gebouw: lift.gebouw,
    bevrijderId: bevrijder.id,
    bevrijderNaam: bevrijder.naam,
    bevrijderBedrijf: bevrijder.bedrijf,
    bevrijderCertificering: bevrijder.certificering,
    bevrijderAfstand: `${afstand} km`,
    bevrijderEta: eta,
    status: 'actief',
    aangemaakt: now.getTime(),
    opgelostOm: null,
    tijdlijn,
  }
}

export { scenarioTemplates }
