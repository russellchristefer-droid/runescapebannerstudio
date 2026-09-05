import { createFileRoute } from "@tanstack/react-router";
import { LedgerSheet } from "@/components/ledger-sheet";
import { OSRS_LEDGER } from "@/lib/ledgers";

export const Route = createFileRoute("/guthix-ledger")({
  component: GuthixLedger,
});

function GuthixLedger() {
  return (
    <LedgerSheet
      title="Guthix ledger"
      deck="Old School RuneScape · methods only. Not in the main nav."
      game={OSRS_LEDGER.game}
      wiki={OSRS_LEDGER.wiki}
      f2p={OSRS_LEDGER.f2p}
      members={OSRS_LEDGER.members}
      foot="Guthix does not count coins. The wiki does."
    />
  );
}
