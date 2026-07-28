// Yeh loading indicator hai jo data fetch ya process hone ke dauran dikhai deta hai.
import "./Loader.css";

/**
 * Yeh lightweight loading spinner dikhata hai jisme optional 
 * descriptive label bhi ho sakta hai.
 */
export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="loader-wrap" role="status">
      <div className="loader-spinner" />
      <span className="loader-label">{label}</span>
    </div>
  );
}
