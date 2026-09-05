import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as OSRS_LEDGER, t as LedgerSheet } from "./ledgers-Bfdh_RqN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guthix-ledger-7iIhGado.js
var import_jsx_runtime = require_jsx_runtime();
function GuthixLedger() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerSheet, {
		title: "Guthix ledger",
		deck: "Old School RuneScape · methods only. Not in the main nav.",
		game: OSRS_LEDGER.game,
		wiki: OSRS_LEDGER.wiki,
		f2p: OSRS_LEDGER.f2p,
		members: OSRS_LEDGER.members,
		foot: "Guthix does not count coins. The wiki does."
	});
}
//#endregion
export { GuthixLedger as component };
