// Yeh visual component hai jo stylized vinyl record representation render karta hai.
import "./Vinyl.css";

/**
 * Yeh props Vinyl artwork ke colors ko customize karne ke liye use hote hain.
 */
interface VinylProps {
  labelColor: string;
  ringColor: string;
  size?: number;
}

/**
 * Yeh decorative vinyl disc render karta hai jo product views mein use hota hai.
 */
export function Vinyl({ labelColor, ringColor, size = 220, }: VinylProps) {
  return (
    <div
      className="vinyl"
      style={{
        "--label": labelColor,
        "--ring": ringColor,
        width: `${size}px`,
        height: `${size}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
