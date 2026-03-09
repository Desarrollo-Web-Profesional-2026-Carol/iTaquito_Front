
export const C = {
  // ── Colores de acento  ──────────────────────────────
  pink:          "#E83E8C",   // Rosa Mexicano 
  pinkDim:       "#C0306E",
  pinkLight:     "#F06DAA",

  orange:        "#F9690E",   // Naranja Intenso 
  orangeDim:     "#C9520A",
  orangeLight:   "#FAA55A",

  yellow:        "#F4D03F",   // Amarillo Eléctrico —
  yellowDim:     "#C4A810",

  teal:          "#1ABC9C",   // Turquesa 
  tealDim:       "#148F77",
  tealLight:     "#48C9B0",

  purple:        "#9B59B6",   // Morado Vibrante 
  purpleDim:     "#7D3C98",
  purpleLight:   "#B07CC6",

  // ── Fondos oscuros (jerarquía de profundidad) ──────────────────
  bg:            "#0F0D0B",   // Fondo principal 
  bgCard:        "#1A1612",   // Cards y paneles
  bgCardHov:     "#221E18",   // Card en hover
  bgAccent:      "#251F18",   // Header, footer, barras

  // ── Bordes ────────────────────────────────────────────────────
  border:        "#2E2820",   // Borde estándar
  borderBright:  "#3D3428",   // Borde destacado

  // ── Textos ────────────────────────────────────────────────────
  cream:         "#F5EDD8",   // Blanco cálido para títulos
  textPrimary:   "#F0E6D0",   // Texto principal
  textSecondary: "#9A8870",   // Texto secundario / subtítulos
  textMuted:     "#5C5040",   // Texto desactivado / placeholders

  // ── Utilidades ────────────────────────────────────────────────
  white:         "#FFFFFF",
  success:       "#1ABC9C",   // Verde 
  error:         "#E83E8C",   // Error 
  warning:       "#F4D03F",   // Advertencia 
};

// ─── FUENTE ───────────────────────────────────────────────────────
// Agregar en index.html:
// <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&display=swap" rel="stylesheet">
export const FONT = "'Quicksand', sans-serif";

// ─── PAPEL PICADO ─────────────────────────────────────────────────
export const PICADO = [
  C.pink,
  C.orange,
  C.yellow,
  C.teal,
  C.purple,
  C.pinkDim,
  C.orangeDim,
  C.tealDim,
  C.purpleDim,
];

// ─── COLORES POR ROL ──────────────────────────────────────────────
export const ROLE_COLORS = {
  admin:   C.pink,
  mesero:  C.orange,
  caja:    C.yellow,
  cliente: C.teal,
};

// ─── SOMBRAS (helpers) ───────────────────────────────────────
// Se eliminaron todas las sombras fosforescentes/neón a petición del usuario.
export const glow = (color, intensity = "22") => "none";

export const glowLg = (color, intensity = "15") => "none";