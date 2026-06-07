export const PALETTE = {
  cream: "#fbf6ee",
  sand: "#efe5d2",
  forest: "#33482d",
  olive: "#66744a",
  earth: "#6a4531",
  gold: "#c8a15a",
  taupe: "#bca689",
  charcoal: "#2c2b28",
  card: "#fefcf9",
} as const;

export const SEMANTIC = {
  background: PALETTE.cream,
  foreground: PALETTE.charcoal,
  primary: PALETTE.forest,
  primaryHover: PALETTE.olive,
  muted: PALETTE.taupe,
  border: PALETTE.taupe,
  surface: PALETTE.sand,
  accent: PALETTE.gold,
  overlay: PALETTE.charcoal,
  onPrimary: PALETTE.cream,
  error: PALETTE.earth,
  success: PALETTE.forest,
} as const;
