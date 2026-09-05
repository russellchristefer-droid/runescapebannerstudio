export const PLAY_QUOTES = [
  "When Guthix first woke the world from stone and silence, balance was not a slogan but a husbandry: every altar you ignore is a limb of that first compact left to wither, and every slayer task you treat as refuse is a precept the Anima Mundi still intends you to learn.",
  "Zaros did not fall because his empire lacked marble. Senntisten remembers that administration without loyalty is only a more splendid ruin; study the Empty Lord's ledgers before you call yourself a general of anything smaller than a slayer block.",
  "Saradomin's light is a jurisprudence, not a lantern. White Knights keep Falador because someone still files the report after the loot is counted. Honour on a banner is cheap; honour in the GE tax window is the older law.",
  "Zamorak's gift is chaos with a grammar. The Wilderness does not hate you; it invoices vanity. Carry what you can bear to watch a PKer convert into coins, and you will understand his scripture better than any chaos altar sermon.",
  "Seren's song in Prifddinas is not decoration. Crystal singing is the elves' memory of a goddess who would rather shatter than abandon her people. If your clan fractures at the first wipe, you have not heard that note.",
  "Bandos measured worth in the thud of a godsword. Graardor still keeps that arithmetic. A maxed account that cannot hold a simple role in a team is a war-god's joke wearing better armour.",
  "Armadyl's eyrie teaches altitude and patience. Kree'arra does not reward the pilgrim who skips the draughts and the prayer book. Flight is logistics first; glory is a later weather.",
  "Tumeken's dream still smoulders under Menaphos and Sophanem. The desert is a theology of thirst: bank the waterskins, read the plague notes, and do not call Amascut's hunger a fun mechanic until you have paid her tithe in supplies.",
  "The Tears of Guthix are a small weekly mercy in a cave that remembers the God Wars. Collect them as a scholar collects footnotes. Spectacle can wait; the drip is the older curriculum.",
  "Zanaris is the moon's joke at surface kings. Lost City is not a postcard. If you cannot keep your bearings in a fairy ring, you are not ready for the theatres that hide behind other doors.",
  "The World Gate is a hinge, not a trophy. Worlds that remember Guthix's sleep still punish the tourist who treats every plane as a farm. Learn the local law before you plant a cannon.",
  "Daemonheim is a thesis on incremental masonry: one floor honestly logged outlasts a theatrical night of deaths you refuse to annotate. The Kinshra and the Fremennik already knew this; the dungeon only made it stone.",
] as const;

export function playQuoteAt(now = Date.now()) {
  const slot = Math.floor(now / 300_000);
  return PLAY_QUOTES[slot % PLAY_QUOTES.length];
}
