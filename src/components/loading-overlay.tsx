type LoadingOverlayProps = {
  isLoading: boolean;
};

function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-[var(--white)]">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--primary)]" />
    </div>
  );
}

export default LoadingOverlay;
