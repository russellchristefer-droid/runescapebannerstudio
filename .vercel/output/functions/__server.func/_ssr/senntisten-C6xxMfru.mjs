import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as RS3_LEDGER, t as LedgerSheet } from "./ledgers-C9umwFGD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/senntisten-C6xxMfru.js
var import_jsx_runtime = require_jsx_runtime();
function SenntistenLedger() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerSheet, {
		title: "Senntisten ledger",
		deck: "RuneScape · methods only. Official wiki wins on the hour.",
		game: RS3_LEDGER.game,
		wiki: RS3_LEDGER.wiki,
		f2p: RS3_LEDGER.f2p,
		members: RS3_LEDGER.members,
		foot: "This desk does not price the GE. Open the wiki for this hour."
	});
}
//#endregion
export { SenntistenLedger as component };
