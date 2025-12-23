import { Spinner } from "@/components/ui/spinner";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-accent gap-3">
      <Spinner />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default LoaderSpinner;
