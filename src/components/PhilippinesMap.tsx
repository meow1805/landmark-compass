import { useRef, useEffect, useCallback, useState } from 'react';
import { Region, Landmark } from '@/types/exhibit';
import svgRaw from '@/assets/philippines.svg?raw';

interface PhilippinesMapProps {
  selectedRegion: Region | null;
  onSelectRegion: (region: Region) => void;
  /** When in region-detail mode, show only this region cropped */
  cropToRegion?: Region | null;
  /** Landmarks to show as dots on the map */
  landmarks?: Landmark[];
  /** Currently highlighted landmark (from card hover or click) */
  highlightedLandmark?: string | null;
  /** Called when user clicks a landmark dot */
  onLandmarkClick?: (id: string) => void;
  /** Called when user hovers a landmark dot */
  onLandmarkHover?: (id: string | null) => void;
}

// ── Province → Region mapping ────────────────────────────
const PROVINCE_REGION: Record<string, Region> = {};
const LUZON = [
  'PH-ABR','PH-APA','PH-AUR','PH-BAN','PH-BTN','PH-BEN','PH-BUL',
  'PH-CAG','PH-CAN','PH-CAS','PH-CAT','PH-CAV','PH-IFU','PH-ILN',
  'PH-ILS','PH-ISA','PH-KAL','PH-LAG','PH-LUN','PH-MAD','PH-MAS','PH-MDC',
  'PH-MDR','PH-MNL','PH-MOU','PH-NUE','PH-NUV','PH-PAM','PH-PAN',
  'PH-PLW','PH-QUE','PH-QUI','PH-RIZ','PH-ROM','PH-SOR','PH-TAR',
  'PH-ZMB','PH-ALB','PH-BTG',
];
const VISAYAS = [
  'PH-AKL','PH-ANT','PH-BIL','PH-BOH','PH-CAP','PH-CEB','PH-EAS',
  'PH-GUI','PH-ILI','PH-LEY','PH-NEC','PH-NER','PH-NSA','PH-SIG',
  'PH-SLE','PH-WSA',
];
const MINDANAO = [
  'PH-AGN','PH-AGS','PH-BAS','PH-BUK','PH-CAM','PH-COM','PH-DAO',
  'PH-DAS','PH-DAV','PH-DIN','PH-LAN','PH-LAS','PH-MSC',
  'PH-MSR','PH-NCO','PH-SAR','PH-SCO','PH-SLU','PH-SUK','PH-SUN',
  'PH-SUR','PH-TAW','PH-ZAN','PH-ZAS','PH-ZSI','PH_MG',
];
LUZON.forEach(id => PROVINCE_REGION[id] = 'luzon');
VISAYAS.forEach(id => PROVINCE_REGION[id] = 'visayas');
MINDANAO.forEach(id => PROVINCE_REGION[id] = 'mindanao');

// ── Geo → SVG coordinate conversion ─────────────────────
// From the SVG: geoViewBox="116.927573 20.834769 126.606549 4.640292"
const GEO_LEFT = 116.927573;
const GEO_TOP = 20.834769;
const GEO_RIGHT = 126.606549;
const GEO_BOTTOM = 4.640292;
const SVG_W = 702.39;
const SVG_H = 1209.44;

function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - GEO_LEFT) / (GEO_RIGHT - GEO_LEFT)) * SVG_W;
  const y = ((GEO_TOP - lat) / (GEO_TOP - GEO_BOTTOM)) * SVG_H;
  return { x, y };
}

/** ViewBox crop for each region (x y w h) */
const REGION_VIEWBOX: Record<Region, string> = {
  luzon:    '100 0 450 550',
  visayas:  '360 680 240 220',
  mindanao: '480 900 280 250',
};

// ── Colors per region (hex for direct DOM manipulation) ──
const REGION_COLORS: Record<Region, { fill: string; hover: string; active: string; stroke: string }> = {
  luzon:    { fill: '#6c5ce7', hover: '#a29bfe', active: '#5b4cdb', stroke: '#3d2e8c' },
  visayas:  { fill: '#00b894', hover: '#55efc4', active: '#00a381', stroke: '#006b54' },
  mindanao: { fill: '#e17055', hover: '#fab1a0', active: '#d35843', stroke: '#8c3424' },
};

export function PhilippinesMap({
  selectedRegion,
  onSelectRegion,
  cropToRegion,
  landmarks = [],
  highlightedLandmark,
  onLandmarkClick,
  onLandmarkHover,
}: PhilippinesMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<{ name: string; region: Region; x: number; y: number } | null>(null);
  const listenersAttached = useRef(false);
  const markersRef = useRef<SVGGElement | null>(null);

  /** Select all province <path> elements (handles both PH- and PH_ prefixes) */
  const getProvincePaths = useCallback(() => {
    const el = containerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll('path')).filter((p) => {
      const id = p.getAttribute('id') ?? '';
      return id.startsWith('PH-') || id.startsWith('PH_');
    });
  }, []);

  // Apply colors to all province paths
  const applyStyles = useCallback((hovered: Region | null, selected: Region | null) => {
    const paths = getProvincePaths();
    paths.forEach((path) => {
      const id = path.getAttribute('id') ?? '';
      const region = PROVINCE_REGION[id];
      if (!region) return;

      const colors = REGION_COLORS[region];
      const isSelected = selected === region;
      const isHovered = hovered === region;
      const isDimmed = selected !== null && !isSelected;

      let fill = colors.fill;
      if (isSelected) fill = colors.active;
      else if (isHovered) fill = colors.hover;

      const p = path as SVGPathElement;
      p.style.fill = fill;
      p.style.stroke = colors.stroke;
      p.style.strokeWidth = isSelected ? '1.5' : '0.8';
      p.style.opacity = isDimmed ? '0.2' : '1';
      p.style.transition = 'fill 0.3s, opacity 0.4s, stroke-width 0.3s';
      p.style.cursor = cropToRegion ? 'default' : 'pointer';
    });
  }, [getProvincePaths, cropToRegion]);

  // Inject SVG on mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = svgRaw;
    const svg = el.querySelector('svg');
    if (svg) {
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.style.width = '100%';
      svg.style.height = 'auto';
      svg.style.display = 'block';
      svg.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))';
      svg.style.transition = 'view-box 0.5s ease';
    }
  }, []);

  // Update viewBox: zoom to highlighted landmark or show region crop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const svg = el.querySelector('svg');
    if (!svg) return;

    // Smooth CSS transition for viewBox changes
    svg.style.transition = 'all 0.6s ease-in-out';

    if (highlightedLandmark && cropToRegion && landmarks.length > 0) {
      // Zoom toward the highlighted landmark within the region
      const lm = landmarks.find(l => l.id === highlightedLandmark);
      if (lm?.mapCenter) {
        const { x, y } = geoToSvg(lm.mapCenter[0], lm.mapCenter[1]);
        const zoomW = 100;
        const zoomH = 100;
        svg.setAttribute('viewBox', `${x - zoomW / 2} ${y - zoomH / 2} ${zoomW} ${zoomH}`);
        return;
      }
    }

    if (cropToRegion) {
      svg.setAttribute('viewBox', REGION_VIEWBOX[cropToRegion]);
    } else {
      svg.setAttribute('viewBox', `0 0 ${SVG_W} ${SVG_H}`);
    }
  }, [cropToRegion, highlightedLandmark, landmarks]);

  // Attach event listeners once after SVG is injected
  useEffect(() => {
    if (listenersAttached.current) return;
    const paths = getProvincePaths();
    if (paths.length === 0) return;
    listenersAttached.current = true;

    paths.forEach((path) => {
      const id = path.getAttribute('id') ?? '';
      const region = PROVINCE_REGION[id];
      if (!region) return;

      // Get province name from title attribute but remove native SVG <title> tooltip
      const provinceName = path.getAttribute('title') || id.replace('PH-', '').replace('PH_', '');
      const existingTitle = path.querySelector('title');
      if (existingTitle) existingTitle.remove();

      path.addEventListener('click', () => {
        if (!cropToRegion) onSelectRegion(region);
      });
      path.addEventListener('mouseenter', (e) => {
        if (!cropToRegion) {
          setHoveredRegion(region);
          const rect = (e.currentTarget as Element).closest('svg')!.getBoundingClientRect();
          const clientRect = (e.currentTarget as Element).getBoundingClientRect();
          setHoveredProvince({
            name: provinceName,
            region,
            x: clientRect.left + clientRect.width / 2 - rect.left,
            y: clientRect.top - rect.top,
          });
        }
      });
      path.addEventListener('mouseleave', () => {
        if (!cropToRegion) {
          setHoveredRegion(null);
          setHoveredProvince(null);
        }
      });
    });

    // Add region labels (only if full map mode)
    if (!cropToRegion) {
      const container = containerRef.current;
      const svg = container?.querySelector('svg');
      if (svg) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const addLabel = (x: number, y: number, text: string, size: number) => {
          const t = document.createElementNS(svgNS, 'text');
          t.setAttribute('x', String(x));
          t.setAttribute('y', String(y));
          t.setAttribute('text-anchor', 'middle');
          t.setAttribute('font-size', String(size));
          t.setAttribute('font-weight', '700');
          t.setAttribute('fill', '#2d3436');
          t.setAttribute('stroke', 'rgba(255,255,255,0.9)');
          t.setAttribute('stroke-width', '0.8');
          t.setAttribute('paint-order', 'stroke');
          t.style.pointerEvents = 'none';
          t.style.userSelect = 'none';
          t.style.fontFamily = 'system-ui, sans-serif';
          t.classList.add('region-label');
          t.textContent = text;
          svg!.appendChild(t);
        };
        addLabel(250, 260, 'LUZON', 28);
        addLabel(350, 700, 'VISAYAS', 22);
        addLabel(380, 920, 'MINDANAO', 26);
      }
    }

    applyStyles(null, selectedRegion);
  });

  // Hide region labels when cropped to a region
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const labels = el.querySelectorAll('.region-label');
    labels.forEach((label) => {
      (label as SVGElement).style.display = cropToRegion ? 'none' : '';
    });
  }, [cropToRegion]);

  // Re-apply styles when hover/selection changes
  useEffect(() => {
    applyStyles(hoveredRegion, selectedRegion);
  }, [hoveredRegion, selectedRegion, applyStyles]);

  // Render landmark markers as SVG pin shapes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const svg = el.querySelector('svg');
    if (!svg) return;

    // Remove old markers
    if (markersRef.current) {
      markersRef.current.remove();
    }

    if (landmarks.length === 0) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'landmark-markers');
    markersRef.current = g;

    const PIN_COLOR = '#dc2626';       // uniform red-600
    const PIN_STROKE = '#7f1d1d';       // red-900
    const PIN_INNER = '#ffffff';        // white inner dot

    landmarks.forEach((lm) => {
      if (!lm.mapCenter) return;
      const { x, y } = geoToSvg(lm.mapCenter[0], lm.mapCenter[1]);
      const isHighlighted = highlightedLandmark === lm.id;

      // Pin dimensions — shrink non-highlighted pins when zoomed to a landmark
      const isZoomed = !!highlightedLandmark;
      const r = isHighlighted ? 8 : (isZoomed ? 3 : 6);
      const h = r * 2;

      // Pulse ring for highlighted pin
      if (isHighlighted) {
        const pulse = document.createElementNS(svgNS, 'circle');
        pulse.setAttribute('cx', String(x));
        pulse.setAttribute('cy', String(y - h));
        pulse.setAttribute('r', String(r + 8));
        pulse.setAttribute('fill', 'none');
        pulse.setAttribute('stroke', PIN_COLOR);
        pulse.setAttribute('stroke-width', '2');
        pulse.setAttribute('opacity', '0.4');
        pulse.style.animation = 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite';
        g.appendChild(pulse);
      }

      // Pin teardrop path: tip at (x, y), circle at (x, y - h)
      const pin = document.createElementNS(svgNS, 'path');
      const pinD = [
        `M ${x},${y}`,
        `C ${x - r * 0.6},${y - h * 0.4} ${x - r},${y - h * 0.7} ${x - r},${y - h}`,
        `A ${r},${r} 0 1,1 ${x + r},${y - h}`,
        `C ${x + r},${y - h * 0.7} ${x + r * 0.6},${y - h * 0.4} ${x},${y}`,
        'Z'
      ].join(' ');
      pin.setAttribute('d', pinD);
      pin.setAttribute('fill', PIN_COLOR);
      pin.setAttribute('stroke', PIN_STROKE);
      pin.setAttribute('stroke-width', isHighlighted ? '1.5' : '1');
      pin.style.cursor = 'pointer';
      pin.style.filter = 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))';
      pin.style.transition = 'transform 0.2s';

      // White inner dot on the pin head
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', String(x));
      dot.setAttribute('cy', String(y - h));
      dot.setAttribute('r', String(r * 0.4));
      dot.setAttribute('fill', PIN_INNER);
      dot.style.pointerEvents = 'none';

      // Tooltip
      const title = document.createElementNS(svgNS, 'title');
      title.textContent = `${lm.name} — ${lm.location}`;
      pin.appendChild(title);

      // Hit area (invisible larger circle for easier clicking)
      const hitArea = document.createElementNS(svgNS, 'circle');
      hitArea.setAttribute('cx', String(x));
      hitArea.setAttribute('cy', String(y - h));
      hitArea.setAttribute('r', String(r + 4));
      hitArea.setAttribute('fill', 'transparent');
      hitArea.style.cursor = 'pointer';

      hitArea.addEventListener('click', (e) => {
        e.stopPropagation();
        onLandmarkClick?.(lm.id);
      });
      hitArea.addEventListener('mouseenter', () => onLandmarkHover?.(lm.id));
      hitArea.addEventListener('mouseleave', () => onLandmarkHover?.(null));
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        onLandmarkClick?.(lm.id);
      });
      pin.addEventListener('mouseenter', () => onLandmarkHover?.(lm.id));
      pin.addEventListener('mouseleave', () => onLandmarkHover?.(null));

      g.appendChild(pin);
      g.appendChild(dot);
      g.appendChild(hitArea);

      // Label for highlighted landmark
      if (isHighlighted) {
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', String(x));
        text.setAttribute('y', String(y - h - r - 4));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', '700');
        text.setAttribute('fill', '#1f2937');
        text.setAttribute('stroke', 'white');
        text.setAttribute('stroke-width', '3');
        text.setAttribute('paint-order', 'stroke');
        text.style.pointerEvents = 'none';
        text.style.fontFamily = 'system-ui, sans-serif';
        text.textContent = lm.name;
        g.appendChild(text);
      }
    });

    svg.appendChild(g);
    return () => { g.remove(); };
  }, [landmarks, highlightedLandmark, onLandmarkClick, onLandmarkHover]);

  const regionLabel: Record<Region, string> = { luzon: 'Luzon', visayas: 'Visayas', mindanao: 'Mindanao' };
  const regionEmoji: Record<Region, string> = { luzon: '🏔️', visayas: '🏝️', mindanao: '🌴' };

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="w-full" />
      {/* Styled province tooltip */}
      {hoveredProvince && !cropToRegion && (
        <div
          className="absolute pointer-events-none z-20 animate-fade-in"
          style={{
            left: hoveredProvince.x,
            top: hoveredProvince.y - 8,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl px-3 py-2 text-center min-w-[120px]">
            <p className="text-xs font-bold text-foreground leading-tight">{hoveredProvince.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {regionEmoji[hoveredProvince.region]} {regionLabel[hoveredProvince.region]} Region
            </p>
            <p className="text-[10px] text-primary font-semibold mt-1">Click to explore</p>
          </div>
          <div className="w-2.5 h-2.5 bg-card/95 border-b border-r border-border rotate-45 mx-auto -mt-[5px]" />
        </div>
      )}
    </div>
  );
}

