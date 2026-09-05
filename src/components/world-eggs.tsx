import { EggToast } from "@/components/egg-toast";
import { useDeskEggs } from "@/hooks/use-desk-eggs";

/** Quiet in-world eggs. Not mounted as a joke on Legal — eggToast no-ops there. */
export function WorldEggs() {
  useDeskEggs("");
  return <EggToast />;
}
