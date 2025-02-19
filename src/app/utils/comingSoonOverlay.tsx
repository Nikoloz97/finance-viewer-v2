import { CSSProperties, ReactNode } from "react";
import "./comingSoonOverlay.css";

interface ComingSoonOverlayProps {
  children: ReactNode;
  containerStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  overlayTextStyle?: CSSProperties;
}

export default function ComingSoonOverlay({
  children,
  overlayStyle,
  containerStyle,
  overlayTextStyle,
}: ComingSoonOverlayProps) {
  return (
    <div className="overlay-container" style={{ ...containerStyle }}>
      {children}
      <div className="overlay" style={{ ...overlayStyle }}>
        <div className="overlay-text" style={{ ...overlayTextStyle }}>
          Coming Soon
        </div>
      </div>
    </div>
  );
}
