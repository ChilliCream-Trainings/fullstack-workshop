import "./loading-indicator.css";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  return (
    <div className={`loading-indicator ${!isLoading ? "hidden" : ""}`}>
      <div className="bar" />
    </div>
  );
}
