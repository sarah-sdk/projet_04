export default function ErrorMessage({
  variant,
  error,
}: {
  variant: "page" | "inline" | "compact";
  error: string;
}) {
  if (variant === "page") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  } else if (variant === "compact") {
    return <div className="mt-2 text-sm text-red-600">{error}</div>;
  } else {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }
}
