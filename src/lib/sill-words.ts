export const WORDS = [
  { t: "palimpsest", p: "PAL-imp-sest", g: "a surface written over so the older writing still shows" },
  { t: "apophasis", p: "uh-POF-uh-sis", g: "mentioning something by saying you will not mention it" },
  { t: "quiddity", p: "KWID-ih-tee", g: "the essential what-ness of a thing" },
  { t: "haecceity", p: "hek-SEE-ih-tee", g: "the this-ness of one particular thing" },
  { t: "liminality", p: "lim-ih-NAL-ih-tee", g: "the state of being on a threshold" },
  { t: "chthonic", p: "THON-ik", g: "of the underworld; belonging beneath the earth" },
  { t: "numinous", p: "NOO-min-us", g: "filled with a sense of the sacred" },
  { t: "soteriology", p: "so-teer-ee-OL-uh-jee", g: "the study of what it means to be saved" },
  { t: "eschaton", p: "ES-kuh-ton", g: "the last thing; an end of history" },
  { t: "praxis", p: "PRAK-sis", g: "practice; theory carried out in action" },
  { t: "anagoge", p: "an-uh-GOH-jee", g: "a reading that lifts a text toward a higher sense" },
  { t: "catabasis", p: "kuh-TAB-uh-sis", g: "a descent, especially into the underworld" },
  { t: "peripeteia", p: "pehr-ih-puh-TEE-uh", g: "a sudden reversal of fortune" },
  { t: "aleatory", p: "AY-lee-uh-tor-ee", g: "dependent on chance" },
  { t: "agon", p: "AH-gohn", g: "a contest or structured struggle" },
  { t: "deixis", p: "DYKE-sis", g: "pointing at the here and now of speech" },
  { t: "colophon", p: "KOL-uh-fon", g: "a short note at the end of a book" },
  { t: "interstice", p: "in-TUR-stiss", g: "a small gap between things" },
  { t: "dialectic", p: "dye-uh-LEK-tik", g: "argument that moves by opposing claims" },
  { t: "immanence", p: "IM-uh-nunce", g: "being present within, not beyond" },
  { t: "transcendence", p: "tran-SEN-dunce", g: "going beyond ordinary limits" },
  { t: "eidolon", p: "eye-DOH-lon", g: "an image, phantom, or unsubstantial form" },
  { t: "simulacrum", p: "sim-yuh-LAY-krum", g: "a copy that stands in for the original" },
  { t: "mimesis", p: "mih-MEE-sis", g: "imitation; representation of the real" },
  { t: "semiosis", p: "see-mee-OH-sis", g: "the process by which signs make meaning" },
  { t: "indexical", p: "in-DEX-ih-kul", g: "a sign that points because it was there" },
  { t: "iconicity", p: "eye-kuh-NISS-ih-tee", g: "meaning that comes from resemblance" },
  { t: "symbolon", p: "SIM-buh-lon", g: "a token meant to be matched with its other half" },
  { t: "prosody", p: "PROSS-uh-dee", g: "the rhythm and sound pattern of speech" },
  { t: "caesura", p: "sih-ZYOOR-uh", g: "a pause in the middle of a line" },
  { t: "kenosis", p: "keh-NO-sis", g: "an emptying out of the self" },
  { t: "askesis", p: "uh-SKEE-sis", g: "discipline practiced as training" },
  { t: "thnetos", p: "THNET-oss", g: "mortal; liable to die" },
  { t: "anabasis", p: "uh-NAB-uh-sis", g: "a march up-country; an ascent" },
  { t: "topos", p: "TOH-poss", g: "a commonplace; a conventional theme" },
  { t: "genius loci", p: "JEE-nee-us LOH-sye", g: "the spirit or character of a place" },
  { t: "parataxis", p: "par-uh-TAK-sis", g: "placing clauses side by side without joining words" },
  { t: "hypotaxis", p: "hye-poh-TAK-sis", g: "subordinating one clause to another" },
  { t: "aporia", p: "uh-POR-ee-uh", g: "a productive puzzlement; being stuck in thought" },
  { t: "catachresis", p: "kat-uh-KREE-sis", g: "a strained or mixed figure of speech" },
  { t: "enargia", p: "en-AR-jee-uh", g: "vivid description that makes a scene present" },
  { t: "ekphrasis", p: "EK-fruh-sis", g: "speech that describes a work of art" },
  { t: "prosopopoeia", p: "pruh-so-puh-PEE-uh", g: "giving a voice to something that cannot speak" },
  { t: "chronotope", p: "KRON-uh-tope", g: "time and place fused as one setting" },
  { t: "heterotopia", p: "het-uh-roh-TOH-pee-uh", g: "a real place that works as another world inside the world" },
  { t: "limen", p: "LYE-men", g: "a threshold; the edge of crossing" },
  { t: "vestige", p: "VESS-tij", g: "a remaining trace of something gone" },
  { t: "palinode", p: "PAL-ih-node", g: "a poem or statement that takes back an earlier one" },
  { t: "recension", p: "rih-SEN-shun", g: "a distinct edited version of a text" },
  { t: "stela", p: "STEE-luh", g: "an upright stone marked with a name or record" },
];

export function utcDay(now = Date.now()) {
  return Math.floor(now / 86_400_000);
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function todaysWords(all: typeof WORDS, now = Date.now()) {
  const rng = mulberry32(utcDay(now) ^ 0xb0b);
  const copy = all.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 12);
}

export function bobWord(now = Date.now()) {
  const dayList = todaysWords(WORDS, now);
  const i = Math.floor(now / 300_000) % dayList.length;
  return dayList[i];
}

