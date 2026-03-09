import { useState } from 'react';
import { C, FONT, glow } from '../../styles/designTokens';


const VARIANTS = {
  primary: {
    bg:         C.pink,
    bgHov:      C.pinkDim,
    color:      "#fff",
    border:     C.pink,
    shadow:     glow(C.pink),
    shadowHov:  glow(C.pink, "88"),
  },
  secondary: {
    bg:         "transparent",
    bgHov:      `${C.pink}12`,
    color:      C.textSecondary,
    colorHov:   C.textPrimary,
    border:     C.border,
    borderHov:  C.borderBright,
    shadow:     "none",
    shadowHov:  "none",
  },
  danger: {
    bg:         `${C.pink}15`,
    bgHov:      `${C.pink}28`,
    color:      C.pink,
    border:     `${C.pink}55`,
    borderHov:  C.pink,
    shadow:     "none",
    shadowHov:  glow(C.pink, "33"),
  },
  ghost: {
    bg:         "transparent",
    bgHov:      C.bgCardHov,
    color:      C.textMuted,
    colorHov:   C.textSecondary,
    border:     "transparent",
    borderHov:  C.border,
    shadow:     "none",
    shadowHov:  "none",
  },
  success: {
    bg:         `${C.teal}18`,
    bgHov:      `${C.teal}28`,
    color:      C.teal,
    border:     `${C.teal}55`,
    borderHov:  C.teal,
    shadow:     "none",
    shadowHov:  glow(C.teal, "33"),
  },
  warning: {
    bg:         C.yellow,
    bgHov:      C.yellowDim,
    color:      C.bg,
    border:     C.yellow,
    shadow:     glow(C.yellow, "44"),
    shadowHov:  glow(C.yellow, "77"),
  },
};

const SIZES = {
  sm: { padding: "6px 14px",  fontSize: "12px", iconSize: "30px", gap: "5px"  },
  md: { padding: "9px 20px",  fontSize: "13px", iconSize: "36px", gap: "7px"  },
  lg: { padding: "13px 28px", fontSize: "15px", iconSize: "44px", gap: "9px"  },
};

const Button = ({
  children,
  variant  = 'primary',
  size     = 'md',
  fullWidth = false,
  iconOnly  = false,
  icon,
  onClick,
  disabled = false,
  type     = 'button',
  style: extraStyle = {},
}) => {
  const [hov, setHov] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size]       || SIZES.md;

  const active = hov && !disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        // Layout
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:             iconOnly ? 0 : s.gap,
        width:           iconOnly ? s.iconSize : fullWidth ? "100%" : "auto",
        height:          iconOnly ? s.iconSize : "auto",
        padding:         iconOnly ? 0 : s.padding,

        // Tipografía
        fontFamily:  FONT,
        fontWeight:  "700",
        fontSize:    s.fontSize,
        letterSpacing: "0.2px",
        whiteSpace:  "nowrap",

        // Color
        background:  disabled ? C.bgAccent     : active && v.bgHov  ? v.bgHov  : v.bg,
        color:       disabled ? C.textMuted     : active && v.colorHov ? v.colorHov : v.color,
        border:      `1.5px solid ${disabled ? C.border : active && v.borderHov ? v.borderHov : v.border}`,

        // Forma
        borderRadius: iconOnly ? "10px" : "10px",

        // Efectos
        boxShadow:  disabled ? "none" : active ? v.shadowHov : v.shadow,
        transform:  active && !disabled ? "translateY(-1px)" : "translateY(0)",
        opacity:    disabled ? 0.45 : 1,
        cursor:     disabled ? "not-allowed" : "pointer",
        transition: "all 0.18s ease",

        ...extraStyle,
      }}
    >
      {icon && <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</span>}
      {!iconOnly && children}
    </button>
  );
};

export default Button;