import { createFileRoute } from "@tanstack/react-router";
import { LedgerSheet } from "@/components/ledger-sheet";
import { RS3_LEDGER } from "@/lib/ledgers";

export const Route = createFileRoute("/senntisten")({
  component: SenntistenLedger,
});

function SenntistenLedger() {
  return (
    <LedgerSheet
      title="Senntisten ledger"
      deck="RuneScape 3 · methods only. Official wiki wins on the hour."
      game={RS3_LEDGER.game}
      wiki={RS3_LEDGER.wiki}
      f2p={RS3_LEDGER.f2p}
      members={RS3_LEDGER.members}
      foot="This desk does not price the GE. Open the wiki for this hour."
    />
  );
}
