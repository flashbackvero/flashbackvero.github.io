export const missions = [
  {
    id: "vhs-night",
    title: "VHS Movie Night",
    brief: "Build a movie setup that sends tape video into an old TV.",
    requiredItemIds: ["vhs-tape", "vhs-player", "rca-cable", "crt-tv"],
    connectionOrder: ["vhs-tape", "vhs-player", "rca-cable", "crt-tv"],
    learningNote:
      "A VHS tape stores the movie. The player reads the tape, then the RCA cable carries the picture and sound into the CRT TV.",
  },
  {
    id: "console-corner",
    title: "Classic Console Corner",
    brief: "Assemble a playable retro game station with save support.",
    requiredItemIds: ["game-cartridge", "game-console", "controller", "av-cable", "memory-card", "crt-tv"],
    connectionOrder: ["game-cartridge", "game-console", "av-cable", "crt-tv"],
    learningNote:
      "The console runs the game, the controller sends your moves, the AV cable carries the signal, and the memory card saves progress.",
  },
  {
    id: "cassette-station",
    title: "Cassette Audio Station",
    brief: "Create a portable audio setup that can power and play a tape.",
    requiredItemIds: ["batteries", "cassette-tape", "cassette-player", "headphones"],
    connectionOrder: ["batteries", "cassette-player", "cassette-tape", "headphones"],
    learningNote:
      "The player needs power first. When the cassette spins, a tiny magnetic pattern becomes music through headphones or speakers.",
  },
];
