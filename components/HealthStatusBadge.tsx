import { Badge } from "./ui/badge";

const HealthStatusBadge = ({ healthAsset }: { healthAsset: string }) => {
  const variant =
    healthAsset === "Healthy"
      ? "default"
      : healthAsset === "Unhealthy"
      ? "destructive"
      : "secondary";
  return (
    <Badge
      variant={variant}
      className=" flex justify-center items-center sm:w-1/3 w-full ml-14"
    >
      {healthAsset}
    </Badge>
  );
};

export default HealthStatusBadge;
