import type { ReactNode } from "react";

/**
 * Original explanatory diagrams, drawn inline as SVG.
 *
 * These exist because a mechanism is often far easier to see than to read —
 * the shape of an inverted curve, the arithmetic of a buyback, the way a fee
 * compounds. They are also the only images on the site that are genuinely ours
 * rather than stock photography.
 *
 * Authored in MDX as an image with a `diagram:` protocol, so no raw HTML has to
 * be enabled in the markdown pipeline:
 *
 *     ![The shape of a normal and an inverted curve](diagram:yield-curve)
 *
 * The alt text becomes the caption AND the accessible description. Every
 * diagram uses `currentColor` and the theme tokens, so it works in both themes.
 */

const AXIS = "var(--color-border-strong)";
const INK = "var(--color-foreground)";
const MUTED = "var(--color-muted-foreground)";
const UP = "var(--color-up)";
const DOWN = "var(--color-down)";
const PRIMARY = "var(--color-primary)";

function Frame({
  children,
  viewBox,
  label,
}: {
  children: ReactNode;
  viewBox: string;
  label: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className="h-auto w-full"
      style={{ maxWidth: "100%" }}
    >
      {children}
    </svg>
  );
}

const label = {
  fontSize: 13,
  fill: MUTED,
  fontFamily: "var(--font-sans)",
} as const;

const strong = {
  fontSize: 14,
  fill: INK,
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
} as const;

/** Normal, flat and inverted yield curves on one pair of axes. */
function YieldCurve() {
  return (
    <Frame
      viewBox="0 0 700 300"
      label="Three yield curve shapes. A normal curve slopes upward as maturity lengthens. A flat curve is roughly horizontal. An inverted curve slopes downward, with short maturities yielding more than long ones."
    >
      <line x1="70" y1="250" x2="600" y2="250" stroke={AXIS} strokeWidth="1.5" />
      <line x1="70" y1="40" x2="70" y2="250" stroke={AXIS} strokeWidth="1.5" />
      <text x="335" y="285" textAnchor="middle" style={label}>
        Maturity
      </text>
      <text x="20" y="145" style={label} transform="rotate(-90 20 145)">
        Yield
      </text>
      {["3M", "2Y", "5Y", "10Y", "30Y"].map((t, i) => (
        <text key={t} x={100 + i * 120} y="268" textAnchor="middle" style={label}>
          {t}
        </text>
      ))}

      <path d="M100 210 C 220 170, 340 130, 580 100" fill="none" stroke={UP} strokeWidth="2.5" />
      <text x="586" y="96" style={{ ...strong, fill: UP }}>
        Normal
      </text>

      <path d="M100 160 C 250 156, 400 154, 580 152" fill="none" stroke={MUTED} strokeWidth="2.5" strokeDasharray="5 4" />
      <text x="586" y="150" style={{ ...strong, fill: MUTED }}>
        Flat
      </text>

      <path d="M100 95 C 240 120, 380 175, 580 205" fill="none" stroke={DOWN} strokeWidth="2.5" />
      <text x="586" y="212" style={{ ...strong, fill: DOWN }}>
        Inverted
      </text>

      <text x="100" y="72" textAnchor="middle" style={label}>
        short end
      </text>
      <text x="540" y="72" textAnchor="middle" style={label}>
        long end
      </text>
    </Frame>
  );
}

/** Futures curve in contango and in backwardation, with the roll direction. */
function ContangoBackwardation() {
  return (
    <Frame
      viewBox="0 0 640 320"
      label="Two futures curves. In contango, later contracts cost more than nearer ones, so each roll sells a cheaper contract and buys a dearer one. In backwardation the curve slopes down and the roll works in the holder's favour."
    >
      <line x1="70" y1="260" x2="600" y2="260" stroke={AXIS} strokeWidth="1.5" />
      <line x1="70" y1="30" x2="70" y2="260" stroke={AXIS} strokeWidth="1.5" />
      <text x="335" y="296" textAnchor="middle" style={label}>
        Months to delivery
      </text>
      <text x="20" y="150" style={label} transform="rotate(-90 20 150)">
        Price
      </text>
      {["spot", "+1", "+2", "+3", "+4"].map((t, i) => (
        <text key={t} x={110 + i * 115} y="280" textAnchor="middle" style={label}>
          {t}
        </text>
      ))}

      <path d="M110 200 L225 178 L340 158 L455 140 L570 124" fill="none" stroke={DOWN} strokeWidth="2.5" />
      {[200, 178, 158, 140, 124].map((y, i) => (
        <circle key={i} cx={110 + i * 115} cy={y} r="4" fill={DOWN} />
      ))}
      <text x="576" y="120" style={{ ...strong, fill: DOWN }}>
        Contango
      </text>
      <text x="300" y="112" textAnchor="middle" style={{ ...label, fill: DOWN }}>
        roll sells low, buys high — costs you
      </text>

      <path d="M110 214 L225 228 L340 240 L455 249 L570 256" fill="none" stroke={UP} strokeWidth="2.5" />
      {[214, 228, 240, 249, 256].map((y, i) => (
        <circle key={i} cx={110 + i * 115} cy={y} r="4" fill={UP} />
      ))}
      <text x="430" y="228" style={{ ...strong, fill: UP }}>
        Backwardation
      </text>

      <path d="M225 192 L332 172" stroke={DOWN} strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowdown)" />
      <defs>
        <marker id="arrowdown" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={DOWN} />
        </marker>
      </defs>
    </Frame>
  );
}

/** Two balances diverging under a one percentage point fee difference. */
function FeeCompounding() {
  // Same gross return; the only difference is the annual fee.
  const years = 40;
  const gross = 0.07;
  const path = (fee: number) => {
    const pts: string[] = [];
    let v = 10000;
    for (let y = 0; y <= years; y++) {
      const x = 80 + (y / years) * 500;
      const yPos = 250 - Math.min(210, ((v - 10000) / 140000) * 210);
      pts.push(`${x.toFixed(1)} ${yPos.toFixed(1)}`);
      v *= 1 + gross - fee;
    }
    return "M" + pts.join(" L");
  };
  return (
    <Frame
      viewBox="0 0 640 300"
      label="Two investment balances growing over forty years at the same gross return. The lower-fee balance pulls progressively further ahead, because the fee removes both the amount charged and all the growth it would have produced."
    >
      <line x1="80" y1="250" x2="600" y2="250" stroke={AXIS} strokeWidth="1.5" />
      <line x1="80" y1="25" x2="80" y2="250" stroke={AXIS} strokeWidth="1.5" />
      <text x="340" y="285" textAnchor="middle" style={label}>
        Years invested
      </text>
      <text x="24" y="140" style={label} transform="rotate(-90 24 140)">
        Balance
      </text>
      {[0, 10, 20, 30, 40].map((y) => (
        <text key={y} x={80 + (y / years) * 500} y="268" textAnchor="middle" style={label}>
          {y}
        </text>
      ))}
      <path d={path(0.001)} fill="none" stroke={UP} strokeWidth="2.5" />
      <path d={path(0.011)} fill="none" stroke={DOWN} strokeWidth="2.5" />
      <text x="470" y="52" style={{ ...strong, fill: UP }}>
        0.1% annual fee
      </text>
      <text x="470" y="132" style={{ ...strong, fill: DOWN }}>
        1.1% annual fee
      </text>
      <text x="470" y="150" style={label}>
        same gross return
      </text>
      <text x="92" y="42" style={label}>
        the gap is not one percent — it widens every year
      </text>
    </Frame>
  );
}

/** Buyback arithmetic: profit unchanged, share count down, EPS up. */
function BuybackEps() {
  const Col = ({
    x,
    title,
    shares,
    eps,
    accent,
  }: {
    x: number;
    title: string;
    shares: number;
    eps: string;
    accent: string;
  }) => (
    <g>
      <text x={x + 105} y="34" textAnchor="middle" style={strong}>
        {title}
      </text>
      {Array.from({ length: shares }).map((_, i) => (
        <rect
          key={i}
          x={x + (i % 10) * 22}
          y={56 + Math.floor(i / 10) * 22}
          width="17"
          height="17"
          rx="3"
          fill={accent}
          opacity={0.85}
        />
      ))}
      <text x={x + 105} y="196" textAnchor="middle" style={label}>
        {shares} shares
      </text>
      <text x={x + 105} y="228" textAnchor="middle" style={{ ...strong, fill: accent, fontSize: 22 }}>
        EPS {eps}
      </text>
    </g>
  );
  return (
    <Frame
      viewBox="0 0 640 260"
      label="The same profit of 100 divided by 50 shares gives earnings per share of 2. After buying back 10 shares, the same profit divided by 40 shares gives 2.5 — a 25 percent rise with no change in the business."
    >
      <Col x={30} title="Before" shares={50} eps="2.00" accent={MUTED} />
      <Col x={390} title="After buyback" shares={40} eps="2.50" accent={PRIMARY} />
      <text x={320} y="120" textAnchor="middle" style={{ ...strong, fontSize: 28, fill: MUTED }}>
        →
      </text>
      <text x={320} y="150" textAnchor="middle" style={label}>
        profit
      </text>
      <text x={320} y="168" textAnchor="middle" style={strong}>
        100
      </text>
      <text x={320} y="186" textAnchor="middle" style={label}>
        unchanged
      </text>
    </Frame>
  );
}

/** A long yield split into expectations and term premium. */
function TermPremium() {
  const Bar = ({ x, exp, prem, title }: { x: number; exp: number; prem: number; title: string }) => (
    <g>
      <rect x={x} y={230 - exp} width="90" height={exp} fill={PRIMARY} opacity={0.85} rx="3" />
      <rect x={x} y={230 - exp - prem} width="90" height={prem} fill={DOWN} opacity={0.75} rx="3" />
      <text x={x + 45} y="252" textAnchor="middle" style={label}>
        {title}
      </text>
    </g>
  );
  return (
    <Frame
      viewBox="0 0 720 290"
      label="A long-dated yield split into two parts: the average short rate expected over the bond's life, and the term premium demanded for holding duration. The two move independently, so a yield can rise even while rate expectations fall."
    >
      <line x1="60" y1="230" x2="600" y2="230" stroke={AXIS} strokeWidth="1.5" />
      <Bar x={110} exp={130} prem={20} title="Earlier" />
      <Bar x={300} exp={100} prem={75} title="Later" />
      <text x={455} y="118" style={{ ...strong, fill: DOWN }}>
        Term premium
      </text>
      <text x={455} y="138" style={label}>
        compensation for duration risk
      </text>
      <text x={455} y="186" style={{ ...strong, fill: PRIMARY }}>
        Expected short rates
      </text>
      <text x={455} y="206" style={label}>
        what policy is expected to do
      </text>
      <text x={205} y="44" textAnchor="middle" style={label}>
        expectations fell, premium rose more —
      </text>
      <text x={205} y="62" textAnchor="middle" style={label}>
        so the yield went up
      </text>
      <text x={155} y="272" textAnchor="middle" style={label}>
        total yield
      </text>
      <text x={345} y="272" textAnchor="middle" style={label}>
        higher total yield
      </text>
    </Frame>
  );
}

/** Order book depth ladder showing why a large order slips. */
function OrderBook() {
  const asks = [
    { p: "10.02", q: 800 },
    { p: "10.01", q: 300 },
    { p: "10.00", q: 200 },
  ];
  const bids = [
    { p: "9.99", q: 250 },
    { p: "9.98", q: 400 },
    { p: "9.97", q: 900 },
  ];
  return (
    <Frame
      viewBox="0 0 700 340"
      label="An order book ladder. A market order to buy 1,000 units takes all 200 available at 10.00, all 300 at 10.01, then 500 of the 800 at 10.02, producing an average fill above the quoted price."
    >
      <text x="120" y="26" style={strong}>
        Asks (sellers)
      </text>
      {asks.map((a, i) => (
        <g key={a.p}>
          <rect x="120" y={40 + i * 34} width={a.q / 4} height="26" fill={DOWN} opacity={0.3} rx="3" />
          <text x="72" y={58 + i * 34} style={label}>
            {a.p}
          </text>
          <text x={128 + a.q / 4} y={58 + i * 34} style={label}>
            {a.q}
          </text>
        </g>
      ))}
      <line x1="60" y1="152" x2="580" y2="152" stroke={AXIS} strokeDasharray="4 4" />
      <text x="62" y="146" style={{ ...label, fontSize: 12 }}>
        spread
      </text>
      <text x="120" y="182" style={strong}>
        Bids (buyers)
      </text>
      {bids.map((b, i) => (
        <g key={b.p}>
          <rect x="120" y={196 + i * 34} width={b.q / 4} height="26" fill={UP} opacity={0.3} rx="3" />
          <text x="72" y={214 + i * 34} style={label}>
            {b.p}
          </text>
          <text x={128 + b.q / 4} y={214 + i * 34} style={label}>
            {b.q}
          </text>
        </g>
      ))}
      <text x="330" y="304" style={{ ...strong, fontSize: 13 }}>
        Buying 1,000 at market fills at 10.00, 10.01 and 10.02
      </text>
      <text x="330" y="322" style={label}>
        average paid ≈ 10.013, not the 10.00 you saw quoted
      </text>
    </Frame>
  );
}

/** The DAT premium mechanism, and its reversal at a discount. */
function DatPremium() {
  return (
    <Frame
      viewBox="0 0 640 300"
      label="At a premium to net asset value, issuing shares raises more cash per unit of dilution than it costs, so holdings per share rise. At a discount the same issuance reduces holdings per share."
    >
      <rect x="40" y="40" width="250" height="210" rx="10" fill={UP} opacity={0.08} stroke={UP} strokeWidth="1.5" />
      <text x="165" y="70" textAnchor="middle" style={{ ...strong, fill: UP }}>
        Shares above asset value
      </text>
      <text x="165" y="104" textAnchor="middle" style={label}>
        issue stock at 2× holdings
      </text>
      <text x="165" y="130" textAnchor="middle" style={label}>
        buy more crypto with proceeds
      </text>
      <text x="165" y="170" textAnchor="middle" style={{ ...strong, fill: UP, fontSize: 18 }}>
        holdings per share ↑
      </text>
      <text x="165" y="206" textAnchor="middle" style={label}>
        the premium funds the accumulation,
      </text>
      <text x="165" y="224" textAnchor="middle" style={label}>
        which sustains the premium
      </text>

      <rect x="350" y="40" width="250" height="210" rx="10" fill={DOWN} opacity={0.08} stroke={DOWN} strokeWidth="1.5" />
      <text x="475" y="70" textAnchor="middle" style={{ ...strong, fill: DOWN }}>
        Shares below asset value
      </text>
      <text x="475" y="104" textAnchor="middle" style={label}>
        issuing now raises less than it dilutes
      </text>
      <text x="475" y="130" textAnchor="middle" style={label}>
        equity funding effectively closes
      </text>
      <text x="475" y="170" textAnchor="middle" style={{ ...strong, fill: DOWN, fontSize: 18 }}>
        holdings per share ↓
      </text>
      <text x="475" y="206" textAnchor="middle" style={label}>
        and it closes exactly when
      </text>
      <text x="475" y="224" textAnchor="middle" style={label}>
        debt may be coming due
      </text>

      <text x="320" y="282" textAnchor="middle" style={label}>
        Same mechanism, run in both directions
      </text>
    </Frame>
  );
}

/** Nominal vs real effective exchange rate diverging on an inflation gap. */
function Reer() {
  return (
    <Frame
      viewBox="0 0 640 290"
      label="A currency whose nominal exchange rate is flat while domestic inflation runs above its trading partners. The real effective exchange rate appreciates steadily, meaning competitiveness erodes even though the quoted rate never moves."
    >
      <line x1="80" y1="240" x2="600" y2="240" stroke={AXIS} strokeWidth="1.5" />
      <line x1="80" y1="30" x2="80" y2="240" stroke={AXIS} strokeWidth="1.5" />
      <text x="340" y="274" textAnchor="middle" style={label}>
        Time
      </text>
      <text x="24" y="140" style={label} transform="rotate(-90 24 140)">
        Index
      </text>
      <path d="M100 170 L580 170" fill="none" stroke={MUTED} strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="330" y="192" textAnchor="middle" style={{ ...strong, fill: MUTED }}>
        Nominal rate — flat, nothing to report
      </text>
      <path d="M100 170 C 250 148, 400 112, 580 70" fill="none" stroke={DOWN} strokeWidth="2.5" />
      <text x="330" y="86" textAnchor="middle" style={{ ...strong, fill: DOWN }}>
        Real effective rate — appreciating
      </text>
      <text x="330" y="106" textAnchor="middle" style={label}>
        domestic inflation above trading partners&apos;
      </text>
      <text x="380" y="228" textAnchor="middle" style={label}>
        exports steadily less competitive, with no currency headline
      </text>
    </Frame>
  );
}

export const diagrams = {
  "yield-curve": YieldCurve,
  "contango-backwardation": ContangoBackwardation,
  "fee-compounding": FeeCompounding,
  "buyback-eps": BuybackEps,
  "term-premium": TermPremium,
  "order-book": OrderBook,
  "dat-premium": DatPremium,
  "reer": Reer,
} as const;

export type DiagramId = keyof typeof diagrams;

export function isDiagramId(value: string): value is DiagramId {
  return value in diagrams;
}

/** Renders a named diagram as a captioned figure. */
export function Diagram({ id, caption }: { id: DiagramId; caption?: string }) {
  const Svg = diagrams[id];
  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <Svg />
      {caption ? (
        <figcaption className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
