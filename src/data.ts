import { Song, Playlist } from './types';

export const SONGS: Song[] = [
  // ==================== ROCK & CLASSIC ROCK (ID: 0 to 19) ====================
  {
    id: 0,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: 354,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [280, 320],
    genre: "Rock"
  },
  {
    id: 1,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: 301,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&auto=format&fit=crop&q=80",
    hues: [120, 150],
    genre: "Rock"
  },
  {
    id: 2,
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    duration: 355,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
    hues: [15, 45],
    genre: "Rock"
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: 390,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop&q=80",
    hues: [35, 60],
    genre: "Rock"
  },
  {
    id: 4,
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: 183,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80",
    hues: [200, 240],
    genre: "Rock"
  },
  {
    id: 5,
    title: "Hey Jude",
    artist: "The Beatles",
    album: "The Beatles (White Album)",
    duration: 431,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&auto=format&fit=crop&q=80",
    hues: [210, 180],
    genre: "Rock"
  },
  {
    id: 6,
    title: "Yesterday",
    artist: "The Beatles",
    album: "Help!",
    duration: 125,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",
    hues: [40, 10],
    genre: "Rock"
  },
  {
    id: 7,
    title: "Don't Stop Believin'",
    artist: "Journey",
    album: "Escape",
    duration: 251,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
    hues: [330, 280],
    genre: "Rock"
  },
  {
    id: 8,
    title: "Wonderwall",
    artist: "Oasis",
    album: "(What's the Story) Morning Glory?",
    duration: 258,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=300&auto=format&fit=crop&q=80",
    hues: [25, 45],
    genre: "Rock"
  },
  {
    id: 9,
    title: "Back in Black",
    artist: "AC/DC",
    album: "Back in Black",
    duration: 255,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80",
    hues: [0, 10],
    genre: "Rock"
  },
  {
    id: 10,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duration: 482,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80",
    hues: [50, 80],
    genre: "Rock"
  },
  {
    id: 11,
    title: "Under the Bridge",
    artist: "Red Hot Chili Peppers",
    album: "Blood Sugar Sex Magik",
    duration: 264,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    hues: [190, 220],
    genre: "Rock"
  },
  {
    id: 12,
    title: "Another Brick in the Wall",
    artist: "Pink Floyd",
    album: "The Wall",
    duration: 191,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=80",
    hues: [290, 340],
    genre: "Rock"
  },
  {
    id: 13,
    title: "Dream On",
    artist: "Aerosmith",
    album: "Aerosmith",
    duration: 268,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    hues: [310, 260],
    genre: "Rock"
  },
  {
    id: 14,
    title: "Paint It Black",
    artist: "The Rolling Stones",
    album: "Aftermath",
    duration: 202,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    hues: [250, 280],
    genre: "Rock"
  },
  {
    id: 15,
    title: "Livin' on a Prayer",
    artist: "Bon Jovi",
    album: "Slippery When Wet",
    duration: 249,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=300&auto=format&fit=crop&q=80",
    hues: [200, 230],
    genre: "Rock"
  },
  {
    id: 16,
    title: "Creep",
    artist: "Radiohead",
    album: "Pablo Honey",
    duration: 236,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&auto=format&fit=crop&q=80",
    hues: [180, 210],
    genre: "Rock"
  },
  {
    id: 17,
    title: "Enter Sandman",
    artist: "Metallica",
    album: "Metallica",
    duration: 331,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1513829096960-ef093143c524?w=300&auto=format&fit=crop&q=80",
    hues: [0, 40],
    genre: "Rock"
  },
  {
    id: 18,
    title: "Zombie",
    artist: "The Cranberries",
    album: "No Need to Argue",
    duration: 306,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    hues: [140, 100],
    genre: "Rock"
  },
  {
    id: 19,
    title: "In the End",
    artist: "Linkin Park",
    album: "Hybrid Theory",
    duration: 216,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=300&auto=format&fit=crop&q=80",
    hues: [240, 300],
    genre: "Rock"
  },

  // ==================== POP & DANCE HITS (ID: 20 to 39) ====================
  {
    id: 20,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 294,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    hues: [290, 320],
    genre: "Pop"
  },
  {
    id: 21,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 233,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [195, 220],
    genre: "Pop"
  },
  {
    id: 22,
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 263,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&auto=format&fit=crop&q=80",
    hues: [30, 10],
    genre: "Pop"
  },
  {
    id: 23,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://images.unsplash.com/photo-1525417071002-5ee4e6bb44f7?w=300&auto=format&fit=crop&q=80",
    hues: [340, 20],
    genre: "Pop"
  },
  {
    id: 24,
    title: "Uptown Funk",
    artist: "Mark Ronson & Bruno Mars",
    album: "Uptown Special",
    duration: 269,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
    hues: [45, 15],
    genre: "Pop"
  },
  {
    id: 25,
    title: "Counting Stars",
    artist: "OneRepublic",
    album: "Native",
    duration: 257,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: "https://images.unsplash.com/photo-1422056494055-16c04f39c445?w=300&auto=format&fit=crop&q=80",
    hues: [210, 250],
    genre: "Pop"
  },
  {
    id: 26,
    title: "Viva la Vida",
    artist: "Coldplay",
    album: "Viva la Vida or Death and All His Friends",
    duration: 242,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",
    hues: [50, 20],
    genre: "Pop"
  },
  {
    id: 27,
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80",
    hues: [100, 140],
    genre: "Pop"
  },
  {
    id: 28,
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    duration: 141,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: "https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&auto=format&fit=crop&q=80",
    hues: [320, 280],
    genre: "Pop"
  },
  {
    id: 29,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    hues: [290, 330],
    genre: "Pop"
  },
  {
    id: 30,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: 167,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    hues: [180, 220],
    genre: "Pop"
  },
  {
    id: 31,
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    duration: 230,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://images.unsplash.com/photo-1513829096960-ef093143c524?w=300&auto=format&fit=crop&q=80",
    hues: [260, 320],
    genre: "Pop"
  },
  {
    id: 32,
    title: "Roar",
    artist: "Katy Perry",
    album: "Prism",
    duration: 223,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    hues: [140, 180],
    genre: "Pop"
  },
  {
    id: 33,
    title: "Shake It Off",
    artist: "Taylor Swift",
    album: "1989",
    duration: 219,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=300&auto=format&fit=crop&q=80",
    hues: [320, 30],
    genre: "Pop"
  },
  {
    id: 34,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    duration: 200,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=80",
    hues: [40, 60],
    genre: "Pop"
  },
  {
    id: 35,
    title: "Sorry",
    artist: "Justin Bieber",
    album: "Purpose",
    duration: 200,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=80",
    hues: [180, 210],
    genre: "Pop"
  },
  {
    id: 36,
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    duration: 178,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop&q=80",
    hues: [340, 10],
    genre: "Pop"
  },
  {
    id: 37,
    title: "Dynamite",
    artist: "BTS",
    album: "Be",
    duration: 199,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80",
    hues: [300, 340],
    genre: "Pop"
  },
  {
    id: 38,
    title: "Cold Heart",
    artist: "Elton John & Dua Lipa",
    album: "The Lockdown Sessions",
    duration: 202,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    hues: [190, 240],
    genre: "Pop"
  },
  {
    id: 39,
    title: "Dance The Night",
    artist: "Dua Lipa",
    album: "Barbie The Album",
    duration: 176,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [320, 350],
    genre: "Pop"
  },

  // ==================== HIP HOP & RAP (ID: 40 to 59) ====================
  {
    id: 40,
    title: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile",
    duration: 326,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    hues: [0, 5],
    genre: "Hip Hop"
  },
  {
    id: 41,
    title: "See You Again",
    artist: "Wiz Khalifa & Charlie Puth",
    album: "Furious 7",
    duration: 229,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: "https://images.unsplash.com/photo-1422056494055-16c04f39c445?w=300&auto=format&fit=crop&q=80",
    hues: [25, 45],
    genre: "Hip Hop"
  },
  {
    id: 42,
    title: "God's Plan",
    artist: "Drake",
    album: "Scary Hours",
    duration: 198,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=300&auto=format&fit=crop&q=80",
    hues: [240, 270],
    genre: "Hip Hop"
  },
  {
    id: 43,
    title: "Humble",
    artist: "Kendrick Lamar",
    album: "DAMN.",
    duration: 177,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=80",
    hues: [0, 20],
    genre: "Hip Hop"
  },
  {
    id: 44,
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    album: "Spider-Man: Into the Spider-Verse",
    duration: 158,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=80",
    hues: [45, 65],
    genre: "Hip Hop"
  },
  {
    id: 45,
    title: "Gangsta's Paradise",
    artist: "Coolio",
    album: "Gangsta's Paradise",
    duration: 240,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    hues: [120, 280],
    genre: "Hip Hop"
  },
  {
    id: 46,
    title: "Yeah!",
    artist: "Usher ft. Lil Jon & Ludacris",
    album: "Confessions",
    duration: 250,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    hues: [140, 160],
    genre: "Hip Hop"
  },
  {
    id: 47,
    title: "Lucid Dreams",
    artist: "Juice WRLD",
    album: "Goodbye & Good Riddance",
    duration: 239,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&auto=format&fit=crop&q=80",
    hues: [300, 320],
    genre: "Hip Hop"
  },
  {
    id: 48,
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    album: "Montero",
    duration: 212,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1513829096960-ef093143c524?w=300&auto=format&fit=crop&q=80",
    hues: [340, 360],
    genre: "Hip Hop"
  },
  {
    id: 49,
    title: "Rockstar",
    artist: "Post Malone ft. 21 Savage",
    album: "Beerbongs & Bentleys",
    duration: 218,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [10, 40],
    genre: "Hip Hop"
  },
  {
    id: 50,
    title: "In Da Club",
    artist: "50 Cent",
    album: "Get Rich or Die Tryin'",
    duration: 193,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    hues: [15, 30],
    genre: "Hip Hop"
  },
  {
    id: 51,
    title: "Old Town Road",
    artist: "Lil Nas X",
    album: "7 EP",
    duration: 157,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=300&auto=format&fit=crop&q=80",
    hues: [35, 50],
    genre: "Hip Hop"
  },
  {
    id: 52,
    title: "No Role Modelz",
    artist: "J. Cole",
    album: "2014 Forest Hills Drive",
    duration: 292,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&auto=format&fit=crop&q=80",
    hues: [130, 160],
    genre: "Hip Hop"
  },
  {
    id: 53,
    title: "Super Bass",
    artist: "Nicki Minaj",
    album: "Pink Friday",
    duration: 200,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=300&auto=format&fit=crop&q=80",
    hues: [330, 350],
    genre: "Hip Hop"
  },
  {
    id: 54,
    title: "Hypnotize",
    artist: "The Notorious B.I.G.",
    album: "Life After Death",
    duration: 230,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80",
    hues: [45, 10],
    genre: "Hip Hop"
  },
  {
    id: 55,
    title: "California Love",
    artist: "2Pac",
    album: "All Eyez on Me",
    duration: 284,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&auto=format&fit=crop&q=80",
    hues: [25, 55],
    genre: "Hip Hop"
  },
  {
    id: 56,
    title: "XO Tour Llif3",
    artist: "Lil Uzi Vert",
    album: "Luv Is Rage 2",
    duration: 182,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: "https://images.unsplash.com/photo-1525417071002-5ee4e6bb44f7?w=300&auto=format&fit=crop&q=80",
    hues: [290, 320],
    genre: "Hip Hop"
  },
  {
    id: 57,
    title: "Godzilla",
    artist: "Eminem ft. Juice WRLD",
    album: "Music to Be Murdered By",
    duration: 210,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: "https://images.unsplash.com/photo-1446057032654-9d8885b76c2a?w=300&auto=format&fit=crop&q=80",
    hues: [5, 25],
    genre: "Hip Hop"
  },
  {
    id: 58,
    title: "Rap God",
    artist: "Eminem",
    album: "The Marshall Mathers LP 2",
    duration: 363,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
    hues: [200, 230],
    genre: "Hip Hop"
  },
  {
    id: 59,
    title: "Sicko Mode",
    artist: "Travis Scott",
    album: "Astroworld",
    duration: 312,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    hues: [280, 240],
    genre: "Hip Hop"
  },

  // ==================== INDIE, ALTERNATIVE & SOUL (ID: 60 to 79) ====================
  {
    id: 60,
    title: "Someone Like You",
    artist: "Adele",
    album: "21",
    duration: 285,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80",
    hues: [220, 200],
    genre: "Indie & Soul"
  },
  {
    id: 61,
    title: "Rolling in the Deep",
    artist: "Adele",
    album: "21",
    duration: 228,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    hues: [15, 35],
    genre: "Indie & Soul"
  },
  {
    id: 62,
    title: "Take Me to Church",
    artist: "Hozier",
    album: "Hozier",
    duration: 241,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    cover: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&auto=format&fit=crop&q=80",
    hues: [270, 310],
    genre: "Indie & Soul"
  },
  {
    id: 63,
    title: "Riptide",
    artist: "Vance Joy",
    album: "Dream Your Life Away",
    duration: 204,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop&q=80",
    hues: [140, 170],
    genre: "Indie & Soul"
  },
  {
    id: 64,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    duration: 240,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=300&auto=format&fit=crop&q=80",
    hues: [200, 180],
    genre: "Indie & Soul"
  },
  {
    id: 65,
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    album: "AM",
    duration: 272,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1513829096960-ef093143c524?w=300&auto=format&fit=crop&q=80",
    hues: [330, 300],
    genre: "Indie & Soul"
  },
  {
    id: 66,
    title: "Pumped Up Kicks",
    artist: "Foster the People",
    album: "Torches",
    duration: 239,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    hues: [160, 190],
    genre: "Indie & Soul"
  },
  {
    id: 67,
    title: "Stressed Out",
    artist: "Twenty One Pilots",
    album: "Blurryface",
    duration: 202,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=300&auto=format&fit=crop&q=80",
    hues: [0, 350],
    genre: "Indie & Soul"
  },
  {
    id: 68,
    title: "Little Talks",
    artist: "Of Monsters and Men",
    album: "My Head Is an Animal",
    duration: 266,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&auto=format&fit=crop&q=80",
    hues: [35, 15],
    genre: "Indie & Soul"
  },
  {
    id: 69,
    title: "Ho Hey",
    artist: "The Lumineers",
    album: "The Lumineers",
    duration: 163,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=300&auto=format&fit=crop&q=80",
    hues: [30, 45],
    genre: "Indie & Soul"
  },
  {
    id: 70,
    title: "Skinny Love",
    artist: "Bon Iver",
    album: "For Emma, Forever Ago",
    duration: 239,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&auto=format&fit=crop&q=80",
    hues: [50, 30],
    genre: "Indie & Soul"
  },
  {
    id: 71,
    title: "Budding Trees",
    artist: "Nahko",
    album: "Dark as Night",
    duration: 251,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://images.unsplash.com/photo-1446057032654-9d8885b76c2a?w=300&auto=format&fit=crop&q=80",
    hues: [120, 160],
    genre: "Indie & Soul"
  },
  {
    id: 72,
    title: "Safe and Sound",
    artist: "Capital Cities",
    album: "In a Tidal Wave of Mystery",
    duration: 193,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=80",
    hues: [320, 340],
    genre: "Indie & Soul"
  },
  {
    id: 73,
    title: "Ophelia",
    artist: "The Lumineers",
    album: "Cleopatra",
    duration: 160,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80",
    hues: [40, 50],
    genre: "Indie & Soul"
  },
  {
    id: 74,
    title: "Breezeblocks",
    artist: "alt-J",
    album: "An Awesome Wave",
    duration: 227,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: "https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&auto=format&fit=crop&q=80",
    hues: [180, 150],
    genre: "Indie & Soul"
  },
  {
    id: 75,
    title: "Tongue Tied",
    artist: "Grouplove",
    album: "Never Trust a Happy Song",
    duration: 218,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [310, 340],
    genre: "Indie & Soul"
  },
  {
    id: 76,
    title: "Mountain Sound",
    artist: "Of Monsters and Men",
    album: "My Head Is an Animal",
    duration: 211,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: "https://images.unsplash.com/photo-1422056494055-16c04f39c445?w=300&auto=format&fit=crop&q=80",
    hues: [160, 200],
    genre: "Indie & Soul"
  },
  {
    id: 77,
    title: "Dog Days Are Over",
    artist: "Florence + The Machine",
    album: "Lungs",
    duration: 252,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=300&auto=format&fit=crop&q=80",
    hues: [30, 330],
    genre: "Indie & Soul"
  },
  {
    id: 78,
    title: "Radioactive",
    artist: "Imagine Dragons",
    album: "Night Visions",
    duration: 186,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    cover: "https://images.unsplash.com/photo-1525417071002-5ee4e6bb44f7?w=300&auto=format&fit=crop&q=80",
    hues: [350, 10],
    genre: "Indie & Soul"
  },
  {
    id: 79,
    title: "Sail",
    artist: "AWOLNATION",
    album: "Megalithic Symphony",
    duration: 259,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://images.unsplash.com/photo-1453733190148-c44698c265a8?w=300&auto=format&fit=crop&q=80",
    hues: [240, 260],
    genre: "Indie & Soul"
  },

  // ==================== EXTRA HITS (ID: 80 to 99) ====================
  {
    id: 80,
    title: "We Are the Champions",
    artist: "Queen",
    album: "News of the World",
    duration: 179,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [45, 80],
    genre: "Rock"
  },
  {
    id: 81,
    title: "Welcome to the Black Parade",
    artist: "My Chemical Romance",
    album: "The Black Parade",
    duration: 312,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&auto=format&fit=crop&q=80",
    hues: [0, 180],
    genre: "Rock"
  },
  {
    id: 82,
    title: "Come As You Are",
    artist: "Nirvana",
    album: "Nevermind",
    duration: 219,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
    hues: [180, 210],
    genre: "Rock"
  },
  {
    id: 83,
    title: "Mr. Brightside",
    artist: "The Killers",
    album: "Hot Fuss",
    duration: 222,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
    hues: [30, 60],
    genre: "Rock"
  },
  {
    id: 84,
    title: "Karma Police",
    artist: "Radiohead",
    album: "OK Computer",
    duration: 264,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    hues: [230, 270],
    genre: "Rock"
  },
  {
    id: 85,
    title: "Creep",
    artist: "Radiohead",
    album: "Pablo Honey",
    duration: 236,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    hues: [180, 210],
    genre: "Rock"
  },
  {
    id: 86,
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    album: "Spider-Man: Into the Spider-Verse",
    duration: 158,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=80",
    hues: [45, 65],
    genre: "Hip Hop"
  },
  {
    id: 87,
    title: "Gangsta's Paradise",
    artist: "Coolio",
    album: "Gangsta's Paradise",
    duration: 240,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    hues: [120, 280],
    genre: "Hip Hop"
  },
  {
    id: 88,
    title: "Yeah!",
    artist: "Usher ft. Lil Jon & Ludacris",
    album: "Confessions",
    duration: 250,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    hues: [140, 160],
    genre: "Hip Hop"
  },
  {
    id: 89,
    title: "Lucid Dreams",
    artist: "Juice WRLD",
    album: "Goodbye & Good Riddance",
    duration: 239,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: "https://images.unsplash.com/photo-1487180142328-054b783fc471?w=300&auto=format&fit=crop&q=80",
    hues: [300, 320],
    genre: "Hip Hop"
  },
  {
    id: 90,
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    album: "Montero",
    duration: 212,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: "https://images.unsplash.com/photo-1513829096960-ef093143c524?w=300&auto=format&fit=crop&q=80",
    hues: [340, 360],
    genre: "Hip Hop"
  },
  {
    id: 91,
    title: "Rockstar",
    artist: "Post Malone ft. 21 Savage",
    album: "Beerbongs & Bentleys",
    duration: 218,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    hues: [10, 40],
    genre: "Hip Hop"
  },
  {
    id: 92,
    title: "In Da Club",
    artist: "50 Cent",
    album: "Get Rich or Die Tryin'",
    duration: 193,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    hues: [15, 30],
    genre: "Hip Hop"
  },
  {
    id: 93,
    title: "Old Town Road",
    artist: "Lil Nas X",
    album: "7 EP",
    duration: 157,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=300&auto=format&fit=crop&q=80",
    hues: [35, 50],
    genre: "Hip Hop"
  },
  {
    id: 94,
    title: "No Role Modelz",
    artist: "J. Cole",
    album: "2014 Forest Hills Drive",
    duration: 292,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&auto=format&fit=crop&q=80",
    hues: [130, 160],
    genre: "Hip Hop"
  },
  {
    id: 95,
    title: "Super Bass",
    artist: "Nicki Minaj",
    album: "Pink Friday",
    duration: 200,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=300&auto=format&fit=crop&q=80",
    hues: [330, 350],
    genre: "Hip Hop"
  },
  {
    id: 96,
    title: "Riptide",
    artist: "Vance Joy",
    album: "Dream Your Life Away",
    duration: 204,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop&q=80",
    hues: [140, 170],
    genre: "Indie & Soul"
  },
  {
    id: 97,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    duration: 240,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=300&auto=format&fit=crop&q=80",
    hues: [200, 180],
    genre: "Indie & Soul"
  },
  {
    id: 98,
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    album: "AM",
    duration: 272,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1513829096960-ef093143c524?w=300&auto=format&fit=crop&q=80",
    hues: [330, 300],
    genre: "Indie & Soul"
  },
  {
    id: 99,
    title: "Pumped Up Kicks",
    artist: "Foster the People",
    album: "Torches",
    duration: 239,
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    hues: [160, 190],
    genre: "Indie & Soul"
  }
];

export const PLAYLISTS: Playlist[] = [
  {
    id: "rock-anthems",
    name: "Rock Anthems",
    description: "Legendary stadium rock hits and classic anthems",
    hues: [15, 300],
    songIds: Array.from({ length: 20 }, (_, i) => i), // 0 to 19
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80"
  },
  {
    id: "pop-party",
    name: "Pop Party",
    description: "Vibrant high-energy pop hits, perfect for dancing",
    hues: [320, 200],
    songIds: Array.from({ length: 20 }, (_, i) => i + 20), // 20 to 39
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80"
  },
  {
    id: "hiphop-beats",
    name: "Hip Hop & Beats",
    description: "Modern hip hop gold standard beats and legendary rap tracks",
    hues: [140, 15],
    songIds: Array.from({ length: 20 }, (_, i) => i + 40), // 40 to 59
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80"
  },
  {
    id: "alt-indie",
    name: "Alternative & Indie",
    description: "Beautiful independent acoustic indie hits and warm soul sounds",
    hues: [200, 120],
    songIds: Array.from({ length: 20 }, (_, i) => i + 60), // 60 to 79
    cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&q=80"
  },
  {
    id: "extra-hits",
    name: "Extra Hits",
    description: "More chart-topping hits from rock, hip hop, and indie",
    hues: [45, 200],
    songIds: Array.from({ length: 20 }, (_, i) => i + 80), // 80 to 99
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80"
  },
  {
    id: "rainy-windows",
    name: "Rainy Windows",
    description: "Comforting, melancholy and relaxing lo-fi acoustic afternoons",
    hues: [220, 260],
    songIds: [4, 6, 8, 11, 22, 25, 30, 41, 44, 60, 61, 64, 70, 71, 73, 96, 97, 98, 99],
    cover: "https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=400&q=80"
  },
  {
    id: "fresh-finds",
    name: "Fresh Finds",
    description: "The absolute best emerging tracks from across all genres",
    hues: [300, 140],
    songIds: [0, 1, 10, 21, 23, 27, 34, 43, 48, 52, 63, 66, 75, 78, 80, 81, 82, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80"
  }
];

/**
 * Procedural album art backup using SVG gradients
 */
export function getProceduralArt(song: Song): string {
  const [a, b] = song.hues;
  const c1 = `hsl(${a}, 70%, 58%)`;
  const c2 = `hsl(${b}, 62%, 40%)`;
  const c3 = `hsl(${a}, 82%, 72%)`;
  const c4 = `hsl(${b}, 70%, 30%)`;
  const v = song.id % 4;

  let shapes = '';
  if (v === 0) {
    shapes = `<circle cx='30' cy='34' r='34' fill='${c3}' opacity='.85'/><circle cx='78' cy='80' r='40' fill='${c4}' opacity='.7'/>`;
  } else if (v === 1) {
    shapes = `<rect x='-10' y='40' width='140' height='34' fill='${c3}' opacity='.8' transform='rotate(-18 50 50)'/><rect x='-10' y='72' width='140' height='20' fill='${c4}' opacity='.7' transform='rotate(-18 50 50)'/>`;
  } else if (v === 2) {
    shapes = `<polygon points='50,4 96,88 4,88' fill='${c3}' opacity='.8'/><circle cx='50' cy='62' r='20' fill='${c4}' opacity='.75'/>`;
  } else {
    shapes = `<circle cx='50' cy='50' r='40' fill='none' stroke='${c3}' stroke-width='7' opacity='.85'/><circle cx='50' cy='50' r='22' fill='none' stroke='${c4}' stroke-width='6' opacity='.8'/><circle cx='50' cy='50' r='6' fill='${c3}'/>`;
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g_${song.id}' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='100' height='100' fill='url(#g_${song.id})'/>${shapes}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getPlaylistArt(playlist: Playlist): string {
  if (playlist.cover) return playlist.cover;
  const [a, b] = playlist.hues;
  const c1 = `hsl(${a}, 68%, 56%)`;
  const c2 = `hsl(${b}, 60%, 40%)`;
  const c3 = `hsl(${a}, 80%, 70%)`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='pl_${playlist.id}' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='100' height='100' fill='url(#pl_${playlist.id})'/><circle cx='72' cy='28' r='26' fill='${c3}' opacity='.55'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
