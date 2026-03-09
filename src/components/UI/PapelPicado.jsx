import { PICADO } from '../../styles/designTokens';


const PapelPicado = ({ flip = false, count = 16, height = 44 }) => {
  const w = 100 / count;

  return (
    <div style={{
      width: "100%",
      lineHeight: 0,
      flexShrink: 0,
      transform: flip ? "scaleY(-1)" : "none",
    }}>
      <svg
        viewBox={`0 0 100 12`}
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: `${height}px` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: count }).map((_, i) => {
          const x = i * w;
          return (
            <polygon
              key={i}
              points={`${x},0 ${x + w},0 ${x + w / 2},12`}
              fill={PICADO[i % PICADO.length]}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default PapelPicado;