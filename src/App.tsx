import { useState, useRef, useCallback, useEffect, type ReactNode, type CSSProperties, type FormEvent } from "react";

// ─── PROPERTY ILLUSTRATIONS ──────────────────────────
const PropertyImage1 = () => (
  <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><defs><linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FDEBD0"/><stop offset="100%" stopColor="#FAD7A0"/></linearGradient><linearGradient id="floor1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#C8A87A"/><stop offset="100%" stopColor="#A0785A"/></linearGradient></defs><rect width="400" height="280" fill="#F5ECD7"/>{[0,1,2,3,4,5,6,7].map(row => [0,1,2,3,4,5,6,7,8,9].map(col => (<rect key={`${row}-${col}`} x={col*44 + (row%2)*22} y={row*22} width="40" height="18" rx="1" fill={row<6 ? (col%3===0?"#C1876B":col%3===1?"#B87355":"#C9926E") : "none"} opacity="0.7"/>)))}<rect x="0" y="210" width="400" height="70" fill="url(#floor1)"/>{[220,230,240,250,260,270].map(y=>(<line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#8B6344" strokeWidth="0.5" opacity="0.4"/>))}<rect x="50" y="30" width="140" height="160" rx="4" fill="#AED6F1" opacity="0.7"/><rect x="50" y="30" width="140" height="160" rx="4" fill="none" stroke="#8B6344" strokeWidth="6"/><line x1="120" y1="30" x2="120" y2="190" stroke="#8B6344" strokeWidth="4"/><line x1="50" y1="110" x2="190" y2="110" stroke="#8B6344" strokeWidth="4"/><rect x="55" y="120" width="25" height="65" fill="#5D8AA8" opacity="0.5"/><rect x="85" y="95" width="20" height="90" fill="#4A7A96" opacity="0.5"/><rect x="110" y="115" width="18" height="70" fill="#5D8AA8" opacity="0.5"/><rect x="133" y="100" width="22" height="85" fill="#4A7A96" opacity="0.5"/><rect x="158" y="125" width="28" height="60" fill="#5D8AA8" opacity="0.5"/><rect x="200" y="160" width="180" height="55" rx="8" fill="#8D6E63"/><rect x="200" y="145" width="180" height="25" rx="6" fill="#9E7B70"/><rect x="200" y="155" width="20" height="60" rx="4" fill="#7B5B52"/><rect x="360" y="155" width="20" height="60" rx="4" fill="#7B5B52"/><rect x="215" y="148" width="45" height="30" rx="8" fill="#E8572A" opacity="0.9"/><rect x="270" y="148" width="45" height="30" rx="8" fill="#F5CBA7" opacity="0.9"/><rect x="325" y="148" width="45" height="30" rx="8" fill="#E8572A" opacity="0.7"/><line x1="320" y1="0" x2="320" y2="70" stroke="#5D4037" strokeWidth="3"/><path d="M300 70 Q320 85 340 70" fill="#5D4037"/><circle cx="320" cy="75" r="8" fill="#FFF9C4" opacity="0.9"/><rect x="355" y="180" width="12" height="20" rx="2" fill="#8D6E63"/><ellipse cx="361" cy="175" rx="15" ry="20" fill="#2E7D32" opacity="0.8"/><ellipse cx="350" cy="170" rx="10" ry="14" fill="#388E3C" opacity="0.8"/><ellipse cx="372" cy="172" rx="10" ry="12" fill="#43A047" opacity="0.7"/></svg>
);
const PropertyImage2 = () => (
  <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#85C1E9"/><stop offset="100%" stopColor="#AED6F1"/></linearGradient><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5DADE2"/><stop offset="100%" stopColor="#2E86C1"/></linearGradient></defs><rect width="400" height="280" fill="url(#sky2)"/><ellipse cx="80" cy="40" rx="40" ry="18" fill="white" opacity="0.8"/><ellipse cx="110" cy="35" rx="30" ry="22" fill="white" opacity="0.8"/><ellipse cx="50" cy="45" rx="25" ry="15" fill="white" opacity="0.8"/><ellipse cx="300" cy="55" rx="35" ry="16" fill="white" opacity="0.7"/><ellipse cx="330" cy="50" rx="25" ry="19" fill="white" opacity="0.7"/><rect x="0" y="220" width="400" height="60" fill="url(#water)"/>{[0,1,2,3,4,5].map(i=>(<line key={i} x1={30+i*60} y1={230+i*4} x2={70+i*60} y2={230+i*4} stroke="white" strokeWidth="1.5" opacity="0.3"/>))}<rect x="0" y="140" width="60" height="80" fill="#BDC3C7"/><rect x="10" y="120" width="40" height="100" fill="#95A5A6"/><rect x="70" y="100" width="50" height="120" fill="#BDC3C7"/><rect x="130" y="80" width="55" height="140" fill="#95A5A6"/><rect x="190" y="110" width="45" height="110" fill="#BDC3C7"/><rect x="245" y="90" width="60" height="130" fill="#95A5A6"/><rect x="310" y="120" width="50" height="100" fill="#BDC3C7"/><rect x="360" y="105" width="40" height="115" fill="#95A5A6"/>{[145,165,185].map(y=>[75,90,105,115].map(x=>(<rect key={`${x}-${y}`} x={x} y={y} width="8" height="10" fill="#F9E79F" opacity="0.7"/>)))}<rect x="0" y="200" width="400" height="20" fill="#D5D8DC"/><rect x="0" y="195" width="400" height="5" fill="#AEB6BF"/>{[20,50,80,110,140,170,200,230,260,290,320,350,380].map(x=>(<rect key={x} x={x} y="170" width="3" height="25" fill="#AEB6BF"/>))}<rect x="30" y="175" width="80" height="22" rx="5" fill="#E8572A" opacity="0.9"/><rect x="30" y="162" width="80" height="18" rx="5" fill="#C0392B" opacity="0.9" transform="rotate(-15,70,171)"/><rect x="140" y="175" width="80" height="22" rx="5" fill="#E8572A" opacity="0.9"/><rect x="140" y="162" width="80" height="18" rx="5" fill="#C0392B" opacity="0.9" transform="rotate(-15,180,171)"/><rect x="110" y="178" width="25" height="18" rx="3" fill="#F0F3F4"/><ellipse cx="122" cy="178" rx="10" ry="4" fill="#D5D8DC"/><rect x="118" y="168" width="8" height="12" rx="2" fill="#85C1E9" opacity="0.8"/><rect x="270" y="180" width="18" height="16" rx="2" fill="#A04000" opacity="0.8"/><ellipse cx="279" cy="175" rx="18" ry="22" fill="#27AE60" opacity="0.8"/><ellipse cx="266" cy="172" rx="12" ry="16" fill="#2ECC71" opacity="0.7"/></svg>
);
const PropertyImage3 = () => (
  <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}><defs><linearGradient id="wall3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FAF0E6"/><stop offset="100%" stopColor="#F5DEB3"/></linearGradient></defs><rect width="400" height="280" fill="url(#wall3)"/>{[0,1,2,3,4,5,6,7].map(row=>[0,1,2,3,4,5,6,7,8,9].map(col=>(<rect key={`${row}-${col}`} x={col*44} y={180+row*20} width="42" height="18" rx="1" fill={col%2===0?"#C0784A":"#B5693F"} opacity="0.85"/>)))}<rect x="150" y="40" width="100" height="150" fill="#D4A574" opacity="0.3"/><path d="M150 130 Q200 40 250 130" fill="#D4A574" opacity="0.4"/><rect x="155" y="130" width="90" height="60" fill="#8B6914" opacity="0.15"/><path d="M150 135 Q200 42 250 135" fill="none" stroke="#8B6914" strokeWidth="8"/><rect x="150" y="135" width="100" height="55" fill="none" stroke="#8B6914" strokeWidth="8"/><rect x="158" y="138" width="84" height="50" fill="#87CEEB" opacity="0.4"/><ellipse cx="200" cy="165" rx="25" ry="30" fill="#2E7D32" opacity="0.6"/><ellipse cx="185" cy="155" rx="15" ry="20" fill="#388E3C" opacity="0.6"/><rect x="20" y="170" width="110" height="12" rx="4" fill="#8B4513"/><rect x="25" y="182" width="10" height="25" rx="2" fill="#6B3410"/><rect x="115" y="182" width="10" height="25" rx="2" fill="#6B3410"/><rect x="50" y="182" width="10" height="25" rx="2" fill="#6B3410"/><rect x="90" y="182" width="10" height="25" rx="2" fill="#6B3410"/><rect x="300" y="162" width="60" height="10" rx="3" fill="#8B4513"/><rect x="300" y="172" width="60" height="30" rx="3" fill="#A0522D"/><rect x="302" y="202" width="8" height="20" rx="2" fill="#8B4513"/><rect x="350" y="202" width="8" height="20" rx="2" fill="#8B4513"/><rect x="330" y="0" width="4" height="85" fill="#8B4513"/><path d="M310 85 Q332 105 354 85 Z" fill="#DEB887" stroke="#8B4513" strokeWidth="2"/><ellipse cx="332" cy="85" rx="22" ry="6" fill="#DEB887" stroke="#8B4513" strokeWidth="2"/>{[0,1,2,3,4].map(i=>(<rect key={i} x={22+i*12} y={155} width="10" height="16" rx="1" fill={["#E8572A","#27AE60","#2980B9","#8E44AD","#F39C12"][i]} opacity="0.9"/>))}<line x1="60" y1="0" x2="60" y2="35" stroke="#8B4513" strokeWidth="2"/><ellipse cx="60" cy="42" rx="20" ry="16" fill="#27AE60" opacity="0.8"/><line x1="350" y1="0" x2="350" y2="30" stroke="#8B4513" strokeWidth="2"/><ellipse cx="350" cy="38" rx="18" ry="14" fill="#2ECC71" opacity="0.7"/></svg>
);
const SCENE_COMPONENTS = [PropertyImage1, PropertyImage2, PropertyImage3];
const PROPERTY_IMAGE_COUNT = 10;

function propertyImagePath(property: Pick<PropertyListing, "id" | "image">): string {
  if (property.image) return property.image;
  const index = ((Math.abs(property.id) - 1) % PROPERTY_IMAGE_COUNT) + 1;
  return `/properties/prop-${index}.png`;
}

function PropertyPhoto({ property }: { property: PropertyListing }) {
  const [useFallback, setUseFallback] = useState(false);
  const Scene = SCENE_COMPONENTS[property.sceneIndex % SCENE_COMPONENTS.length];
  if (useFallback) return <Scene />;
  return (
    <img
      src={propertyImagePath(property)}
      alt={property.title}
      onError={() => setUseFallback(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const AI_QUESTIONS = [{ key: "mascotas", label: "¿Se aceptan mascotas? 🐾" }, { key: "barrio", label: "¿Cómo es el barrio? 🏘️" }, { key: "expensas", label: "¿Cuánto son las expensas? 💰" }];
const OWNER_NAME = "Inmobiliaria Muvit";

type CityOption = { id: string; name: string; flag: string; locationSuffix: string };

const CITIES: CityOption[] = [
  { id: "buenos-aires", name: "Buenos Aires", flag: "🇦🇷", locationSuffix: "CABA" },
  { id: "cordoba", name: "Córdoba", flag: "🇦🇷", locationSuffix: "Córdoba" },
  { id: "rosario", name: "Rosario", flag: "🇦🇷", locationSuffix: "Santa Fe" },
  { id: "mendoza", name: "Mendoza", flag: "🇦🇷", locationSuffix: "Mendoza" },
];

type PropertyListing = {
  id: number;
  cityId: string;
  title: string;
  price: string;
  location: string;
  barrio: string;
  mapLat: number;
  mapLng: number;
  rooms: number;
  baths: number;
  sqm: number;
  sceneIndex: number;
  image?: string;
  ownerName: string;
  tags: string[];
  description: string;
  amenities: string[];
  aiAnswers: Record<string, string>;
};

const BARRIO_COORDS: Record<string, { lat: number; lng: number }> = {
  Palermo: { lat: -34.5889, lng: -58.4256 },
  "Puerto Madero": { lat: -34.6118, lng: -58.3632 },
  "San Telmo": { lat: -34.6212, lng: -58.3731 },
  Recoleta: { lat: -34.5884, lng: -58.3926 },
  Belgrano: { lat: -34.5627, lng: -58.4584 },
  "Nueva Córdoba": { lat: -31.4241, lng: -64.1902 },
  Güemes: { lat: -31.4178, lng: -64.1835 },
  Centro: { lat: -32.9468, lng: -60.6393 },
  Fisherton: { lat: -32.9595, lng: -60.6932 },
  "Ciudad de Mendoza": { lat: -32.8908, lng: -68.8272 },
  "Chacras de Coria": { lat: -32.9995, lng: -68.8718 },
};

function coordsForBarrio(barrio: string) {
  return BARRIO_COORDS[barrio] ?? { lat: -34.6037, lng: -58.3816 };
}

const INITIAL_OWNER_CREDITS = 99;
const GLOBAL_REQUESTS_STORAGE_KEY = "muvit-global-requests";
const SELECTED_CITY_STORAGE_KEY = "muvit-selected-city";

function loadSelectedCity(): string {
  try {
    const raw = localStorage.getItem(SELECTED_CITY_STORAGE_KEY);
    if (raw && CITIES.some(c => c.id === raw)) return raw;
  } catch { /* ignore */ }
  return CITIES[0].id;
}

function loadStoredRequests(): any[] {
  try {
    const raw = localStorage.getItem(GLOBAL_REQUESTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

type TenantProfile = {
  name: string;
  income: string;
  guarantee: string;
  hasPets: boolean;
  petsDetail: string;
  origin: string;
  age: string;
  occupants: string;
  job: string;
};

const DEFAULT_TENANT_PROFILE: TenantProfile = {
  name: "Juan Pérez",
  income: "1500000",
  guarantee: "Recibo de Sueldo",
  hasPets: false,
  petsDetail: "Sin mascotas",
  origin: "CABA, Argentina",
  age: "28",
  occupants: "1",
  job: "Empleado en relación de dependencia",
};

function listingCoords(barrio: string) {
  const c = coordsForBarrio(barrio);
  return { mapLat: c.lat, mapLng: c.lng };
}

const INITIAL_LISTINGS: PropertyListing[] = [
  { id: 1, cityId: "buenos-aires", title: "Loft Industrial Soho", price: "$1.850/mes", location: "Palermo Soho, CABA", barrio: "Palermo", ...listingCoords("Palermo"), rooms: 2, baths: 1, sqm: 75, sceneIndex: 0, ownerName: OWNER_NAME, tags: ["Luminoso", "Piso alto", "Expensas incl."], description: "Espectacular loft de estilo industrial en el corazón de Palermo.", amenities: ["Wi-Fi incluido", "Aire acondicionado"], aiAnswers: { mascotas: "¡Sí se aceptan!", barrio: "Palermo Soho es muy seguro.", expensas: "Están incluidas." } },
  { id: 2, cityId: "buenos-aires", title: "Penthouse con Terraza", price: "$3.200/mes", location: "Puerto Madero, CABA", barrio: "Puerto Madero", ...listingCoords("Puerto Madero"), rooms: 3, baths: 2, sqm: 140, sceneIndex: 1, ownerName: OWNER_NAME, tags: ["Terraza propia", "Vista al río"], description: "El penthouse más exclusivo de Puerto Madero.", amenities: ["Piscina", "Gimnasio"], aiAnswers: { mascotas: "No se aceptan.", barrio: "Zona exclusiva.", expensas: "$180.000/mes." } },
  { id: 3, cityId: "buenos-aires", title: "Departamento Vintage", price: "$1.100/mes", location: "San Telmo, CABA", barrio: "San Telmo", ...listingCoords("San Telmo"), rooms: 1, baths: 1, sqm: 48, sceneIndex: 2, ownerName: OWNER_NAME, tags: ["Patio compartido", "Amoblado"], description: "Edificio histórico de San Telmo.", amenities: ["Amoblado completo", "Wi-Fi"], aiAnswers: { mascotas: "Solo gatos.", barrio: "Barrio bohemio.", expensas: "$45.000/mes." } },
  { id: 4, cityId: "cordoba", title: "Depto Estudiantil Nueva Córdoba", price: "$950/mes", location: "Nueva Córdoba, Córdoba", barrio: "Nueva Córdoba", ...listingCoords("Nueva Córdoba"), rooms: 1, baths: 1, sqm: 42, sceneIndex: 0, ownerName: OWNER_NAME, tags: ["Cerca de facultades", "Luminoso"], description: "Ideal para estudiantes, a dos cuadras de la UNC.", amenities: ["Wi-Fi incluido", "Balcón"], aiAnswers: { mascotas: "Consultar.", barrio: "Zona universitaria muy activa.", expensas: "$38.000/mes." } },
  { id: 5, cityId: "cordoba", title: "Casa con Patio Güemes", price: "$1.400/mes", location: "Barrio Güemes, Córdoba", barrio: "Güemes", ...listingCoords("Güemes"), rooms: 2, baths: 1, sqm: 68, sceneIndex: 1, ownerName: OWNER_NAME, tags: ["Patio", "Zona gastronómica"], description: "Casa reciclada en el corazón de Güemes.", amenities: ["Patio compartido", "Cocina equipada"], aiAnswers: { mascotas: "Se aceptan mascotas pequeñas.", barrio: "Güemes es cultural y seguro.", expensas: "Sin expensas." } },
  { id: 6, cityId: "rosario", title: "Monoambiente Centro", price: "$780/mes", location: "Centro, Rosario", barrio: "Centro", ...listingCoords("Centro"), rooms: 1, baths: 1, sqm: 35, sceneIndex: 2, ownerName: OWNER_NAME, tags: ["A estrenar", "Balcón"], description: "Monoambiente moderno sobre el centro de Rosario.", amenities: ["Wi-Fi", "Aire acondicionado"], aiAnswers: { mascotas: "No se aceptan.", barrio: "Centro céntrico y bien conectado.", expensas: "$32.000/mes." } },
  { id: 7, cityId: "rosario", title: "Casa Familiar Fisherton", price: "$1.650/mes", location: "Fisherton, Rosario", barrio: "Fisherton", ...listingCoords("Fisherton"), rooms: 3, baths: 2, sqm: 110, sceneIndex: 0, ownerName: OWNER_NAME, tags: ["Garage", "Jardín"], description: "Casa amplia en barrio residencial.", amenities: ["Garage doble", "Parrilla"], aiAnswers: { mascotas: "¡Sí, con patio!", barrio: "Fisherton es tranquilo y familiar.", expensas: "Sin expensas." } },
  { id: 8, cityId: "mendoza", title: "PH Ciudad de Mendoza", price: "$920/mes", location: "Ciudad, Mendoza", barrio: "Ciudad de Mendoza", ...listingCoords("Ciudad de Mendoza"), rooms: 2, baths: 1, sqm: 58, sceneIndex: 1, ownerName: OWNER_NAME, tags: ["Luminoso", "Cerca del centro"], description: "PH cómodo a pocas cuadras de la peatonal.", amenities: ["Wi-Fi incluido", "Calefacción central"], aiAnswers: { mascotas: "Solo gatos.", barrio: "Zona céntrica de Mendoza.", expensas: "$40.000/mes." } },
  { id: 9, cityId: "mendoza", title: "Casa Chacras de Coria", price: "$2.100/mes", location: "Chacras de Coria, Mendoza", barrio: "Chacras de Coria", ...listingCoords("Chacras de Coria"), rooms: 3, baths: 2, sqm: 130, sceneIndex: 2, ownerName: OWNER_NAME, tags: ["Viñedos", "Piscina"], description: "Casa con vista a la cordillera en zona wine.", amenities: ["Piscina", "Quincho"], aiAnswers: { mascotas: "Se aceptan.", barrio: "Chacras es exclusivo y verde.", expensas: "Sin expensas." } },
];

type CalendarSlot = { id: string; time: string; available: boolean };
type CalendarDay = { dateKey: string; label: string; slots: CalendarSlot[] };

const INITIAL_CALENDAR_DAYS: CalendarDay[] = [
  { dateKey: "dia-1", label: "Mañana", slots: [
    { id: "d1-10", time: "10:00 hs", available: true },
    { id: "d1-15", time: "15:30 hs", available: true },
    { id: "d1-18", time: "18:00 hs", available: false },
  ]},
  { dateKey: "dia-2", label: "Jueves", slots: [
    { id: "d2-11", time: "11:00 hs", available: true },
    { id: "d2-14", time: "14:00 hs", available: false },
    { id: "d2-17", time: "17:00 hs", available: true },
  ]},
  { dateKey: "dia-3", label: "Viernes", slots: [
    { id: "d3-10", time: "10:00 hs", available: true },
    { id: "d3-12", time: "12:00 hs", available: true },
    { id: "d3-17", time: "17:00 hs", available: true },
  ]},
];

function getAvailableSlotLabels(days: CalendarDay[]): string[] {
  return days.flatMap(day => day.slots.filter(s => s.available).map(s => `${day.label}, ${s.time}`));
}

function findSlotByLabel(days: CalendarDay[], label: string): { dateKey: string; slotId: string } | null {
  const comma = label.indexOf(", ");
  if (comma === -1) return null;
  const dayLabel = label.slice(0, comma);
  const timePart = label.slice(comma + 2);
  const day = days.find(d => d.label === dayLabel);
  const slot = day?.slots.find(s => s.time === timePart);
  return day && slot ? { dateKey: day.dateKey, slotId: slot.id } : null;
}

function formatIncome(value: string) {
  const n = Number(value.replace(/\D/g, ""));
  return n ? `$${n.toLocaleString("es-AR")}` : "—";
}

function buildRequestFromProfile(prop: PropertyListing, profile: TenantProfile, verified: boolean, isSuperlike = false) {
  return {
    id: Date.now(),
    propId: prop.id,
    propTitle: prop.title,
    propLocation: prop.location,
    time: null as string | null,
    status: "pending",
    isSuperlike,
    tenantName: profile.name,
    tenantIncome: formatIncome(profile.income),
    tenantPets: profile.hasPets ? profile.petsDetail || "Con mascotas" : "Sin mascotas",
    tenantVerified: verified,
    tenantAge: profile.age,
    tenantOrigin: profile.origin,
    tenantOccupants: profile.occupants,
    tenantJob: profile.job,
    tenantGuarantee: profile.guarantee,
  };
}

function sortListingsByBoost(listings: PropertyListing[], boostedIds: number[]): PropertyListing[] {
  const boostSet = new Set(boostedIds);
  const boosted = listings.filter(l => boostSet.has(l.id));
  const rest = listings.filter(l => !boostSet.has(l.id));
  return [...boosted, ...rest];
}

function PropertyMap({ property }: { property: PropertyListing }) {
  const minLat = -34.68, maxLat = -34.53, minLng = -58.52, maxLng = -58.33;
  const pinX = ((property.mapLng - minLng) / (maxLng - minLng)) * 100;
  const pinY = ((maxLat - property.mapLat) / (maxLat - minLat)) * 100;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ color: C.muted, fontSize: 13, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.8px" }}>Ubicación en el mapa</div>
      <div style={{ height: 200, borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, position: "relative", background: "#D4E8D4", boxShadow: `0 2px 8px ${C.shadow}` }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
          <rect width="100" height="100" fill="#C8E6C9" />
          <path d="M0 40 H100 M0 60 H100 M0 80 H100 M25 0 V100 M50 0 V100 M75 0 V100" stroke="#A5D6A7" strokeWidth="0.8" opacity="0.7" />
          <path d="M10 20 Q40 35 70 15 T95 45" fill="none" stroke="#81C784" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="55" cy="72" rx="18" ry="8" fill="#AED581" opacity="0.5" />
          <circle cx={pinX} cy={pinY} r="5" fill={C.accent} stroke="#fff" strokeWidth="1.5" />
          <circle cx={pinX} cy={pinY} r="9" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.45" />
        </svg>
        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, background: "rgba(255,255,255,0.92)", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.text, border: `1px solid ${C.border}` }}>
          <PinIcon /> {property.location}
        </div>
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 12, color: C.muted }}>Barrio: {property.barrio} · {CITIES.find(c => c.id === property.cityId)?.locationSuffix ?? "Argentina"}</p>
    </div>
  );
}

function CreditsScreen({ credits, onBack }: { credits: number; onBack: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 20, background: C.bg }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: `rgba(232,87,42,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 16 }}>🪙</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: C.accent, lineHeight: 1 }}>{credits}</div>
        <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 700, color: C.text }}>Créditos disponibles</p>
        <p style={{ margin: "12px 0 0", fontSize: 14, color: C.muted, maxWidth: 280, lineHeight: 1.5 }}>Cada aprobación de visita o boost de propiedad descuenta 1 crédito de tu cuenta.</p>
      </div>
      <button onClick={() => alert("Próximamente: comprá packs de créditos para aprobar más visitas.")} style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg,${C.accent},${C.accentL})`, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 10, boxShadow: `0 6px 20px rgba(232,87,42,0.3)` }}>Comprar más créditos</button>
      <button onClick={onBack} style={{ width: "100%", padding: "12px", background: "transparent", color: C.muted, border: "none", fontWeight: 600, cursor: "pointer" }}>Volver</button>
    </div>
  );
}

function CityPickerModal({ selectedCityId, onSelect, onClose }: { selectedCityId: string; onSelect: (id: string) => void; onClose: () => void }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:120, background:"rgba(30,20,10,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div style={{ width:"100%", maxWidth:440, background:C.surface, borderRadius:"24px 24px 0 0", border:`1px solid ${C.border}`, padding:"24px 20px", boxShadow:`0 -16px 60px ${C.shadowM}` }} onClick={e => e.stopPropagation()}>
        <h3 style={{ margin:"0 0 4px", fontSize:18, color:C.text, textAlign:"center" }}>Elegí tu ciudad</h3>
        <p style={{ color:C.muted, fontSize:14, margin:"0 0 20px", textAlign:"center" }}>Las propiedades se actualizan según la ciudad seleccionada.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {CITIES.map(city => (
            <button key={city.id} onClick={() => { onSelect(city.id); onClose(); }} style={{ width:"100%", padding:"14px 16px", borderRadius:12, border:`2px solid ${selectedCityId === city.id ? C.accent : C.border}`, background: selectedCityId === city.id ? `rgba(232,87,42,0.08)` : C.bg, color:C.text, fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span>{city.name} {city.flag}</span>
              {selectedCityId === city.id && <span style={{ color:C.accent, fontSize:18 }}>✓</span>}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ width:"100%", marginTop:16, padding:"12px", background:"transparent", color:C.muted, border:"none", fontWeight:600, cursor:"pointer" }}>Cancelar</button>
      </div>
    </div>
  );
}

function InterestToast({ message }: { message: string }) {
  return (
    <div style={{ position:"absolute", top:12, left:12, right:12, zIndex:55, background:C.surface, border:`1.5px solid rgba(232,87,42,0.35)`, borderRadius:14, padding:"14px 16px", boxShadow:`0 8px 32px ${C.shadowM}`, animation:"toastIn 0.35s ease-out" }}>
      <p style={{ margin:0, fontSize:13, color:C.text, lineHeight:1.5, fontWeight:600 }}>{message}</p>
    </div>
  );
}

function TenantDetailModal({ profile, verified, onClose }: { profile: TenantProfile; verified: boolean; onClose: () => void }) {
  const rows = [
    ["Ingresos mensuales", formatIncome(profile.income)],
    ["Mascotas", profile.hasPets ? profile.petsDetail : "Sin mascotas"],
    ["Perfil verificado", verified ? "Sí ✓" : "No"],
    ["Procedencia", profile.origin],
    ["Edad", `${profile.age} años`],
    ["Personas en el hogar", profile.occupants],
    ["Ocupación", profile.job],
    ["Garantía", profile.guarantee],
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:110, background:"rgba(30,20,10,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div style={{ width:"100%", maxWidth:440, background:C.surface, borderRadius:"24px 24px 0 0", border:`1px solid ${C.border}`, padding:"24px 20px", maxHeight:"80vh", overflowY:"auto", boxShadow:`0 -16px 60px ${C.shadowM}` }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"#E2E8F0", margin:"0 auto 10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>👤</div>
          <h3 style={{ margin:0, fontSize:20, color:C.text, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{profile.name} {verified && <CheckBadgeIcon />}</h3>
          <p style={{ margin:"6px 0 0", color:C.muted, fontSize:13 }}>CV Inmobiliario del candidato</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {rows.map(([label, value]) => (
            <div key={label} style={{ background:C.bg, borderRadius:10, padding:"12px 14px", border:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", gap:12, fontSize:14 }}>
              <span style={{ color:C.muted, fontWeight:600 }}>{label}</span>
              <strong style={{ color:C.text, textAlign:"right" }}>{value}</strong>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width:"100%", marginTop:20, padding:"14px", background:C.accent, color:"#fff", border:"none", borderRadius:12, fontWeight:700, cursor:"pointer" }}>Cerrar</button>
      </div>
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const HeartIcon = ({ filled }: any) => <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" style={{width:22,height:22}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const XCircle = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:22,height:22}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const StarIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" style={{width:24,height:24}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const BoostIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{width:16,height:16}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
const BotIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8" cy="16" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>;
const PinIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const BedIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>;
const DropIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
const MaxIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const HomeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SendIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const CloseIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:18,height:18}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const UserIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CheckBadgeIcon = () => <svg viewBox="0 0 24 24" fill="#3B82F6" stroke="#fff" strokeWidth="2" style={{width:18,height:18}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
const CalendarIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const PlusCircleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const ClipboardIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
const BuildingIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;

// ─── COLORS ───────────────────────────────────────────────────────────────────
const C = { bg: "#F7F5F2", surface: "#FFFFFF", card: "#FFFFFF", border: "#E8E4DF", text: "#1A1A1A", muted: "#8B8480", faint: "#C8C3BD", accent: "#E8572A", accentL: "#FF7A50", green: "#2ECC8A", shadow: "rgba(60,40,20,0.10)", shadowM: "rgba(60,40,20,0.18)", blue: "#3B82F6", danger: "#EF4444" };

const LOGIN_USERNAME = "admin123";
const LOGIN_PASSWORD = "pass123";
const AUTH_SESSION_STORAGE_KEY = "muvit-demo-authenticated";

function getInitialAuthState() {
  try {
    return sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, "true");
      } catch {
        // If sessionStorage is unavailable, keep the session in React state only.
      }
      setError("");
      onLogin();
      return;
    }

    setError("Usuario o contraseña incorrectos.");
    setPassword("");
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: `1.5px solid ${C.border}`,
    background: C.bg,
    color: C.text,
    fontSize: 15,
    fontWeight: 600,
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#EDE9E3", fontFamily: "'Montserrat', sans-serif", padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; }
        body { background:#EDE9E3; font-family: 'Montserrat', sans-serif; }
        button { font-family:inherit; }
        input { font-family:inherit; }
      `}</style>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 420, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 28, padding: 28, boxShadow: "0 20px 80px rgba(100,60,20,0.14)" }}>
        <div style={{ width: 58, height: 58, borderRadius: 18, background: `linear-gradient(135deg,${C.accent},${C.accentL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18, boxShadow: "0 8px 22px rgba(232,87,42,0.28)" }}>🏠</div>
        <h1 style={{ margin: "0 0 8px", color: C.text, fontSize: 34, lineHeight: 1, letterSpacing: "-1px", fontWeight: 800 }}>muvit</h1>
        <p style={{ margin: "0 0 26px", color: C.muted, fontSize: 15, lineHeight: 1.5 }}>Ingresá para ver la demo.</p>

        <label style={{ display: "block", color: C.text, fontSize: 13, fontWeight: 800, marginBottom: 8 }}>Usuario</label>
        <input
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Usuario"
          style={inputStyle}
        />

        <label style={{ display: "block", color: C.text, fontSize: 13, fontWeight: 800, margin: "16px 0 8px" }}>Contraseña</label>
        <input
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Contraseña"
          type="password"
          style={inputStyle}
        />

        {error && (
          <div role="alert" style={{ marginTop: 14, padding: "11px 13px", borderRadius: 12, background: "#FEF2F2", color: C.danger, border: "1px solid #FECACA", fontSize: 13, fontWeight: 700 }}>
            {error}
          </div>
        )}

        <button type="submit" style={{ width: "100%", marginTop: 22, padding: "15px 16px", border: "none", borderRadius: 15, background: `linear-gradient(135deg,${C.accent},${C.accentL})`, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(232,87,42,0.32)" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
const selectStyle: CSSProperties = { width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, fontFamily: "inherit", fontSize: 15, color: C.text };
const inputStyle: CSSProperties = { width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, fontFamily: "inherit", fontSize: 15, color: C.text };

function Pill({ color, bg, border, children }: { color: string; bg: string; border: string; children: ReactNode }) {
  return (
    <span style={{ color, background: bg, border: `1.5px solid ${border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700 }}>
      {children}
    </span>
  );
}

// ─── SWIPE CARD ───────────────────────────────────────────────────────────────
function SwipeCard({ property, onSwipe, onOpen, isTop, index, isBoosted }: any) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showAI, setShowAI] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: `¡Hola! 👋 Soy el asistente de "${property.title}". ¿Qué querés saber?` }]);
  const [typing, setTyping] = useState(false);
  const startPos = useRef<any>(null);

  const handleStart = useCallback((cx: number, cy: number) => { if (!isTop) return; startPos.current = { x: cx, y: cy }; setDragging(true); }, [isTop]);
  const handleMove = useCallback((cx: number, cy: number) => { if (!dragging || !startPos.current) return; setOffset({ x: cx - startPos.current.x, y: (cy - startPos.current.y) * 0.25 }); }, [dragging]);
  const handleEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    const dist = Math.sqrt(offset.x ** 2 + offset.y ** 2);
    if (Math.abs(offset.x) > 85) { onSwipe(property.id, offset.x > 0 ? "right" : "left"); } 
    else if (dist < 8 && isTop) { setOffset({ x: 0, y: 0 }); onOpen(property); } 
    else { setOffset({ x: 0, y: 0 }); }
    startPos.current = null;
  }, [dragging, offset, onSwipe, onOpen, property, isTop]);

  const rot = offset.x / 18;
  const likeOp = Math.min(Math.max(offset.x / 75, 0), 1);
  const nopeOp = Math.min(Math.max(-offset.x / 75, 0), 1);
  const scale = isTop ? 1 : index === 1 ? 0.95 : 0.90;
  const ty = isTop ? (dragging ? offset.y : 0) : index === 1 ? 16 : 30;

  const askAI = (key: string) => {
    const q = AI_QUESTIONS.find(a => a.key === key);
    if(!q) return;
    setMessages(prev => [...prev, { from: "user", text: q.label }]);
    setTyping(true);
    setTimeout(() => { setMessages(prev => [...prev, { from: "bot", text: property.aiAnswers[key] }]); setTyping(false); }, 850);
  };

  return (
    <>
      <div onMouseDown={isTop ? (e) => { e.preventDefault(); handleStart(e.clientX, e.clientY); } : undefined} onMouseMove={isTop ? (e) => handleMove(e.clientX, e.clientY) : undefined} onMouseUp={isTop ? handleEnd : undefined} onMouseLeave={isTop && dragging ? handleEnd : undefined} onTouchStart={isTop ? (e) => { const t = e.touches[0]; handleStart(t.clientX, t.clientY); } : undefined} onTouchMove={isTop ? (e) => { const t = e.touches[0]; handleMove(t.clientX, t.clientY); } : undefined} onTouchEnd={isTop ? handleEnd : undefined} style={{ position: "absolute", width: "100%", cursor: isTop ? (dragging ? "grabbing" : "grab") : "default", transform: `translateX(${offset.x}px) translateY(${ty}px) rotate(${rot}deg) scale(${scale})`, transition: dragging ? "none" : "transform 0.38s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 10 - index, userSelect: "none", touchAction: "none" }}>
        <div style={{ borderRadius: 24, overflow: "hidden", background: C.card, boxShadow: isTop ? `0 8px 40px ${C.shadowM}, 0 2px 8px ${C.shadow}` : `0 4px 20px ${C.shadow}`, border: `1px solid ${C.border}` }}>
          <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
            <PropertyPhoto property={property} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 45%, transparent 100%)" }}/>
            {isBoosted && (
              <div style={{ position:"absolute", top:16, left:16, background:`linear-gradient(135deg,${C.accent},${C.accentL})`, borderRadius:10, padding:"6px 12px", color:"#fff", fontWeight:800, fontSize:12, boxShadow:`0 4px 14px rgba(232,87,42,0.4)`, display:"flex", alignItems:"center", gap:5, zIndex:2 }}>
                <BoostIcon/> Propiedad destacada
              </div>
            )}
            <div style={{ position:"absolute", top:20, left:18, opacity: likeOp, transform: `rotate(-14deg) scale(${0.7 + likeOp*0.3})`, transition:"none" }}><div style={{ border: `3px solid ${C.green}`, borderRadius:10, padding:"5px 14px", color: C.green, fontWeight:800, fontSize:22, letterSpacing:2, background:"rgba(255,255,255,0.85)", backdropFilter:"blur(4px)" }}>MATCH</div></div>
            <div style={{ position:"absolute", top:20, right:18, opacity: nopeOp, transform: `rotate(14deg) scale(${0.7 + nopeOp*0.3})`, transition:"none" }}><div style={{ border:`3px solid ${C.accent}`, borderRadius:10, padding:"5px 14px", color: C.accent, fontWeight:800, fontSize:22, letterSpacing:2, background:"rgba(255,255,255,0.85)", backdropFilter:"blur(4px)" }}>NOPE</div></div>
            <div style={{ position:"absolute", top:16, right: nopeOp > 0.1 ? 80 : 16, background: C.accent, borderRadius:12, padding:"6px 13px", color:"#fff", fontWeight:800, fontSize:14, boxShadow:`0 4px 14px rgba(232,87,42,0.35)`, transition: "right 0.15s" }}>{property.price}</div>
            <div style={{ position:"absolute", bottom:14, left:14, display:"flex", gap:6, flexWrap:"wrap" }}>{property.tags.map((tag: string) => <span key={tag} style={{ background:"rgba(255,255,255,0.88)", backdropFilter:"blur(6px)", border:`1px solid ${C.border}`, color: C.text, fontSize:11, padding:"4px 10px", borderRadius:20, fontWeight:600 }}>{tag}</span>)}</div>
          </div>
          <div style={{ padding:"16px 18px 18px" }}>
            <div style={{ marginBottom:10 }}><h2 style={{ color:C.text, fontSize:19, fontWeight:800, margin:0, lineHeight:1.2 }}>{property.title}</h2><div style={{ display:"flex", alignItems:"center", gap:4, color:C.muted, fontSize:13, marginTop:4 }}><PinIcon/>{property.location}</div></div>
            <div style={{ display:"flex", gap:18, marginBottom:14, color:C.muted, fontSize:13 }}><span style={{ display:"flex", alignItems:"center", gap:5 }}><BedIcon/>{property.rooms} amb.</span><span style={{ display:"flex", alignItems:"center", gap:5 }}><DropIcon/>{property.baths} baño{property.baths>1?"s":""}</span><span style={{ display:"flex", alignItems:"center", gap:5 }}><MaxIcon/>{property.sqm}m²</span></div>
            {isTop && <button onMouseDown={e => e.stopPropagation()} onTouchStart={e => { e.stopPropagation(); setShowAI(true); }} onClick={() => setShowAI(true)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:`rgba(232,87,42,0.07)`, border:`1.5px solid rgba(232,87,42,0.25)`, borderRadius:12, padding:"10px 16px", cursor:"pointer", color: C.accent, fontWeight:700, fontSize:14, transition:"all 0.2s" }}><BotIcon/> Preguntar a la IA</button>}
          </div>
        </div>
      </div>
      {showAI && (
        <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(30,20,10,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={() => setShowAI(false)}>
          <div style={{ width:"100%", maxWidth:440, background:C.surface, borderRadius:"24px 24px 0 0", border:`1px solid ${C.border}`, paddingBottom:24, maxHeight:"72vh", display:"flex", flexDirection:"column", boxShadow:`0 -16px 60px ${C.shadowM}` }} onClick={e => e.stopPropagation()}>
            <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}><div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg, ${C.accent}, ${C.accentL})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}><BotIcon/></div><div><div style={{ color:C.text, fontWeight:800, fontSize:15 }}>Asistente Muvit</div><div style={{ color:C.green, fontSize:11, display:"flex", alignItems:"center", gap:4, fontWeight:600 }}><span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block" }}/>En línea</div></div></div>
              <button onClick={() => setShowAI(false)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:10, padding:"6px 8px", cursor:"pointer", color:C.muted, display:"flex" }}><CloseIcon/></button>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"14px 18px", display:"flex", flexDirection:"column", gap:10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.from==="user"?"flex-end":"flex-start" }}>
                  <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius: m.from==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.from==="user" ? `linear-gradient(135deg,${C.accent},${C.accentL})` : C.bg, color: m.from==="user" ? "#fff" : C.text, fontSize:14, lineHeight:1.55, border: m.from==="user" ? "none" : `1px solid ${C.border}` }}>{m.text}</div>
                </div>
              ))}
              {typing && <div style={{ display:"flex", justifyContent:"flex-start" }}><div style={{ padding:"10px 14px", borderRadius:"18px 18px 18px 4px", background:C.bg, border:`1px solid ${C.border}`, color:C.muted, fontSize:14 }}>Escribiendo…</div></div>}
            </div>
            <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ color:C.faint, fontSize:11, fontWeight:600, paddingLeft:4, letterSpacing:"0.5px", textTransform:"uppercase" }}>Preguntas frecuentes</div>
              {AI_QUESTIONS.map(q => <button key={q.key} onClick={() => askAI(q.key)} style={{ background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"10px 14px", color:C.text, fontSize:13, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", fontWeight:600 }}>{q.label}<span style={{ color:C.accent }}><SendIcon/></span></button>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── SWIPE SCREEN ─────────────────────────────────────────────────────────────
function SwipeScreen({ listings, boostedPropertyIds, onOpen, externalSwipe, onExternalSwipeDone, onSendInterest, onToast }: any) {
  const sortedListings = sortListingsByBoost(listings, boostedPropertyIds ?? []);
  const [cards, setCards] = useState(sortedListings);
  const [matchesCount, setMatchesCount] = useState(0);

  useEffect(() => {
    setCards((prev: PropertyListing[]) => {
      const sorted = sortListingsByBoost(listings, boostedPropertyIds ?? []);
      const byId = new Map(sorted.map((l: PropertyListing) => [l.id, l]));
      const kept = prev.filter((c: PropertyListing) => byId.has(c.id)).map((c: PropertyListing) => byId.get(c.id)!);
      const prevIds = new Set(prev.map((c: PropertyListing) => c.id));
      const added = sorted.filter((l: PropertyListing) => !prevIds.has(l.id));
      return prev.length === 0 && listings.length > 0 ? sorted : [...kept, ...added];
    });
  }, [listings, boostedPropertyIds]);

  const sendInterest = useCallback((prop: PropertyListing, isSuperlike = false) => {
    onSendInterest(prop, isSuperlike);
    setMatchesCount(prev => prev + 1);
    onToast(isSuperlike
      ? `¡Superlike enviado a ${prop.title}! El propietario verá tu solicitud destacada.`
      : `Tu interés en ${prop.title} se envió al propietario. Cuando lo apruebe, podrás agendar la visita desde la pestaña Visitas.`);
  }, [onSendInterest, onToast]);

  useEffect(() => {
    if (externalSwipe) {
      const { id, dir } = externalSwipe;
      const prop = listings.find((p: PropertyListing) => p.id === id);
      setCards((prev: PropertyListing[]) => prev.filter(p => p.id !== id));
      if ((dir === "right" || dir === "superlike") && prop) sendInterest(prop, dir === "superlike");
      onExternalSwipeDone();
    }
  }, [externalSwipe, onExternalSwipeDone, listings, sendInterest]);

  const handleSwipe = useCallback((id: number, dir: string) => {
    setTimeout(() => {
      const prop = listings.find((p: PropertyListing) => p.id === id);
      setCards((prev: PropertyListing[]) => prev.filter(p => p.id !== id));
      if ((dir === "right" || dir === "superlike") && prop) sendInterest(prop, dir === "superlike");
    }, 320);
  }, [listings, sendInterest]);

  const doButton = (dir: string) => { if (!cards.length) return; handleSwipe(cards[0].id, dir); };

  if (!cards.length) return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", textAlign:"center", background:C.bg }}>
      <div style={{ fontSize:60, marginBottom:18 }}>🏡</div>
      <h2 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:8 }}>¡Eso es todo!</h2>
      <p style={{ color:C.muted, fontSize:14, marginBottom:24 }}>Revisaste todas las propiedades disponibles.</p>
      {matchesCount > 0 && (
        <div style={{ background:`rgba(46,204,138,0.08)`, border:`1.5px solid rgba(46,204,138,0.3)`, borderRadius:16, padding:"16px 28px" }}>
          <div style={{ color:C.green, fontWeight:800, fontSize:20 }}>✨ {matchesCount} Solicitud{matchesCount>1?"es":""} enviada{matchesCount>1?"s":""}</div>
          <div style={{ color:C.muted, fontSize:13, marginTop:4 }}>Andá a 'Visitas' para ver el estado.</div>
        </div>
      )}
      <button onClick={() => { setCards(sortListingsByBoost(listings, boostedPropertyIds ?? [])); setMatchesCount(0); }} style={{ marginTop:24, background:`linear-gradient(135deg,${C.accent},${C.accentL})`, border:"none", borderRadius:14, padding:"13px 32px", color:"#fff", fontWeight:800, fontSize:15, cursor:"pointer", boxShadow:`0 6px 20px rgba(232,87,42,0.3)` }}>Ver de nuevo</button>
    </div>
  );

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", padding:16, background:C.bg }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", gap:8 }}>
          <Pill color={C.accent} bg="rgba(232,87,42,0.08)" border="rgba(232,87,42,0.2)">{listings.length - cards.length} vistos</Pill>
          <Pill color={C.green} bg="rgba(46,204,138,0.08)" border="rgba(46,204,138,0.25)">❤️ {matchesCount} solicitudes</Pill>
        </div>
        <span style={{ color:C.faint, fontSize:13, fontWeight:600 }}>{cards.length} restantes</span>
      </div>
      <div style={{ position:"relative", flex:1, display:"flex", alignItems:"center" }}>
        {cards.slice(0, 3).map((p: PropertyListing, i: number) => <SwipeCard key={p.id} property={p} isBoosted={boostedPropertyIds?.includes(p.id)} onSwipe={handleSwipe} onOpen={onOpen} isTop={i===0} index={i}/>)}
      </div>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:18, padding:"20px 0 6px", position:"relative", zIndex:20 }}>
        <button onClick={() => doButton("left")} title="Rechazar" style={{ width:60, height:60, borderRadius:"50%", background:C.surface, border:`2px solid ${C.border}`, color:C.accent, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 16px ${C.shadow}`, transition:"transform 0.15s, box-shadow 0.15s" }}><XCircle/></button>
        <button onClick={() => doButton("superlike")} title="Superlike" style={{ width:54, height:54, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},#60A5FA)`, border:"none", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 6px 24px rgba(59,130,246,0.4)`, transition:"transform 0.15s, box-shadow 0.15s" }}><StarIcon/></button>
        <button onClick={() => doButton("right")} title="Me interesa" style={{ width:70, height:70, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent},${C.accentL})`, border:"none", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 28px rgba(232,87,42,0.35)`, transition:"transform 0.15s, box-shadow 0.15s" }}><HeartIcon filled/></button>
      </div>
    </div>
  );
}

// ─── VISITAS SCREEN (Inquilino) ──────────────────────────────
function VisitasScreen({ globalRequests, onScheduleRequest, availableSlots, listings, onOpenProperty }: any) {
  const [scheduleModal, setScheduleModal] = useState<any>(null);
  const slots = availableSlots.length > 0 ? availableSlots : getAvailableSlotLabels(INITIAL_CALENDAR_DAYS);
  const [selectedSlot, setSelectedSlot] = useState(slots[0] || "");

  const confirmSchedule = () => {
    if (!scheduleModal) return;
    onScheduleRequest(scheduleModal.id, selectedSlot);
    setScheduleModal(null);
  };

  const findListing = (propId: number) => listings.find((p: PropertyListing) => p.id === propId);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:20, background:C.bg, position:"relative" }}>
      <h1 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:4 }}>Mis Visitas</h1>
      <p style={{ color:C.muted, fontSize:14, marginBottom:24 }}>Seguimiento de tus solicitudes de interés.</p>
      
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {globalRequests.length === 0 && <div style={{ textAlign:"center", color:C.muted, padding:20, fontSize:14 }}>Aún no mostraste interés en ninguna propiedad.</div>}
        
        {globalRequests.map((req: any) => {
          const prop = findListing(req.propId);

          return (
          <div key={req.id} style={{ background:C.surface, borderRadius:16, overflow:"hidden", border:`1px solid ${C.border}`, boxShadow:`0 2px 8px ${C.shadow}` }}>
            <div
              onClick={() => prop && onOpenProperty(prop)}
              style={{ cursor: prop ? "pointer" : "default" }}
              role={prop ? "button" : undefined}
              tabIndex={prop ? 0 : undefined}
              onKeyDown={prop ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenProperty(prop); } } : undefined}
            >
              {prop && (
                <div style={{ height:120, position:"relative" }}>
                  <PropertyPhoto property={prop} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 55%)" }} />
                  <div style={{ position:"absolute", top:10, right:10, background:C.accent, color:"#fff", fontSize:12, fontWeight:800, padding:"5px 10px", borderRadius:8 }}>{prop.price}</div>
                </div>
              )}
              <div style={{ padding:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  {req.status === 'scheduled' && <span style={{ fontSize:11, background:`rgba(46,204,138,0.15)`, color:C.green, padding:"4px 8px", borderRadius:6, fontWeight:800 }}>VISITA AGENDADA</span>}
                  {req.status === 'approved' && <span style={{ fontSize:11, background:`rgba(59,130,246,0.12)`, color:C.blue, padding:"4px 8px", borderRadius:6, fontWeight:800 }}>APROBADO</span>}
                  {req.status === 'pending' && <span style={{ fontSize:11, background:"#FEF3C7", color:"#D97706", padding:"4px 8px", borderRadius:6, fontWeight:800 }}>EN REVISIÓN</span>}
                  {req.status === 'rejected' && <span style={{ fontSize:11, background:"#FEF2F2", color:C.danger, padding:"4px 8px", borderRadius:6, fontWeight:800 }}>RECHAZADO</span>}
                  {req.time && <span style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{req.time}</span>}
                </div>
                <div style={{ fontWeight:800, fontSize:16, color:C.text, marginBottom:4 }}>{req.propTitle}</div>
                <div style={{ color:C.muted, fontSize:13, display:"flex", alignItems:"center", gap:4 }}><PinIcon/> {req.propLocation}</div>
                {prop && <div style={{ marginTop:8, fontSize:11, color:C.faint, fontWeight:600 }}>Tocá para ver la propiedad</div>}
              </div>
            </div>
            <div style={{ padding:"0 16px 16px" }}>
              {req.status === 'pending' && (
                <p style={{ margin:0, fontSize:13, color:C.muted, lineHeight:1.45 }}>El propietario está revisando tu solicitud. Te avisamos cuando puedas agendar.</p>
              )}
              {req.status === 'approved' && (
                slots.length > 0 ? (
                  <button onClick={() => { setSelectedSlot(slots[0]); setScheduleModal(req); }} style={{ width:"100%", marginTop:4, padding:"12px", background:`linear-gradient(135deg,${C.accent},${C.accentL})`, border:"none", borderRadius:10, fontWeight:700, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:`0 4px 14px rgba(232,87,42,0.3)` }}><CalendarIcon/> Agendar visita</button>
                ) : (
                  <p style={{ margin:"4px 0 0", fontSize:13, color:C.muted }}>El dueño aún no configuró horarios disponibles.</p>
                )
              )}
              {req.status === 'scheduled' && (
                <button style={{ width:"100%", marginTop:4, padding:"10px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, fontWeight:700, color:C.text, cursor:"pointer" }}>Abrir Chat con Dueño</button>
              )}
            </div>
          </div>
          );
        })}
      </div>

      {scheduleModal && (
        <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(30,20,10,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={() => setScheduleModal(null)}>
          <div style={{ width:"100%", maxWidth:440, background:C.surface, borderRadius:"24px 24px 0 0", border:`1px solid ${C.border}`, padding:"24px", boxShadow:`0 -16px 60px ${C.shadowM}` }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <h3 style={{ margin:0, fontSize:18, color:C.text }}>Agendar visita</h3>
              <p style={{ color:C.muted, fontSize:14, margin:"6px 0 0" }}>Elegí un horario del calendario del dueño</p>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>HORARIOS DISPONIBLES</label>
              <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} style={selectStyle}>
                {slots.map((slot: string) => <option key={slot} value={slot}>{slot}</option>)}
              </select>
            </div>
            <button onClick={confirmSchedule} style={{ width:"100%", padding:"14px", background:C.accent, color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:16, cursor:"pointer" }}>Confirmar visita</button>
            <button onClick={() => setScheduleModal(null)} style={{ width:"100%", padding:"12px", background:"transparent", color:C.muted, border:"none", fontWeight:600, marginTop:8, cursor:"pointer" }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

const emptyPropertyForm = () => ({ title: "", price: "", barrio: "", location: "", rooms: "2", baths: "1", sqm: "60", description: "", tags: "" });

function listingToForm(prop: PropertyListing) {
  const priceNum = prop.price.replace(/[^\d]/g, "");
  return { title: prop.title, price: priceNum, barrio: prop.barrio, location: prop.location, rooms: String(prop.rooms), baths: String(prop.baths), sqm: String(prop.sqm), description: prop.description, tags: prop.tags.join(", ") };
}

function formToListing(form: ReturnType<typeof emptyPropertyForm>, id: number, sceneIndex: number, cityId: string): PropertyListing {
  const priceNum = form.price ? `$${Number(form.price).toLocaleString("es-AR")}/mes` : "Consultar";
  const barrio = form.barrio.trim();
  const coords = coordsForBarrio(barrio);
  const city = CITIES.find(c => c.id === cityId) ?? CITIES[0];
  return {
    id,
    cityId,
    title: form.title.trim(),
    price: priceNum,
    barrio,
    mapLat: coords.lat,
    mapLng: coords.lng,
    location: form.location.trim() || `${barrio}, ${city.locationSuffix}`,
    rooms: Number(form.rooms) || 1,
    baths: Number(form.baths) || 1,
    sqm: Number(form.sqm) || 50,
    sceneIndex,
    ownerName: OWNER_NAME,
    tags: form.tags.split(",").map(t => t.trim()).filter(Boolean).length ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : ["Publicación nueva"],
    description: form.description.trim() || "Propiedad publicada por Inmobiliaria Muvit.",
    amenities: ["Wi-Fi incluido"],
    aiAnswers: { mascotas: "Consultar con el propietario.", barrio: `Zona ${barrio}.`, expensas: "Consultar." },
  };
}

// ─── MIS PROPIEDADES (Dueño) ─────────────────────────────────
function OwnerPropertiesScreen({ properties, onAddProperty, onUpdateProperty, cityId, boostedPropertyIds, onBoostProperty, ownerCredits }: any) {
  const [barrioFilter, setBarrioFilter] = useState("Todos");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyPropertyForm());

  const barrios: string[] = ["Todos", ...Array.from(new Set<string>(properties.map((p: PropertyListing) => String(p.barrio))))];
  const filtered = barrioFilter === "Todos" ? properties : properties.filter((p: PropertyListing) => p.barrio === barrioFilter);

  const openAdd = () => { setForm(emptyPropertyForm()); setEditingId(null); setModalMode("add"); };
  const openEdit = (prop: PropertyListing) => { setForm(listingToForm(prop)); setEditingId(prop.id); setModalMode("edit"); };
  const closeModal = () => { setModalMode(null); setEditingId(null); };

  const handleSave = () => {
    if (!form.title.trim() || !form.barrio.trim()) return;
    if (modalMode === "edit" && editingId != null) {
      const existing = properties.find((p: PropertyListing) => p.id === editingId);
      onUpdateProperty(formToListing(form, editingId, existing?.sceneIndex ?? 0, existing?.cityId ?? cityId));
    } else {
      onAddProperty(formToListing(form, Date.now(), Math.floor(Math.random() * 3), cityId));
    }
    closeModal();
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative", background:C.bg }}>
      <div style={{ flex:1, overflowY:"auto", padding:20, paddingBottom:100 }}>
      <h1 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:4 }}>Mis Propiedades</h1>
      <p style={{ color:C.muted, fontSize:14, marginBottom:16 }}>Publicaciones de <strong style={{ color:C.text }}>{OWNER_NAME}</strong> en <strong style={{ color:C.text }}>{CITIES.find(c => c.id === cityId)?.name ?? "tu ciudad"}</strong></p>

      <div style={{ marginBottom:16 }}>
        <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>FILTRAR POR BARRIO</label>
        <select value={barrioFilter} onChange={e => setBarrioFilter(e.target.value)} style={selectStyle}>
          {barrios.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.length === 0 && <div style={{ textAlign:"center", color:C.muted, padding:24, fontSize:14 }}>No hay propiedades en este barrio.</div>}
        {filtered.map((prop: PropertyListing) => {
          const isBoosted = boostedPropertyIds?.includes(prop.id);
          return (
            <div key={prop.id} onClick={() => openEdit(prop)} style={{ background: isBoosted ? `linear-gradient(135deg, rgba(232,87,42,0.04), rgba(255,122,80,0.1))` : C.surface, borderRadius:16, overflow:"hidden", border: isBoosted ? `2px solid ${C.accent}` : `1px solid ${C.border}`, boxShadow: isBoosted ? `0 0 16px rgba(232,87,42,0.2), 0 2px 8px ${C.shadow}` : `0 2px 8px ${C.shadow}`, cursor:"pointer" }}>
              <div style={{ height:140, position:"relative" }}>
                <PropertyPhoto property={prop} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 55%)" }} />
                {isBoosted && <div style={{ position:"absolute", top:10, left:10, background:`linear-gradient(135deg,${C.accent},${C.accentL})`, color:"#fff", fontSize:11, fontWeight:800, padding:"5px 10px", borderRadius:8, display:"flex", alignItems:"center", gap:4 }}><BoostIcon/> DESTACADA</div>}
                <div style={{ position:"absolute", top:10, right:10, background:C.accent, color:"#fff", fontSize:12, fontWeight:800, padding:"5px 10px", borderRadius:8 }}>{prop.price}</div>
              </div>
              <div style={{ padding:"14px 16px 16px" }}>
                <div style={{ fontWeight:800, fontSize:16, color:C.text, marginBottom:4 }}>{prop.title}</div>
                <div style={{ color:C.muted, fontSize:13, display:"flex", alignItems:"center", gap:4, marginBottom:8 }}><PinIcon/> {prop.location}</div>
                <div style={{ display:"flex", gap:12, fontSize:12, color:C.muted, marginBottom:10 }}>
                  <span>{prop.rooms} amb.</span><span>{prop.baths} baño{prop.baths > 1 ? "s" : ""}</span><span>{prop.sqm} m²</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
                  <div style={{ fontSize:11, color:C.faint, fontWeight:600 }}>👤 {prop.ownerName} · Barrio: {prop.barrio}</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onBoostProperty(prop.id); }}
                    disabled={!isBoosted && ownerCredits <= 0}
                    title={isBoosted ? "Quitar destacado" : ownerCredits <= 0 ? "Sin créditos (cuesta 1)" : "Destacar propiedad (1 crédito)"}
                    style={{
                      flexShrink:0,
                      padding:"6px 12px",
                      borderRadius:8,
                      border: isBoosted ? `2px solid ${C.accent}` : `1.5px solid ${C.border}`,
                      background: isBoosted ? `rgba(232,87,42,0.12)` : C.bg,
                      color: isBoosted ? C.accent : ownerCredits <= 0 ? C.faint : C.muted,
                      fontWeight:700,
                      fontSize:11,
                      cursor: !isBoosted && ownerCredits <= 0 ? "not-allowed" : "pointer",
                      opacity: !isBoosted && ownerCredits <= 0 ? 0.6 : 1,
                      display:"flex",
                      alignItems:"center",
                      gap:4,
                    }}
                  >
                    <BoostIcon/> {isBoosted ? "Destacada" : "Boost (1 cr.)"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      <div style={{ position:"absolute", bottom:20, left:16, display:"flex", alignItems:"center", gap:10, zIndex:25, pointerEvents:"none" }}>
        <button onClick={openAdd} style={{ pointerEvents:"auto", width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent},${C.accentL})`, border:"none", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 24px rgba(232,87,42,0.45)`, flexShrink:0 }} title="Agregar propiedad">
          <PlusCircleIcon />
        </button>
        <span style={{ pointerEvents:"none", background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"8px 14px", fontSize:12, fontWeight:700, color:C.text, boxShadow:`0 4px 12px ${C.shadow}` }}>Agregar propiedad</span>
      </div>

      {modalMode && (
        <div style={{ position:"absolute", inset:0, zIndex:100, background:"rgba(30,20,10,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={closeModal}>
          <div style={{ width:"100%", maxHeight:"85vh", overflowY:"auto", background:C.surface, borderRadius:"24px 24px 0 0", border:`1px solid ${C.border}`, padding:"24px 20px", boxShadow:`0 -16px 60px ${C.shadowM}` }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:"0 0 4px", fontSize:18, color:C.text }}>{modalMode === "edit" ? "Editar propiedad" : "Nueva propiedad"}</h3>
            <p style={{ color:C.muted, fontSize:13, marginBottom:20 }}>A nombre de {OWNER_NAME}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ width:"100%", height:140, borderRadius:12, border:`2px dashed ${C.border}`, overflow:"hidden", position:"relative" }}>
                {modalMode === "edit" && editingId != null ? (
                  <PropertyPhoto property={properties.find((p: PropertyListing) => p.id === editingId) ?? formToListing(form, editingId, 0, cityId)} />
                ) : (
                  <div style={{ width:"100%", height:"100%", background:C.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:C.muted }}>
                    <span style={{ fontSize:24, marginBottom:6 }}>📸</span>
                    <span style={{ fontSize:12, fontWeight:700 }}>Foto asignada al publicar</span>
                  </div>
                )}
              </div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>TÍTULO</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: Departamento luminoso 2 amb" style={inputStyle} /></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>PRECIO MENSUAL ($)</label><input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="350000" style={inputStyle} /></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>BARRIO</label><input type="text" value={form.barrio} onChange={e => setForm(f => ({ ...f, barrio: e.target.value }))} placeholder="Palermo" style={inputStyle} /></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>UBICACIÓN COMPLETA</label><input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Palermo Soho, CABA" style={inputStyle} /></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>DESCRIPCIÓN</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize:"vertical" }} /></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>ETIQUETAS (separadas por coma)</label><input type="text" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Luminoso, Balcón" style={inputStyle} /></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                <div><label style={{ display:"block", fontSize:11, fontWeight:700, color:C.muted, marginBottom:4 }}>AMB.</label><input type="number" value={form.rooms} onChange={e => setForm(f => ({ ...f, rooms: e.target.value }))} style={inputStyle} /></div>
                <div><label style={{ display:"block", fontSize:11, fontWeight:700, color:C.muted, marginBottom:4 }}>BAÑOS</label><input type="number" value={form.baths} onChange={e => setForm(f => ({ ...f, baths: e.target.value }))} style={inputStyle} /></div>
                <div><label style={{ display:"block", fontSize:11, fontWeight:700, color:C.muted, marginBottom:4 }}>M²</label><input type="number" value={form.sqm} onChange={e => setForm(f => ({ ...f, sqm: e.target.value }))} style={inputStyle} /></div>
              </div>
              <button onClick={handleSave} style={{ width:"100%", padding:"14px", background:C.accent, color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:15, cursor:"pointer", marginTop:4 }}>{modalMode === "edit" ? "Guardar cambios" : "Publicar propiedad"}</button>
              <button onClick={closeModal} style={{ width:"100%", padding:"12px", background:"transparent", color:C.muted, border:"none", fontWeight:600, cursor:"pointer" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SOLICITUDES (Dueño) ─────────────────────────────────────
function requestToProfile(req: any): TenantProfile {
  return {
    name: req.tenantName,
    income: String(req.tenantIncome || "").replace(/\D/g, "") || "0",
    guarantee: req.tenantGuarantee || "—",
    hasPets: req.tenantPets !== "Sin mascotas",
    petsDetail: req.tenantPets || "Sin mascotas",
    origin: req.tenantOrigin || "—",
    age: req.tenantAge || "—",
    occupants: req.tenantOccupants || "—",
    job: req.tenantJob || "—",
  };
}

function sortSuperlikesFirst<T extends { isSuperlike?: boolean }>(items: T[]): T[] {
  return [...items].sort((a, b) => Number(!!b.isSuperlike) - Number(!!a.isSuperlike));
}

function SolicitudesScreen({ globalRequests, onUpdateRequestStatus, ownerCredits }: any) {
  const [viewTenantReq, setViewTenantReq] = useState<any>(null);
  const pendingSuperlikes = globalRequests.filter((r: any) => r.status === "pending" && r.isSuperlike);
  const pending = globalRequests.filter((r: any) => r.status === "pending" && !r.isSuperlike);
  const approved = sortSuperlikesFirst(globalRequests.filter((r: any) => r.status === "approved"));
  const scheduled = sortSuperlikesFirst(globalRequests.filter((r: any) => r.status === "scheduled"));
  const rejected = sortSuperlikesFirst(globalRequests.filter((r: any) => r.status === "rejected"));

  const RequestCard = ({ req, showActions }: { req: any; showActions?: boolean }) => (
    <div style={{
      background: req.isSuperlike ? `linear-gradient(135deg, rgba(59,130,246,0.06), rgba(147,197,253,0.14))` : C.surface,
      borderRadius:16,
      padding:16,
      border: req.isSuperlike ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
      boxShadow: req.isSuperlike ? `0 0 20px rgba(59,130,246,0.22), 0 2px 8px ${C.shadow}` : `0 2px 8px ${C.shadow}`,
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <div>
          <button onClick={() => setViewTenantReq(req)} style={{ background:"none", border:"none", padding:0, cursor:"pointer", textAlign:"left" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontWeight:800, fontSize:16, color: req.isSuperlike ? C.blue : C.accent, textDecoration:"underline" }}>{req.tenantName}</span>{req.tenantVerified && <CheckBadgeIcon />}</div>
          </button>
          <div style={{ fontSize:13, color:C.muted, marginTop:2 }}>{req.propTitle}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end" }}>
          {req.isSuperlike && <span style={{ fontSize:11, background:`linear-gradient(135deg,${C.blue},#60A5FA)`, color:"#fff", padding:"4px 8px", borderRadius:6, fontWeight:800, display:"flex", alignItems:"center", gap:3 }}>⭐ SUPERLIKE</span>}
          {req.status === "pending" && <span style={{ fontSize:11, background:"#FEF3C7", color:"#D97706", padding:"4px 8px", borderRadius:6, fontWeight:800 }}>NUEVA</span>}
          {req.status === "approved" && <span style={{ fontSize:11, background:`rgba(59,130,246,0.12)`, color:C.blue, padding:"4px 8px", borderRadius:6, fontWeight:800 }}>APROBADA</span>}
          {req.status === "scheduled" && <span style={{ fontSize:11, background:`rgba(46,204,138,0.15)`, color:C.green, padding:"4px 8px", borderRadius:6, fontWeight:800 }}>AGENDADA</span>}
          {req.status === "rejected" && <span style={{ fontSize:11, background:"#FEF2F2", color:C.danger, padding:"4px 8px", borderRadius:6, fontWeight:800 }}>RECHAZADA</span>}
        </div>
      </div>
      <div style={{ color:C.muted, fontSize:12, display:"flex", alignItems:"center", gap:4, marginBottom:10 }}><PinIcon/> {req.propLocation}</div>
      {req.time && (
        <div style={{ background:`rgba(46,204,138,0.08)`, border:`1px solid rgba(46,204,138,0.25)`, borderRadius:8, padding:"10px 12px", marginBottom:12, fontSize:14, fontWeight:700, color:C.green, display:"flex", alignItems:"center", gap:8 }}>
          <CalendarIcon/> Visita: {req.time}
        </div>
      )}
      <div style={{ background:C.bg, padding:"10px 12px", borderRadius:8, marginBottom: showActions ? 14 : 0, display:"flex", justifyContent:"space-between", fontSize:13 }}>
        <div><span style={{ color:C.muted }}>Ingresos:</span> <strong style={{ color:C.text }}>{req.tenantIncome}</strong></div>
        <div><strong style={{ color:C.text }}>{req.tenantPets}</strong></div>
      </div>
      {showActions && (
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => onUpdateRequestStatus(req.id, "rejected")} style={{ flex:1, padding:"10px", borderRadius:8, background:"#FEF2F2", color:C.danger, border:`1px solid #FECACA`, fontWeight:700, cursor:"pointer" }}>Rechazar</button>
          <button onClick={() => onUpdateRequestStatus(req.id, "approved")} disabled={ownerCredits <= 0} style={{ flex:1, padding:"10px", borderRadius:8, background: ownerCredits <= 0 ? C.faint : C.accent, color:"#fff", border:"none", fontWeight:700, cursor: ownerCredits <= 0 ? "not-allowed" : "pointer", opacity: ownerCredits <= 0 ? 0.7 : 1 }}>Aprobar</button>
        </div>
      )}
      {req.status === "approved" && !req.time && <p style={{ margin:0, fontSize:12, color:C.muted }}>Esperando que el inquilino elija un horario.</p>}
    </div>
  );

  const Section = ({ title, items, showActions }: { title: string; items: any[]; showActions?: boolean }) => items.length > 0 ? (
    <div style={{ marginBottom:24 }}>
      <div style={{ color:C.faint, fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>{title} ({items.length})</div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>{items.map(req => <RequestCard key={req.id} req={req} showActions={showActions} />)}</div>
    </div>
  ) : null;

  return (
    <div style={{ flex:1, overflowY:"auto", padding:20, background:C.bg }}>
      <h1 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:4 }}>Solicitudes</h1>
      <p style={{ color:C.muted, fontSize:14, marginBottom:24 }}>Intereses de inquilinos y visitas agendadas.</p>
      {globalRequests.length === 0 && <div style={{ textAlign:"center", color:C.muted, padding:32, fontSize:14 }}>Aún no recibiste solicitudes.</div>}
      <Section title="⭐ Superlikes — prioridad" items={pendingSuperlikes} showActions />
      <Section title="Pendientes de revisión" items={pending} showActions />
      <Section title="Aprobadas — sin horario" items={approved} />
      <Section title="Visitas agendadas" items={scheduled} />
      <Section title="Rechazadas" items={rejected} />
      {viewTenantReq && <TenantDetailModal profile={requestToProfile(viewTenantReq)} verified={viewTenantReq.tenantVerified} onClose={() => setViewTenantReq(null)} />}
    </div>
  );
}

// ─── CALENDARIO (Dueño) ───────────────────────────────────────
function CalendarioScreen({ calendarDays, onToggleSlot, globalRequests }: any) {
  const [selectedDayKey, setSelectedDayKey] = useState(calendarDays[0]?.dateKey || "");

  const selectedDay = calendarDays.find((d: CalendarDay) => d.dateKey === selectedDayKey) || calendarDays[0];
  const scheduledForDay = globalRequests.filter((r: any) => r.status === "scheduled" && r.time && selectedDay && r.time.startsWith(selectedDay.label));

  const toggleSlot = (slotId: string) => {
    if (!selectedDay) return;
    onToggleSlot(selectedDay.dateKey, slotId);
  };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:20, background:C.bg }}>
      <h1 style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:4 }}>Calendario</h1>
      <p style={{ color:C.muted, fontSize:14, marginBottom:20 }}>Configurá disponibilidad y revisá visitas por día.</p>

      <div style={{ display:"flex", gap:8, overflowX:"auto", marginBottom:20, paddingBottom:4 }}>
        {calendarDays.map((day: CalendarDay) => (
          <button key={day.dateKey} onClick={() => setSelectedDayKey(day.dateKey)} style={{ flexShrink:0, padding:"10px 16px", borderRadius:12, border:`2px solid ${selectedDayKey === day.dateKey ? C.accent : C.border}`, background: selectedDayKey === day.dateKey ? `rgba(232,87,42,0.08)` : C.surface, color: selectedDayKey === day.dateKey ? C.accent : C.muted, fontWeight:700, fontSize:14, cursor:"pointer" }}>{day.label}</button>
        ))}
      </div>

      {selectedDay && (
        <>
          <div style={{ color:C.faint, fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Horarios — {selectedDay.label}</div>
          <p style={{ fontSize:13, color:C.muted, marginBottom:12 }}>Tocá cada slot: <span style={{ color:C.green, fontWeight:700 }}>verde = disponible</span> · <span style={{ color:C.faint, fontWeight:700 }}>gris = bloqueado</span></p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
            {selectedDay.slots.map((slot: CalendarSlot) => {
              const booked = globalRequests.some((r: any) => r.status === "scheduled" && r.scheduledSlot?.dateKey === selectedDay.dateKey && r.scheduledSlot?.slotId === slot.id);
              const blocked = !slot.available || booked;
              return (
              <button key={slot.id} onClick={() => !booked && toggleSlot(slot.id)} disabled={booked} style={{ padding:"14px 12px", borderRadius:12, border:`2px solid ${!blocked ? "rgba(46,204,138,0.4)" : C.border}`, background: !blocked ? `rgba(46,204,138,0.12)` : booked ? "rgba(232,87,42,0.08)" : "#E8E4DF", color: !blocked ? "#1A6B45" : booked ? C.accent : C.faint, fontWeight:700, fontSize:14, cursor: booked ? "default" : "pointer", transition:"all 0.15s", opacity: booked ? 0.9 : 1 }}>
                {slot.time}
                <div style={{ fontSize:10, marginTop:4, opacity:0.85 }}>{booked ? "Reservado" : slot.available ? "Disponible" : "Bloqueado"}</div>
              </button>
            );})}
          </div>

          <div style={{ color:C.faint, fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Agendados — {selectedDay.label}</div>
          {scheduledForDay.length === 0 ? (
            <div style={{ textAlign:"center", color:C.muted, padding:16, fontSize:13, background:C.surface, borderRadius:12, border:`1px solid ${C.border}` }}>Sin visitas agendadas este día.</div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {scheduledForDay.map((req: any) => (
                <div key={req.id} style={{ background:C.surface, borderRadius:12, padding:14, border:`1px solid rgba(46,204,138,0.3)`, boxShadow:`0 2px 6px ${C.shadow}` }}>
                  <div style={{ fontWeight:800, color:C.text, fontSize:15 }}>{req.tenantName}</div>
                  <div style={{ fontSize:13, color:C.muted, marginTop:4 }}>{req.propTitle}</div>
                  <div style={{ fontSize:13, color:C.green, fontWeight:700, marginTop:6 }}>🕐 {req.time}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── MI PERFIL ─────────────────────────────────────────────
function ProfileScreen({ role, setRole, setTab, isVerified, setIsVerified, tenantProfile, onUpdateTenantProfile, ownerPropertyCount, onResetDemo }: any) {
  const handleRoleToggle = (newRole: string) => { setRole(newRole); setTab(newRole === 'inquilino' ? 'swipe' : 'propiedades'); };
  const set = (key: keyof TenantProfile, value: string | boolean) => onUpdateTenantProfile({ ...tenantProfile, [key]: value });

  return (
    <div style={{ flex:1, overflowY:"auto", padding:20, background:C.bg }}>
      <div style={{ display:"flex", background:C.border, borderRadius:20, padding:4, marginBottom:30, position:"relative" }}>
        <div style={{ position:"absolute", top:4, left: role === 'inquilino' ? 4 : "calc(50% - 4px)", width:"50%", height:"calc(100% - 8px)", background:C.surface, borderRadius:16, transition:"left 0.3s ease", boxShadow:`0 2px 8px ${C.shadow}` }} />
        <button onClick={() => handleRoleToggle('inquilino')} style={{ flex:1, padding:"10px 0", background:"transparent", border:"none", zIndex:1, color: role==='inquilino' ? C.text : C.muted, fontWeight:700, fontSize:14, cursor:"pointer" }}>Soy Inquilino</button>
        <button onClick={() => handleRoleToggle('dueño')} style={{ flex:1, padding:"10px 0", background:"transparent", border:"none", zIndex:1, color: role==='dueño' ? C.text : C.muted, fontWeight:700, fontSize:14, cursor:"pointer" }}>Soy Propietario</button>
      </div>

      {role === 'inquilino' ? (
        <>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ width:80, height:80, borderRadius:"50%", background:"#E2E8F0", margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30 }}>👤</div>
            <h2 style={{ margin:0, fontSize:22, color:C.text, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{tenantProfile.name} {isVerified && <CheckBadgeIcon />}</h2>
            <p style={{ margin:0, color:C.muted, fontSize:14 }}>{isVerified ? "Inquilino Verificado" : "Perfil Standard"}</p>
          </div>
          <div style={{ background:C.surface, borderRadius:16, padding:20, border:`1px solid ${C.border}`, boxShadow:`0 2px 8px ${C.shadow}` }}>
            <h3 style={{ margin:"0 0 16px", fontSize:16, color:C.text }}>Mi CV Inmobiliario</h3>
            <p style={{ fontSize:13, color:C.muted, margin:"0 0 16px" }}>Completá tus datos para que los propietarios te conozcan mejor.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>INGRESOS MENSUALES ($)</label><input type="number" value={tenantProfile.income} onChange={e => set("income", e.target.value)} style={inputStyle} /></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>TIPO DE GARANTÍA</label><select value={tenantProfile.guarantee} onChange={e => set("guarantee", e.target.value)} style={selectStyle}><option>Recibo de Sueldo</option><option>Seguro de Caución</option><option>Garantía Propietaria</option></select></div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>PROCEDENCIA / DE DÓNDE SOS</label><input type="text" value={tenantProfile.origin} onChange={e => set("origin", e.target.value)} placeholder="Ej: Córdoba, Argentina" style={inputStyle} /></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>EDAD</label><input type="number" value={tenantProfile.age} onChange={e => set("age", e.target.value)} style={inputStyle} /></div>
                <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>PERSONAS EN EL HOGAR</label><input type="number" min={1} value={tenantProfile.occupants} onChange={e => set("occupants", e.target.value)} style={inputStyle} /></div>
              </div>
              <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>OCUPACIÓN / A QUÉ TE DEDICÁS</label><input type="text" value={tenantProfile.job} onChange={e => set("job", e.target.value)} style={inputStyle} /></div>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px", background:C.bg, borderRadius:10, border:`1px solid ${C.border}` }}><input type="checkbox" id="pets" checked={tenantProfile.hasPets} onChange={e => set("hasPets", e.target.checked)} style={{ width:18, height:18 }} /><label htmlFor="pets" style={{ fontSize:15, color:C.text, fontWeight:500 }}>Tengo mascotas</label></div>
              {tenantProfile.hasPets && <div><label style={{ display:"block", fontSize:12, fontWeight:700, color:C.muted, marginBottom:6 }}>DETALLE MASCOTAS</label><input type="text" value={tenantProfile.petsDetail} onChange={e => set("petsDetail", e.target.value)} placeholder="Ej: 1 perro pequeño" style={inputStyle} /></div>}
            </div>
            <hr style={{ border:0, borderTop:`1px solid ${C.border}`, margin:"24px 0" }} />
            {!isVerified ? (
              <div style={{ textAlign:"center" }}>
                <p style={{ fontSize:13, color:C.muted, marginBottom:12 }}>Verificá tu identidad para destacarte ante los dueños y conseguir visitas más rápido.</p>
                <button onClick={() => setIsVerified(true)} style={{ width:"100%", padding:"14px", background:C.blue, color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>🛡️ Subir DNI y Verificarse</button>
              </div>
            ) : (
              <div style={{ background:"#EFF6FF", border:`1px solid #BFDBFE`, padding:"16px", borderRadius:12, textAlign:"center" }}>
                <div style={{ color:C.blue, fontWeight:800, marginBottom:4, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><CheckBadgeIcon /> Identidad Validada</div>
                <div style={{ fontSize:13, color:"#60A5FA" }}>Tus datos son privados y están protegidos.</div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ width:80, height:80, borderRadius:16, background:C.accent, margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, color:"#fff", boxShadow:`0 4px 12px rgba(232,87,42,0.3)` }}>🏢</div>
            <h2 style={{ margin:0, fontSize:22, color:C.text }}>Inmobiliaria Muvit</h2>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:6, alignItems:"center" }}><span style={{ color:"#F59E0B", fontSize:14, fontWeight:800 }}>★ 4.9</span><span style={{ color:C.muted, fontSize:13 }}>· 124 reseñas</span></div>
          </div>
          <div style={{ background:C.surface, borderRadius:16, padding:20, border:`1px solid ${C.border}`, boxShadow:`0 2px 8px ${C.shadow}` }}>
            <h3 style={{ margin:"0 0 16px", fontSize:14, color:C.muted, textTransform:"uppercase", letterSpacing:1 }}>Resumen de Cuenta</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${C.border}`, paddingBottom:12 }}><span style={{ color:C.text, fontWeight:600 }}>Plan Actual</span><span style={{ background:`rgba(232,87,42,0.1)`, color:C.accent, padding:"4px 10px", borderRadius:8, fontWeight:800, fontSize:12 }}>PREMIUM PRO</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${C.border}`, paddingBottom:12 }}><span style={{ color:C.text, fontWeight:600 }}>Propiedades Activas</span><span style={{ color:C.muted, fontWeight:700 }}>{ownerPropertyCount} Publicaciones</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}><span style={{ color:C.text, fontWeight:600 }}>Matches este mes</span><span style={{ color:C.green, fontWeight:800 }}>+45 Leads</span></div>
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop:32, background:C.surface, borderRadius:16, padding:20, border:`1px solid ${C.border}`, boxShadow:`0 2px 8px ${C.shadow}` }}>
        <h3 style={{ margin:"0 0 4px", fontSize:16, color:C.text, display:"flex", alignItems:"center", gap:8 }}><SettingsIcon /> Ajustes</h3>
        <p style={{ margin:"0 0 16px", fontSize:13, color:C.muted }}>Opciones de la demo.</p>
        <button
          onClick={onResetDemo}
          style={{ width:"100%", padding:"14px", background:"#FEF2F2", color:C.danger, border:`1.5px solid #FECACA`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
        >
          🔄 Reiniciar demo
        </button>
        <p style={{ margin:"12px 0 0", fontSize:12, color:C.faint, lineHeight:1.5, textAlign:"center" }}>
          Borra solicitudes, visitas, boosts, créditos gastados y vuelve al estado inicial.
        </p>
      </div>
    </div>
  );
}

// ─── PROPERTY DETAIL ─────────────────────────────────────────────────────────
function PropertyDetail({ property, onClose, onSwipe, showActions = true }: any) {
  const [visible, setVisible] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: `¡Hola! 👋 Soy el asistente de "${property.title}". ¿Qué querés saber?` }]);
  const [typing, setTyping] = useState(false);

  useEffect(() => { const frame = requestAnimationFrame(() => setVisible(true)); return () => cancelAnimationFrame(frame); }, []);

  const close = () => { setVisible(false); setTimeout(onClose, 320); };
  const handleAction = (dir: string) => { close(); setTimeout(() => onSwipe(property.id, dir), 200); };
  const askAI = (key: string) => { const q = AI_QUESTIONS.find(a => a.key === key); if(!q) return; setMessages(prev => [...prev, { from: "user", text: q.label }]); setTyping(true); setTimeout(() => { setMessages(prev => [...prev, { from: "bot", text: property.aiAnswers[key] }]); setTyping(false); }, 850); };

  const AMENITY_ICONS: Record<string, string> = { "Wi-Fi incluido":"📶","Wi-Fi":"📶","Aire acondicionado":"❄️","Lavarropas":"🫧","Cocina equipada":"🍳","Cocina nueva":"🍳","Seguridad 24hs":"🔒","Baulera":"📦","Piscina":"🏊","Gimnasio":"💪","SUM":"🎉","Cochera doble":"🚗","Smart home":"🏠","Amoblado completo":"🛋️","Patio compartido":"🌿","Calefacción central":"🔥","Bicicleta incluida":"🚲","Bicicleta parking":"🚲","Balcón":"🌆","A estrenar":"✨","Jardín 60m²":"🌳","Parrilla":"🥩","Garage doble":"🚙","Quincho":"🏡","Alarma":"🚨","Aire central":"❄️" };

  return (
    <div style={{ position:"absolute", inset:0, zIndex:50, transform: visible ? "translateX(0)" : "translateX(100%)", transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", background: C.bg, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px 12px", background:C.surface, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <button onClick={close} style={{ width:36, height:36, borderRadius:12, background:C.bg, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.text, flexShrink:0 }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:18,height:18}}><polyline points="15 18 9 12 15 6"/></svg></button>
        <div style={{ flex:1 }}><div style={{ color:C.text, fontWeight:800, fontSize:16, lineHeight:1.2 }}>{property.title}</div><div style={{ color:C.muted, fontSize:12, display:"flex", alignItems:"center", gap:3, marginTop:2 }}><PinIcon/>{property.location}</div></div>
        <div style={{ background:C.accent, borderRadius:12, padding:"6px 12px", color:"#fff", fontWeight:800, fontSize:14, flexShrink:0 }}>{property.price}</div>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>
        <div style={{ height:220, overflow:"hidden", position:"relative" }}><PropertyPhoto property={property} /><div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(247,245,242,0.8) 0%, transparent 60%)" }}/></div>
        <div style={{ padding:"0 16px 24px" }}>
          <div style={{ display:"flex", gap:10, marginTop:16, marginBottom:18 }}>
            {[{ icon:<BedIcon/>, label:`${property.rooms} ambientes` }, { icon:<DropIcon/>, label:`${property.baths} baño${property.baths>1?"s":""}` }, { icon:<MaxIcon/>, label:`${property.sqm} m²` }].map((s,i) => (<div key={i} style={{ flex:1, background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:"10px 8px", display:"flex", flexDirection:"column", alignItems:"center", gap:5, boxShadow:`0 2px 6px ${C.shadow}` }}><span style={{ color:C.accent }}>{s.icon}</span><span style={{ color:C.text, fontSize:12, fontWeight:700, textAlign:"center" }}>{s.label}</span></div>))}
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:18 }}>{property.tags.map((tag: string) => <span key={tag} style={{ background:`rgba(232,87,42,0.08)`, border:`1.5px solid rgba(232,87,42,0.2)`, color:C.accent, fontSize:12, padding:"5px 12px", borderRadius:20, fontWeight:700 }}>{tag}</span>)}</div>
          <div style={{ marginBottom:20 }}><div style={{ color:C.muted, fontSize:13, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.8px" }}>Descripción</div><p style={{ color:C.text, fontSize:14, lineHeight:1.65, margin:0 }}>{property.description}</p></div>
          <div style={{ marginBottom:20 }}><div style={{ color:C.muted, fontSize:13, fontWeight:700, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.8px" }}>Comodidades</div><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>{property.amenities.map((a: string) => <div key={a} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"9px 12px", display:"flex", alignItems:"center", gap:8, fontSize:13, color:C.text, fontWeight:600, boxShadow:`0 1px 4px ${C.shadow}` }}><span style={{fontSize:16}}>{AMENITY_ICONS[a] || "✅"}</span>{a}</div>)}</div></div>
          <PropertyMap property={property} />
          <button onClick={() => setShowAI(true)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:`rgba(232,87,42,0.07)`, border:`1.5px solid rgba(232,87,42,0.25)`, borderRadius:14, padding:"12px 16px", cursor:"pointer", color:C.accent, fontWeight:700, fontSize:14, marginBottom:8 }}><BotIcon/> Preguntar a la IA sobre esta propiedad</button>
        </div>
      </div>
      {showActions && (
        <div style={{ display:"flex", gap:12, padding:"12px 16px 16px", background:C.surface, borderTop:`1px solid ${C.border}`, flexShrink:0, boxShadow:`0 -2px 16px ${C.shadow}` }}>
          <button onClick={() => handleAction("left")} style={{ flex:1, padding:"13px", borderRadius:14, background:C.bg, border:`2px solid ${C.border}`, color:C.muted, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:18,height:18}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Pasar</button>
          <button onClick={() => handleAction("right")} style={{ flex:2, padding:"13px", borderRadius:14, background:`linear-gradient(135deg,${C.accent},${C.accentL})`, border:"none", color:"#fff", fontWeight:800, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:`0 6px 20px rgba(232,87,42,0.35)` }}><HeartIcon filled/> Me interesa</button>
        </div>
      )}

      {showAI && (
        <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(30,20,10,0.45)", backdropFilter:"blur(6px)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={() => setShowAI(false)}>
          <div style={{ width:"100%", maxWidth:440, background:C.surface, borderRadius:"24px 24px 0 0", border:`1px solid ${C.border}`, paddingBottom:24, maxHeight:"72vh", display:"flex", flexDirection:"column", boxShadow:`0 -16px 60px ${C.shadowM}` }} onClick={e => e.stopPropagation()}>
            <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}><div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg, ${C.accent}, ${C.accentL})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}><BotIcon/></div><div><div style={{ color:C.text, fontWeight:800, fontSize:15 }}>Asistente Muvit</div><div style={{ color:C.green, fontSize:11, display:"flex", alignItems:"center", gap:4, fontWeight:600 }}><span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block" }}/>En línea</div></div></div>
              <button onClick={() => setShowAI(false)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:10, padding:"6px 8px", cursor:"pointer", color:C.muted, display:"flex" }}><CloseIcon/></button>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"14px 18px", display:"flex", flexDirection:"column", gap:10 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.from==="user"?"flex-end":"flex-start" }}>
                  <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius: m.from==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.from==="user" ? `linear-gradient(135deg,${C.accent},${C.accentL})` : C.bg, color: m.from==="user" ? "#fff" : C.text, fontSize:14, lineHeight:1.55, border: m.from==="user" ? "none" : `1px solid ${C.border}` }}>{m.text}</div>
                </div>
              ))}
              {typing && <div style={{ display:"flex", justifyContent:"flex-start" }}><div style={{ padding:"10px 14px", borderRadius:"18px 18px 18px 4px", background:C.bg, border:`1px solid ${C.border}`, color:C.muted, fontSize:14 }}>Escribiendo…</div></div>}
            </div>
            <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ color:C.faint, fontSize:11, fontWeight:600, paddingLeft:4, letterSpacing:"0.5px", textTransform:"uppercase" }}>Preguntas frecuentes</div>
              {AI_QUESTIONS.map(q => <button key={q.key} onClick={() => askAI(q.key)} style={{ background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"10px 14px", color:C.text, fontSize:13, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", fontWeight:600 }}>{q.label}<span style={{ color:C.accent }}><SendIcon/></span></button>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
function MuvitApp({ onLogout }: { onLogout: () => void }) {
  const [role, setRole] = useState("inquilino"); 
  const [tab, setTab] = useState("swipe");
  const [tenantVerified, setTenantVerified] = useState(false);
  const [tenantProfile, setTenantProfile] = useState<TenantProfile>(DEFAULT_TENANT_PROFILE);
  const [globalRequests, setGlobalRequests] = useState<any[]>(loadStoredRequests);
  const [listings, setListings] = useState<PropertyListing[]>(INITIAL_LISTINGS);
  const [selectedCityId, setSelectedCityId] = useState(loadSelectedCity);
  const [showCityPicker, setShowCityPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem(GLOBAL_REQUESTS_STORAGE_KEY, JSON.stringify(globalRequests));
  }, [globalRequests]);

  useEffect(() => {
    localStorage.setItem(SELECTED_CITY_STORAGE_KEY, selectedCityId);
  }, [selectedCityId]);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>(INITIAL_CALENDAR_DAYS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ownerCredits, setOwnerCredits] = useState(INITIAL_OWNER_CREDITS);
  const [boostedProperties, setBoostedProperties] = useState<number[]>([]);
  const [tabBeforeCredits, setTabBeforeCredits] = useState("propiedades");

  const selectedCity = CITIES.find(c => c.id === selectedCityId) ?? CITIES[0];
  const cityListings = listings.filter(p => p.cityId === selectedCityId);
  const ownerListings = cityListings.filter(p => p.ownerName === OWNER_NAME);
  const cityListingIds = new Set(cityListings.map(p => p.id));
  const cityRequests = globalRequests.filter((r: any) => cityListingIds.has(r.propId));
  const availableSlots = getAvailableSlotLabels(calendarDays);

  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [swipeFromDetail, setSwipeFromDetail] = useState<{ id: number; dir: string } | null>(null);

  useEffect(() => {
    setSelectedProperty(null);
  }, [tab]);

  useEffect(() => {
    setSelectedProperty(null);
  }, [selectedCityId]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  }, []);

  const handleSwipeFromDetail = useCallback((id: number, dir: string) => setSwipeFromDetail({ id, dir }), []);
  const clearExternalSwipe = useCallback(() => setSwipeFromDetail(null), []);

  const sendInterest = useCallback((prop: PropertyListing, isSuperlike = false) => {
    setGlobalRequests(prev => [buildRequestFromProfile(prop, tenantProfile, tenantVerified, isSuperlike), ...prev]);
  }, [tenantProfile, tenantVerified]);

  const boostProperty = useCallback((id: number) => {
    if (boostedProperties.includes(id)) {
      setBoostedProperties(prev => prev.filter(x => x !== id));
      return;
    }
    if (ownerCredits <= 0) {
      showToast("No tenés créditos suficientes para destacar una propiedad.");
      return;
    }
    setOwnerCredits(c => Math.max(0, c - 1));
    setBoostedProperties(prev => [...prev, id]);
    showToast("¡Propiedad destacada! Aparecerá primero para los inquilinos.");
  }, [boostedProperties, ownerCredits, showToast]);

  const updateRequestStatus = useCallback((id: number, newStatus: string) => {
    setGlobalRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (newStatus === "approved") setOwnerCredits(c => Math.max(0, c - 1));
  }, []);

  const openCredits = useCallback(() => {
    setTabBeforeCredits(tab);
    setTab("creditos");
  }, [tab]);

  const closeCredits = useCallback(() => setTab(tabBeforeCredits), [tabBeforeCredits]);

  const scheduleRequest = useCallback((id: number, time: string) => {
    const slotRef = findSlotByLabel(calendarDays, time);
    setGlobalRequests(prev => prev.map(req => req.id === id ? { ...req, status: "scheduled", time, scheduledSlot: slotRef } : req));
    if (slotRef) {
      setCalendarDays(prev => prev.map(day =>
        day.dateKey === slotRef.dateKey
          ? { ...day, slots: day.slots.map(s => s.id === slotRef.slotId ? { ...s, available: false } : s) }
          : day
      ));
    }
  }, [calendarDays]);

  const addListing = useCallback((prop: PropertyListing) => {
    setListings(prev => [prop, ...prev]);
  }, []);

  const updateListing = useCallback((prop: PropertyListing) => {
    setListings(prev => prev.map(p => p.id === prop.id ? prop : p));
    setSelectedProperty(cur => cur?.id === prop.id ? prop : cur);
  }, []);

  const toggleCalendarSlot = useCallback((dateKey: string, slotId: string) => {
    setCalendarDays(prev => prev.map(day =>
      day.dateKey === dateKey
        ? { ...day, slots: day.slots.map(s => s.id === slotId ? { ...s, available: !s.available } : s) }
        : day
    ));
  }, []);

  const resetDemo = useCallback(() => {
    if (!window.confirm("¿Reiniciar la demo?\n\nSe borrarán solicitudes, visitas, boosts y todos los cambios. Volvés al estado inicial.")) return;
    localStorage.removeItem(GLOBAL_REQUESTS_STORAGE_KEY);
    localStorage.removeItem(SELECTED_CITY_STORAGE_KEY);
    setRole("inquilino");
    setTab("swipe");
    setTenantVerified(false);
    setTenantProfile(DEFAULT_TENANT_PROFILE);
    setGlobalRequests([]);
    setListings(INITIAL_LISTINGS);
    setSelectedCityId(CITIES[0].id);
    setCalendarDays(JSON.parse(JSON.stringify(INITIAL_CALENDAR_DAYS)));
    setOwnerCredits(INITIAL_OWNER_CREDITS);
    setBoostedProperties([]);
    setSelectedProperty(null);
    setSwipeFromDetail(null);
    setShowCityPicker(false);
    setTabBeforeCredits("propiedades");
    showToast("Demo reiniciada. ¡Empezá de nuevo!");
  }, [showToast]);

  const navItems = role === 'inquilino' ? [
    { id:"swipe", icon:<HomeIcon/>, label:"Explorar" },
    { id:"visitas", icon:<CalendarIcon/>, label:"Visitas" },
    { id:"perfil", icon:<UserIcon/>, label:"Mi Perfil" },
  ] : [
    { id:"propiedades", icon:<BuildingIcon/>, label:"Propiedades" },
    { id:"solicitudes", icon:<ClipboardIcon/>, label:"Solicitudes" },
    { id:"calendario", icon:<CalendarIcon/>, label:"Calendario" },
    { id:"perfil", icon:<UserIcon/>, label:"Mi Perfil" },
  ];

  return (
    <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#EDE9E3", fontFamily:"'Montserrat', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#EDE9E3; font-family: 'Montserrat', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        button { font-family:inherit; }
        button:hover { opacity:0.88; transform:scale(0.98); }
        select, select option { color: #1A1A1A; background-color: #F7F5F2; }
        input, textarea { color: #1A1A1A; }
        @keyframes toastIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ width:"100%", maxWidth:440, height:"100vh", maxHeight:860, background:C.bg, display:"flex", flexDirection:"column", overflow:"hidden", border:`1px solid ${C.border}`, boxShadow:`0 20px 80px rgba(100,60,20,0.12)`, position:"relative", colorScheme:"light" }}>
        <div style={{ padding:"14px 20px 11px", background:C.surface, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, boxShadow:`0 1px 12px rgba(60,40,20,0.06)`, position:"relative", minHeight:52 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
            <div style={{ width:34, height:34, borderRadius:11, background:`linear-gradient(135deg,${C.accent},${C.accentL})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:`0 3px 10px rgba(232,87,42,0.3)`, flexShrink:0 }}>🏠</div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:21, fontWeight:800, lineHeight:1, color:C.accent, letterSpacing:"-0.5px" }}>muvit</div>
              <div style={{ color:C.faint, fontSize:10, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {tab === "creditos" ? "Créditos" : (navItems.find(i => i.id === tab)?.label || "Mi cuenta")}
              </div>
            </div>
          </div>
          <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", zIndex:1 }}>
            {role === "dueño" && tab !== "creditos" && (
              <button onClick={openCredits} style={{ background:`rgba(59,130,246,0.1)`, border:`1.5px solid rgba(59,130,246,0.25)`, borderRadius:20, padding:"4px 11px", color:C.blue, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>Créditos: {ownerCredits}</button>
            )}
            {role === "dueño" && tab === "creditos" && (
              <button onClick={closeCredits} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:20, padding:"4px 11px", color:C.muted, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>← Volver</button>
            )}
          </div>
          <div style={{ flex:1, display:"flex", justifyContent:"flex-end", alignItems:"center", gap:6, minWidth:0 }}>
            <button onClick={() => setShowCityPicker(true)} style={{ background:`rgba(232,87,42,0.08)`, border:`1.5px solid rgba(232,87,42,0.2)`, borderRadius:20, padding:"4px 11px", color:C.accent, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:4 }}>
              {selectedCity.name} {selectedCity.flag}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width:12, height:12, opacity:0.7 }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button onClick={onLogout} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:20, padding:"4px 10px", color:C.muted, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
              Salir
            </button>
          </div>
        </div>
        {showCityPicker && <CityPickerModal selectedCityId={selectedCityId} onSelect={setSelectedCityId} onClose={() => setShowCityPicker(false)} />}

        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
          {toastMessage && <InterestToast message={toastMessage} />}
          {tab==="swipe" && role==="inquilino" && <SwipeScreen key={selectedCityId} listings={cityListings} boostedPropertyIds={boostedProperties} onOpen={setSelectedProperty} externalSwipe={swipeFromDetail} onExternalSwipeDone={clearExternalSwipe} onSendInterest={sendInterest} onToast={showToast} />}
          {tab==="visitas" && role==="inquilino" && <VisitasScreen globalRequests={cityRequests} onScheduleRequest={scheduleRequest} availableSlots={availableSlots} listings={cityListings} onOpenProperty={setSelectedProperty} />}
          {tab==="propiedades" && role==="dueño" && <OwnerPropertiesScreen properties={ownerListings} onAddProperty={addListing} onUpdateProperty={updateListing} cityId={selectedCityId} boostedPropertyIds={boostedProperties} onBoostProperty={boostProperty} ownerCredits={ownerCredits} />}
          {tab==="creditos" && role==="dueño" && <CreditsScreen credits={ownerCredits} onBack={closeCredits} />}
          {tab==="solicitudes" && role==="dueño" && <SolicitudesScreen globalRequests={globalRequests} onUpdateRequestStatus={updateRequestStatus} ownerCredits={ownerCredits} />}
          {tab==="calendario" && role==="dueño" && <CalendarioScreen calendarDays={calendarDays} onToggleSlot={toggleCalendarSlot} globalRequests={globalRequests} />}
          {tab==="perfil" && <ProfileScreen role={role} setRole={setRole} setTab={setTab} isVerified={tenantVerified} setIsVerified={setTenantVerified} tenantProfile={tenantProfile} onUpdateTenantProfile={setTenantProfile} ownerPropertyCount={ownerListings.length} onResetDemo={resetDemo} />}
          {selectedProperty && <PropertyDetail property={selectedProperty} onClose={() => setSelectedProperty(null)} onSwipe={handleSwipeFromDetail} showActions={tab === "swipe"} />}
        </div>

        <div style={{ display:"flex", background:C.surface, borderTop:`1px solid ${C.border}`, flexShrink:0, boxShadow:`0 -1px 12px rgba(60,40,20,0.06)` }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, padding:"11px 0", background:"none", border:"none", cursor:"pointer", color: tab===item.id && tab !== "creditos" ? C.accent : C.faint, transition:"color 0.2s", position:"relative" }}>
              {tab===item.id && tab !== "creditos" && <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:30, height:2.5, background:`linear-gradient(90deg,${C.accent},${C.accentL})`, borderRadius:"0 0 3px 3px" }}/>}
              {item.icon}
              <span style={{ fontSize: role === "dueño" ? 9 : 10, fontWeight:700, letterSpacing:"0.2px", lineHeight:1.2, textAlign:"center", maxWidth:72 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    } catch {
      // If sessionStorage is unavailable, clearing React state is enough for this session.
    }
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  return <MuvitApp onLogout={handleLogout} />;
}
