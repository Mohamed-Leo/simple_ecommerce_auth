import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoaderSpinnerProps {
  msg?: string;
  className?: string;
}
const LoaderSpinner = ({ msg, className }: LoaderSpinnerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-screen bg-accent gap-3",
        className
      )}
    >
      <Spinner />
      <p className="text-lg font-semibold">{msg ? msg : "Loading..."}</p>
    </div>
  );
};

export default LoaderSpinner;
