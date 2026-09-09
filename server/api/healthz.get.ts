import { apiHeaders } from "../../src/lib/headers";

export default async function handler() {
  return new Response(JSON.stringify({ ok: true, time: new Date().toISOString() }), {
    status: 200,
    headers: apiHeaders({ "content-type": "application/json; charset=utf-8" }),
  });
}