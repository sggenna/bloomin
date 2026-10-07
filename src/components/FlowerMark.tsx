const ANGLES = Array.from({ length: 12 }, (_, i) => i * 30)

const FlowerMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 77 74" fill="currentColor" aria-hidden="true" className={className}>
    {ANGLES.map((angle) => (
      <ellipse key={angle} cx={38.5} cy={13} rx={5} ry={13} transform={`rotate(${angle} 38.5 37)`} />
    ))}
  </svg>
)

export default FlowerMark
