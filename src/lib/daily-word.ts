import { wordKey } from "./cadence";

export const DAILY_WORDS = [
  {
    word: "nudiustertian",
    say: "/ˌnjuːdiʌsˈtɜːʃən/",
    sense: "Of or relating to the day before yesterday.",
  },
  {
    word: "ultracrepidarian",
    say: "/ˌʌltrəˌkrɛpɪˈdɛəriən/",
    sense: "One who offers opinions beyond their knowledge.",
  },
  {
    word: "absquatulate",
    say: "/əbˈskwɒtjʊleɪt/",
    sense: "To abscond; to leave in a hurry.",
  },
  {
    word: "concinnity",
    say: "/kənˈsɪnɪti/",
    sense: "Elegant fitness of parts to a whole.",
  },
  {
    word: "accismus",
    say: "/əkˈsɪzməs/",
    sense: "A feigned refusal of something actually desired.",
  },
  {
    word: "quincunx",
    say: "/ˈkwɪŋkʌŋks/",
    sense: "Five points arranged like the five on a die.",
  },
  {
    word: "persiflage",
    say: "/ˈpɜːsɪflɑːʒ/",
    sense: "Light, slightly mocking conversation.",
  },
  {
    word: "tatterdemalion",
    say: "/ˌtætədəˈmeɪliən/",
    sense: "A person dressed in ragged clothes; also, ragged itself.",
  },
  {
    word: "susurrus",
    say: "/sʊˈsʌrəs/",
    sense: "A whispering or rustling sound.",
  },
  {
    word: "apophenia",
    say: "/ˌæpəˈfiːniə/",
    sense: "The habit of seeing patterns in what is only noise.",
  },
  {
    word: "limerence",
    say: "/ˈlɪmərəns/",
    sense: "An involuntary, obsessive infatuation.",
  },
  {
    word: "mondegreen",
    say: "/ˈmɒndəɡriːn/",
    sense: "A misheard lyric that becomes a new phrase.",
  },
  {
    word: "callithump",
    say: "/ˈkælɪθʌmp/",
    sense: "A noisy, mocking parade or racket.",
  },
  {
    word: "snollygoster",
    say: "/ˈsnɒliɡɒstə/",
    sense: "A shrewd, unprincipled person, especially in politics.",
  },
] as const;

export function dailyWordAt(now = Date.now()) {
  return DAILY_WORDS[wordKey(now) % DAILY_WORDS.length];
}
