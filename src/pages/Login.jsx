import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { C, FONT, ROLE_COLORS, glow } from '../styles/designTokens';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Utensils } from 'lucide-react';

/* ─── PAPEL PICADO ───────────────────────────────────────────── */
const PICADO = [C.pink, C.orange, C.yellow, C.teal, C.purple, C.pinkDim, C.orangeDim, C.tealDim];

function PapelPicado() {
  return (
    <div style={{ width: "100%", lineHeight: 0 }}>
      <div style={{ display: "flex", width: "100%" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 0,
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderTop: `32px solid ${PICADO[i % PICADO.length]}`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── DEMO ROLES ─────────────────────────────────────────────── */
const DEMO_ROLES = [
  { label: "Admin",  email: "admin@itaquito.com",  password: "Admin123!",  color: ROLE_COLORS.admin  },
  { label: "Mesero", email: "mesero@itaquito.com", password: "mesero123", color: ROLE_COLORS.mesero },
  { label: "Caja",   email: "caja@itaquito.com",   password: "caja123",   color: ROLE_COLORS.caja   },
  { label: "Cliente",email: "cliente@itaquito.com",password: "cliente123",color: ROLE_COLORS.cliente },
];

/* ─── INPUT COMPONENT ────────────────────────────────────────── */
function InputField({ id, type, label, value, onChange, Icon, extra }) {
  const [focused, setFocused] = useState(false);
  const filled = value?.length > 0;

  return (
    <div style={{ position: "relative", marginBottom: "16px" }}>
      {/* Icono izquierdo */}
      <div style={{
        position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
        color: focused ? C.pink : C.textMuted, transition: "color 0.2s", zIndex: 1,
      }}>
        <Icon size={16} />
      </div>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        required
        style={{
          width: "100%",
          background: C.bg,
          border: `1.5px solid ${focused ? C.pink : C.border}`,
          borderRadius: "10px",
          padding: "18px 44px 8px 42px",
          color: C.textPrimary,
          fontFamily: FONT,
          fontSize: "14px",
          fontWeight: "500",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? glow(C.pink, "22") : "none",
          boxSizing: "border-box",
        }}
      />
      {/* Label flotante */}
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "42px",
          top: focused || filled ? "8px" : "50%",
          transform: focused || filled ? "translateY(0)" : "translateY(-50%)",
          fontSize: focused || filled ? "10px" : "14px",
          color: focused ? C.pink : C.textMuted,
          fontFamily: FONT,
          fontWeight: "600",
          letterSpacing: focused || filled ? "0.8px" : "0",
          textTransform: focused || filled ? "uppercase" : "none",
          transition: "all 0.2s ease",
          pointerEvents: "none",
        }}
      >
        {label}
      </label>

      {/* Slot extra (ej: ojo de contraseña) */}
      {extra && (
        <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
          {extra}
        </div>
      )}
    </div>
  );
}

/* ─── LOGIN ──────────────────────────────────────────────────── */
const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginService(email, password);
      loginUser(res.data.user, res.data.token);

      if (res.data.user.rol === 'admin') {
        navigate('/admin/productos');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };
  const fillCredentials = (e, p) => {
    setEmail(e);
    setPassword(p);
    setError('');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: FONT,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Orbes de fondo */}
      <div style={{ position: "fixed", top: "-100px", left: "-100px",  width: "400px", height: "400px", borderRadius: "50%", background: `${C.pink}08`,   filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: `${C.teal}08`,  filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "40%", left: "40%",         width: "300px", height: "300px", borderRadius: "50%", background: `${C.orange}06`, filter: "blur(60px)", pointerEvents: "none" }} />

      {/* ── CARD ── */}
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: C.bgCard,
        border: `1.5px solid ${C.border}`,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${C.borderBright}`,
      }}>

        {/* Papel picado top */}
        <PapelPicado />

        {/* Header de la card */}
        <div style={{ padding: "28px 32px 0", textAlign: "center" }}>
          {/* Logo */}
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px",
            background: `${C.pink}22`,
            border: `1.5px solid ${C.pink}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: glow(C.pink),
          }}>
            <Utensils size={26} color={C.pink} />
          </div>

          <h1 style={{
            margin: "0 0 6px",
            fontSize: "28px",
            fontWeight: "800",
            color: C.pink,
            letterSpacing: "-0.5px",
            textShadow: `0 0 20px ${C.pink}44`,
          }}>
            iTaquito
          </h1>
          <p style={{
            margin: "0 0 4px",
            color: C.textSecondary,
            fontSize: "13px",
            fontWeight: "500",
          }}>
            Sistema de gestión integral
          </p>
          {/* Línea sarape */}
          <div style={{ display: "flex", gap: "3px", justifyContent: "center", marginTop: "14px", marginBottom: "24px" }}>
            {[C.pink, C.orange, C.yellow, C.teal, C.purple].map((c, i) => (
              <div key={i} style={{ width: "28px", height: "3px", borderRadius: "2px", background: c, boxShadow: `0 0 6px ${c}88` }} />
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: "0 32px 32px" }}>

          {/* Error */}
          {error && (
            <div style={{
              background: `${C.pink}12`,
              border: `1px solid ${C.pink}44`,
              borderRadius: "10px",
              padding: "10px 14px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: C.pink,
              fontSize: "13px",
              fontWeight: "600",
            }}>
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              id="email"
              type="email"
              label="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              Icon={Mail}
            />

            <InputField
              id="password"
              type={showPass ? "text" : "password"}
              label="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              Icon={Lock}
              extra={
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: 0, display: "flex" }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? C.bgAccent : C.pink,
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "13px",
                fontFamily: FONT,
                fontWeight: "800",
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "8px",
                transition: "all 0.2s",
                boxShadow: loading ? "none" : glow(C.pink),
                letterSpacing: "0.3px",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = glow(C.pink, "88"); }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.boxShadow = glow(C.pink); }}
            >
              {loading
                ? <><span style={{ opacity: 0.7 }}>Ingresando...</span></>
                : <><LogIn size={16} /> Ingresar</>
              }
            </button>
          </form>

          {/* Demo roles */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${C.border}` }}>
            <p style={{ color: C.textMuted, fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center", marginBottom: "10px" }}>
              Acceso rápido — Demo
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {DEMO_ROLES.map(({ label, email: e, password: p, color }) => (
                <button
                  key={label}
                  onClick={() => fillCredentials(e, p)}
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}44`,
                    borderRadius: "8px",
                    padding: "8px 10px",
                    color: color,
                    fontFamily: FONT,
                    fontWeight: "700",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${color}22`;
                    e.currentTarget.style.boxShadow = `0 0 8px ${color}33`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${color}12`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Papel picado bottom */}
        <div style={{ transform: "scaleY(-1)" }}>
          <PapelPicado />
        </div>
      </div>

      {/* Footer */}
      <p style={{ marginTop: "24px", color: C.textMuted, fontSize: "12px", textAlign: "center" }}>
        © {new Date().getFullYear()} iTaquito · Hecho con ♥ en México
      </p>
    </div>
  );
};

export default Login;
