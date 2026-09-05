import { i as __toESM } from "../_runtime.mjs";
import { V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as eggToast } from "./router-DXmYNu76.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-egg-gestures-BzHAgDVs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useEggGestures(node, examine, tripleLine) {
	const clicks = (0, import_react.useRef)({
		n: 0,
		t: 0
	});
	const press = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const el = node.current;
		if (!el) return;
		const onClick = () => {
			const now = Date.now();
			if (now - clicks.current.t > 800) clicks.current.n = 0;
			clicks.current.t = now;
			clicks.current.n += 1;
			if (clicks.current.n >= 3) {
				clicks.current.n = 0;
				eggToast(tripleLine ? tripleLine() : "Nothing interesting happens.");
			}
		};
		const onContext = (e) => {
			e.preventDefault();
			eggToast(examine());
		};
		const onDown = () => {
			press.current = window.setTimeout(() => eggToast(examine()), 400);
		};
		const onUp = () => window.clearTimeout(press.current);
		el.addEventListener("click", onClick);
		el.addEventListener("contextmenu", onContext);
		el.addEventListener("pointerdown", onDown);
		el.addEventListener("pointerup", onUp);
		el.addEventListener("pointercancel", onUp);
		el.addEventListener("pointerleave", onUp);
		el.addEventListener("pointermove", onUp);
		return () => {
			el.removeEventListener("click", onClick);
			el.removeEventListener("contextmenu", onContext);
			el.removeEventListener("pointerdown", onDown);
			el.removeEventListener("pointerup", onUp);
			el.removeEventListener("pointercancel", onUp);
			el.removeEventListener("pointerleave", onUp);
			el.removeEventListener("pointermove", onUp);
			window.clearTimeout(press.current);
		};
	}, [node, examine]);
}
//#endregion
export { useEggGestures as t };
