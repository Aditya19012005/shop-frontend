interface LoaderProps {
  label?: string;
}

export function Loader({ label = "Loading..." }: LoaderProps) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className="spinner-border text-warning"
        role="status"
        aria-hidden="true"
      ></div>
      

      <span className="mt-3">{label}</span>
    </div>
  );
}