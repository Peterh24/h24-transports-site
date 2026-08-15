import type { CSSProperties } from "react";

type Props = {
  label?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

/** Remplacement rayé pour les visuels manquants (photos / vidéos de flotte, screens app). */
export function Placeholder({ label = "IMAGE", height = 280, className = "", style }: Props) {
  return (
    <div className={`placeholder ${className}`.trim()} style={{ height, ...style }}>
      <span>// {label}</span>
    </div>
  );
}
