export const archiveEntries = [
  {
    id: "morning-light-borrowed-room",
    type: "photograph",
    title: "Morning light, borrowed room",
    description: "Somewhere between leaving and staying, the room became the subject.",
    date: "2026-03-08",
    tags: ["light", "interiors", "morning"],
    media: { alt: "A quiet room with morning light", background: "linear-gradient(117deg, transparent 0 43%, rgb(239 224 188 / 22%) 43% 54%, transparent 54%), linear-gradient(180deg, rgb(77 87 71 / 0%) 15%, rgb(31 42 37 / 65%) 100%), linear-gradient(122deg, #bdab87 0 22%, #74816f 22% 58%, #3b4b45 58% 100%)" }
  },
  {
    id: "blue-hour-held-still",
    type: "photograph",
    title: "The blue hour, held still",
    description: "A few minutes where the city forgot to perform itself.",
    date: "2026-02-14",
    tags: ["blue hour", "street", "quiet"],
    media: { alt: "A blue evening sky", background: "linear-gradient(137deg, transparent 0 35%, rgb(225 214 184 / 24%) 35% 47%, transparent 47%), linear-gradient(180deg, rgb(88 106 126 / 0%), rgb(25 37 50 / 70%)), linear-gradient(122deg, #687e8b 0 24%, #b5ad96 24% 53%, #384657 53% 100%)" }
  },
  {
    id: "objects-with-a-memory",
    type: "photograph",
    title: "Objects with a memory",
    description: "The best things in the room had already lived another life.",
    date: "2026-01-26",
    tags: ["objects", "texture", "home"],
    media: { alt: "An old object in warm light", background: "linear-gradient(115deg, transparent 0 51%, rgb(245 215 169 / 26%) 51% 60%, transparent 60%), linear-gradient(180deg, rgb(133 98 69 / 0%), rgb(55 35 25 / 72%)), linear-gradient(122deg, #d4b184 0 28%, #9a573b 28% 66%, #40362d 66% 100%)" }
  }
];

export const archiveCollections = [
  {
    id: "borrowed-light",
    type: "collection",
    title: "Borrowed Light",
    description: "Rooms, windows, and brief changes in atmosphere.",
    entryIds: archiveEntries.map((entry) => entry.id),
    displayMode: "contact-sheet",
    accent: "amber"
  }
];

export const archiveViews = [
  { id: "featured", title: "Featured", collectionIds: ["borrowed-light"], layout: "console" },
  { id: "photographs", title: "Photographs", collectionIds: ["borrowed-light"], layout: "gallery" },
  { id: "notes", title: "Field notes", collectionIds: [], layout: "journal" },
  { id: "likes", title: "Things I like", collectionIds: [], layout: "rotation" },
  { id: "about", title: "About", collectionIds: [], layout: "profile" }
];

export const featuredPieces = archiveEntries;

export const channels = [
  ["01", "Featured", "featured"],
  ["02", "Photographs", "photographs"],
  ["03", "Field notes", "notes"],
  ["04", "Things I like", "likes"],
  ["05", "About", "about"]
];
