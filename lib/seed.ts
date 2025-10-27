// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

/**
 * Random helpers
 */
const cameras = [
  "Canon EOS R5",
  "Sony A7 III",
  "Nikon Z6 II",
  "Fujifilm X-T4",
  "Canon 5D Mark IV",
];

const lenses = [
  "24-70mm f/2.8",
  "16-35mm f/4",
  "70-200mm f/2.8",
  "50mm f/1.8",
  "85mm f/1.4",
];

const apertures = ["f/1.8", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11"];
const shutters = ["1/60s", "1/125s", "1/250s", "1/500s", "1/1000s"];
const photographers = [
  "Alice Johnson",
  "David Kim",
  "Aisha Mwangi",
  "Liam Patel",
  "Noah Fernandez",
  "Grace Okello",
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomHexColor() {
  return `#${randomInt(0, 255).toString(16).padStart(2, "0")}${randomInt(0, 255)
    .toString(16)
    .padStart(2, "0")}${randomInt(0, 255).toString(16).padStart(2, "0")}`;
}

type Bounds = { latMin: number; latMax: number; lonMin: number; lonMax: number };
function randomCoord(bounds: Bounds) {
  const lat =
    Math.random() * (bounds.latMax - bounds.latMin) + bounds.latMin;
  const lon =
    Math.random() * (bounds.lonMax - bounds.lonMin) + bounds.lonMin;
  return { latitude: +lat.toFixed(6), longitude: +lon.toFixed(6) };
}

const coordByCategory: Record<string, Bounds> = {
  "Landscape": { latMin: 45, latMax: 48, lonMin: 6, lonMax: 10 }, // Alps-ish
  "Wedding": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 }, // Nairobi
  "Street Photography": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 }, // Nairobi streets
  "Portrait": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 }, // Studio/urban
  "Wildlife": { latMin: -2.0, latMax: -1.0, lonMin: 35.0, lonMax: 37.0 }, // Kenya safari belt
  "Event / Documentary": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 },
  "Product / Commercial": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 },
  "Urban Life": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 },
  "Abstract Art": { latMin: -1.35, latMax: -1.20, lonMin: 36.75, lonMax: 36.90 },
};

function randomEXIF() {
  return {
    camera: pick(cameras),
    lens: pick(lenses),
    aperture: pick(apertures),
    shutterSpeed: pick(shutters),
    iso: randomInt(100, 1600),
    dominantColor: randomHexColor(),
    photographer: pick(photographers),
  };
}

function captionFor(title?: string | null, category?: string | null) {
  const base = title || "Untitled";
  const tail =
    category === "Wedding"
      ? "Captured during heartfelt moments."
      : category === "Street Photography"
      ? "Candid slice of urban life."
      : category === "Portrait"
      ? "Character study in expressive light."
      : category === "Landscape"
      ? "A quiet study of place and scale."
      : category === "Wildlife"
      ? "Observed with care and patience."
      : category === "Event / Documentary"
      ? "Energy and story in motion."
      : category === "Product / Commercial"
      ? "Designed for clarity and brand feel."
      : category === "Urban Life"
      ? "Everyday geometry and rhythm."
      : "Concept and texture intertwined.";
  return `${base}. ${tail}`;
}

type Img = {
  src: string;
  alt: string;
  title?: string | null;
  caption?: string | null;
  photographer?: string | null;
  tags: string[]; // Keep as String[] for Postgres; switch to Json in schema for other DBs
  category?: string | null;
  width?: number | null;
  height?: number | null;
  aspectRatio?: number | null;
  orientation?: "landscape" | "portrait" | "square" | null;
  dominantColor?: string | null;
  camera?: string | null;
  lens?: string | null;
  aperture?: string | null;
  shutterSpeed?: string | null;
  iso?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  likes?: number | null;
  views?: number | null;
};

function withRandomMeta(img: Omit<Img, "likes" | "views" | "caption" | "photographer" | "latitude" | "longitude">): Img {
  const exif = randomEXIF();

  let width: number | undefined = img.width ?? undefined;
  let height: number | undefined = img.height ?? undefined;
  let aspectRatio: number | undefined = img.aspectRatio ?? undefined;

  if (!width || !height || !aspectRatio) {
    if (img.orientation === "square") {
      width = 1200;
      height = 1200;
      aspectRatio = 1;
    } else if (img.orientation === "portrait") {
      width = 1080;
      height = 1350;
      aspectRatio = 4 / 5;
    } else {
      width = 1920;
      height = 1080;
      aspectRatio = 16 / 9;
    }
  }

  const bounds =
    (img.category && coordByCategory[img.category]) ||
    coordByCategory["Urban Life"];
  const { latitude, longitude } = randomCoord(bounds);

  return {
    ...img,
    ...exif,
    width,
    height,
    aspectRatio,
    likes: randomInt(0, 500),
    views: randomInt(100, 10000),
    caption: captionFor(img.title, img.category),
    latitude,
    longitude,
  };
}

async function createGalleryWithAlbums(
  galleryId: string,
  name: string,
  description: string | null,
  albums: {
    name: string;
    description?: string | null;
    images: Omit<Img, "likes" | "views" | "caption" | "photographer" | "latitude" | "longitude">[];
  }[]
) {
  const gallery = await prisma.gallery.create({
    data: { id: galleryId, name, description },
  });

  for (const album of albums) {
    const albumId = uuid();

    await prisma.album.create({
      data: {
        id: albumId,
        name: album.name,
        description: album.description ?? null,
        galleryId: gallery.id,
      },
    });

    const imagesWithRandoms = album.images.map(withRandomMeta);

    await prisma.galleryImage.createMany({
      data: imagesWithRandoms.map((img) => ({
        ...img,
        galleryId: gallery.id,
        albumId,
        createdAt: new Date(),
      })),
    });

    const cover = await prisma.galleryImage.findFirst({
      where: { albumId },
      orderBy: { createdAt: "asc" },
    });

    if (cover) {
      await prisma.album.update({
        where: { id: albumId },
        data: { coverImageId: cover.id },
      });
    }
  }
}

async function main() {
  // Dev reset
  await prisma.galleryImage.deleteMany();
  await prisma.album.deleteMany();
  await prisma.gallery.deleteMany();

  // 1) Nature Wonders
  await createGalleryWithAlbums("nature", "Nature Wonders", "Landscapes and wildlife", [
    {
      name: "Mountains",
      description: "Peaks, sunrise, alpine scenes",
      images: [
        {
          src: "/images/nature/mountain-sunrise.jpg",
          alt: "Sunrise over snowy mountains",
          title: "Golden Peaks",
          tags: ["mountains", "sunrise", "landscape"],
          category: "Landscape",
          orientation: "landscape",
        },
        {
          src: "/images/nature/mirror-lake.jpg",
          alt: "Crystal lake with mountain reflection",
          title: "Mirror Lake",
          tags: ["lake", "reflection", "mountains"],
          category: "Landscape",
          orientation: "portrait",
        },
        {
          src: "/images/nature/snowy-peak.jpg",
          alt: "Snowy peak under clear sky",
          title: "Summit Calm",
          tags: ["snow", "peak", "clarity"],
          category: "Landscape",
          orientation: "square",
        },
      ],
    },
    {
      name: "Forests",
      description: "Moody paths and green canopies",
      images: [
        {
          src: "/images/nature/forest-path.jpg",
          alt: "Forest path with dappled light",
          title: "Dappled Path",
          tags: ["forest", "green", "trail"],
          category: "Landscape",
          orientation: "landscape",
        },
        {
          src: "/images/nature/mist-woods.jpg",
          alt: "Misty woods in early morning",
          title: "Morning Mist",
          tags: ["mist", "woods", "calm"],
          category: "Landscape",
          orientation: "portrait",
        },
      ],
    },
  ]);

  // 2) Wedding
  await createGalleryWithAlbums("wedding", "Wedding", "Ceremonies and receptions", [
    {
      name: "Ceremony",
      description: "Vows, rings, aisle moments",
      images: [
        {
          src: "/images/wedding/bridal-silhouette.jpg",
          alt: "Bride silhouette near window",
          title: "Bridal Silhouette",
          tags: ["love", "ceremony", "bride"],
          category: "Wedding",
          orientation: "portrait",
        },
        {
          src: "/images/wedding/ring-exchange.jpg",
          alt: "Ring exchange close-up",
          title: "Ring Exchange",
          tags: ["rings", "vows", "detail"],
          category: "Wedding",
          orientation: "square",
        },
        {
          src: "/images/wedding/aisle-walk.jpg",
          alt: "Bride walking down the aisle",
          title: "Aisle Walk",
          tags: ["ceremony", "family", "emotion"],
          category: "Wedding",
          orientation: "landscape",
        },
      ],
    },
    {
      name: "Reception",
      description: "First dance, speeches, cake",
      images: [
        {
          src: "/images/wedding/first-dance.jpg",
          alt: "Couple's first dance",
          title: "First Dance",
          tags: ["reception", "dance", "romance"],
          category: "Wedding",
          orientation: "landscape",
        },
        {
          src: "/images/wedding/cake-cutting.jpg",
          alt: "Cake cutting moment",
          title: "Cake Cutting",
          tags: ["cake", "celebration", "sweet"],
          category: "Wedding",
          orientation: "portrait",
        },
        {
          src: "/images/wedding/family-portrait.jpg",
          alt: "Family group portrait",
          title: "Family Portrait",
          tags: ["family", "group", "memories"],
          category: "Wedding",
          orientation: "landscape",
        },
      ],
    },
    {
      name: "Details",
      description: "Bouquet, dress, décor",
      images: [
        {
          src: "/images/wedding/bouquet-toss.jpg",
          alt: "Bouquet toss action",
          title: "Bouquet Toss",
          tags: ["celebration", "tradition", "fun"],
          category: "Wedding",
          orientation: "landscape",
        },
        {
          src: "/images/wedding/table-decor.jpg",
          alt: "Reception table decor",
          title: "Reception Decor",
          tags: ["decor", "florals", "table"],
          category: "Wedding",
          orientation: "square",
        },
      ],
    },
  ]);

  // 3) Street Photography
  await createGalleryWithAlbums("street", "Street Photography", "Urban candid moments", [
    {
      name: "Daylight",
      description: "Markets and daily rush",
      images: [
        {
          src: "/images/street/crosswalk-rush.jpg",
          alt: "People crossing street",
          title: "Crosswalk Rush",
          tags: ["urban", "candid", "daily"],
          category: "Street Photography",
          orientation: "landscape",
        },
        {
          src: "/images/street/market-hustle.jpg",
          alt: "Busy market scene",
          title: "Market Hustle",
          tags: ["market", "vendors", "culture"],
          category: "Street Photography",
          orientation: "portrait",
        },
        {
          src: "/images/street/graffiti-wall.jpg",
          alt: "Colorful graffiti wall",
          title: "Graffiti Wall",
          tags: ["art", "graffiti", "color"],
          category: "Street Photography",
          orientation: "square",
        },
      ],
    },
    {
      name: "Night",
      description: "Neon, rain, reflections",
      images: [
        {
          src: "/images/street/neon-nights.jpg",
          alt: "Neon-lit street at night",
          title: "Neon Nights",
          tags: ["city", "night", "lights"],
          category: "Street Photography",
          orientation: "portrait",
        },
        {
          src: "/images/street/rainy-reflections.jpg",
          alt: "Puddles reflecting lights",
          title: "Rainy Reflections",
          tags: ["rain", "reflection", "urban"],
          category: "Street Photography",
          orientation: "landscape",
        },
        {
          src: "/images/street/old-man-reading.jpg",
          alt: "Old man reading newspaper",
          title: "Quiet Read",
          tags: ["candid", "story", "quiet"],
          category: "Street Photography",
          orientation: "square",
        },
      ],
    },
  ]);

  // 4) Portrait
  await createGalleryWithAlbums("portrait", "Portrait", "Studio and natural portraits", [
    {
      name: "Studio",
      description: "Controlled light and headshots",
      images: [
        {
          src: "/images/portrait/studio-headshot.jpg",
          alt: "Studio headshot",
          title: "Studio Headshot",
          tags: ["studio", "headshot", "expression"],
          category: "Portrait",
          orientation: "portrait",
        },
        {
          src: "/images/portrait/black-white-mood.jpg",
          alt: "Monochrome portrait",
          title: "Black & White Mood",
          tags: ["monochrome", "dramatic", "expression"],
          category: "Portrait",
          orientation: "square",
        },
      ],
    },
    {
      name: "Environmental",
      description: "Natural light, character studies",
      images: [
        {
          src: "/images/portrait/natural-light-glow.jpg",
          alt: "Soft outdoor light",
          title: "Natural Light Glow",
          tags: ["outdoor", "soft", "character"],
          category: "Portrait",
          orientation: "portrait",
        },
        {
          src: "/images/portrait/laughing-candid.jpg",
          alt: "Laughing candid portrait",
          title: "Laughing Candid",
          tags: ["joy", "candid", "smile"],
          category: "Portrait",
          orientation: "landscape",
        },
        {
          src: "/images/portrait/profile-silhouette.jpg",
          alt: "Profile silhouette",
          title: "Profile Silhouette",
          tags: ["silhouette", "profile", "contrast"],
          category: "Portrait",
          orientation: "square",
        },
        {
          src: "/images/portrait/cultural-attire.jpg",
          alt: "Traditional attire",
          title: "Cultural Attire",
          tags: ["traditional", "color", "identity"],
          category: "Portrait",
          orientation: "portrait",
        },
      ],
    },
  ]);

  // 5) Landscape
  await createGalleryWithAlbums("landscape", "Landscape", "Scenic vistas and horizons", [
    {
      name: "Vistas",
      description: "Mountains, oceans, deserts",
      images: [
        {
          src: "/images/landscape/mountain-sunrise.jpg",
          alt: "Mountain sunrise",
          title: "Mountain Sunrise",
          tags: ["nature", "mountains", "sunrise"],
          category: "Landscape",
          orientation: "landscape",
        },
        {
          src: "/images/landscape/river-bend.jpg",
          alt: "River bend",
          title: "River Bend",
          tags: ["water", "travel", "scenic"],
          category: "Landscape",
          orientation: "portrait",
        },
        {
          src: "/images/landscape/desert-dunes.jpg",
          alt: "Desert dunes",
          title: "Desert Dunes",
          tags: ["desert", "sand", "minimal"],
          category: "Landscape",
          orientation: "landscape",
        },
        {
          src: "/images/landscape/forest-path.jpg",
          alt: "Forest path",
          title: "Forest Path",
          tags: ["forest", "green", "trail"],
          category: "Landscape",
          orientation: "portrait",
        },
        {
          src: "/images/landscape/ocean-horizon.jpg",
          alt: "Ocean horizon",
          title: "Ocean Horizon",
          tags: ["ocean", "blue", "calm"],
          category: "Landscape",
          orientation: "square",
        },
        {
          src: "/images/landscape/snowy-peaks.jpg",
          alt: "Snowy peaks",
          title: "Snowy Peaks",
          tags: ["snow", "mountains", "cold"],
          category: "Landscape",
          orientation: "landscape",
        },
      ],
    },
    {
      name: "Rivers",
      description: "Flow and bends",
      images: [
        {
          src: "/images/landscape/river-meander.jpg",
          alt: "Meandering river",
          title: "Meander",
          tags: ["river", "flow", "nature"],
          category: "Landscape",
          orientation: "landscape",
        },
        {
          src: "/images/landscape/waterfall.jpg",
          alt: "Waterfall curtain",
          title: "Curtain Falls",
          tags: ["waterfall", "mist", "power"],
          category: "Landscape",
          orientation: "portrait",
        },
      ],
    },
  ]);

  // 6) Wildlife
  await createGalleryWithAlbums("wildlife", "Wildlife", "Animals in their habitats", [
    {
      name: "Savannah",
      description: "Big cats and grazers",
      images: [
        {
          src: "/images/wildlife/lion-golden-hour.jpg",
          alt: "Lion in golden hour",
          title: "Lion in Golden Hour",
          tags: ["safari", "big cat", "nature"],
          category: "Wildlife",
          orientation: "landscape",
        },
        {
          src: "/images/wildlife/cheetah-sprint.jpg",
          alt: "Cheetah sprint",
          title: "Cheetah Sprint",
          tags: ["speed", "predator", "action"],
          category: "Wildlife",
          orientation: "landscape",
        },
        {
          src: "/images/wildlife/giraffe-silhouette.jpg",
          alt: "Giraffe silhouette",
          title: "Giraffe Silhouette",
          tags: ["giraffe", "sunset", "savannah"],
          category: "Wildlife",
          orientation: "portrait",
        },
      ],
    },
    {
      name: "Wings & Macro",
      description: "Birds and tiny wonders",
      images: [
        {
          src: "/images/wildlife/bird-in-flight.jpg",
          alt: "Bird mid-flight",
          title: "Bird in Flight",
          tags: ["birds", "action", "sky"],
          category: "Wildlife",
          orientation: "portrait",
        },
        {
          src: "/images/wildlife/butterfly-macro.jpg",
          alt: "Butterfly macro",
          title: "Butterfly Macro",
          tags: ["macro", "insect", "color"],
          category: "Wildlife",
          orientation: "square",
        },
        {
          src: "/images/wildlife/elephant-herd.jpg",
          alt: "Elephant herd",
          title: "Elephant Herd",
          tags: ["elephant", "family", "savannah"],
          category: "Wildlife",
          orientation: "landscape",
        },
      ],
    },
  ]);

  // 7) Event / Documentary
  await createGalleryWithAlbums("event", "Event / Documentary", "Concerts, festivals, and rallies", [
    {
      name: "Concerts",
      description: "Lights, crowds, energy",
      images: [
        {
          src: "/images/event/concert-lights.jpg",
          alt: "Stage lights",
          title: "Concert Lights",
          tags: ["concert", "stage", "crowd"],
          category: "Event / Documentary",
          orientation: "square",
        },
        {
          src: "/images/event/festival-crowd.jpg",
          alt: "Festival crowd",
          title: "Festival Crowd",
          tags: ["music", "festival", "energy"],
          category: "Event / Documentary",
          orientation: "landscape",
        },
      ],
    },
    {
      name: "Public Life",
      description: "Parades, rallies, street festivals",
      images: [
        {
          src: "/images/event/cultural-parade.jpg",
          alt: "Cultural parade",
          title: "Cultural Parade",
          tags: ["parade", "culture", "tradition"],
          category: "Event / Documentary",
          orientation: "portrait",
        },
        {
          src: "/images/event/political-rally.jpg",
          alt: "Political rally crowd",
          title: "Political Rally",
          tags: ["rally", "crowd", "speech"],
          category: "Event / Documentary",
          orientation: "landscape",
        },
        {
          src: "/images/event/street-festival.jpg",
          alt: "Street festival dancers",
          title: "Street Festival",
          tags: ["street", "festival", "dance"],
          category: "Event / Documentary",
          orientation: "portrait",
        },
        {
          src: "/images/event/sports-match.jpg",
          alt: "Sports match action",
          title: "Sports Match",
          tags: ["sports", "stadium", "action"],
          category: "Event / Documentary",
          orientation: "landscape",
        },
      ],
    },
  ]);

  // 8) Product / Commercial
  await createGalleryWithAlbums("product", "Product / Commercial", "Styled product shots", [
    {
      name: "Studio",
      description: "Clean light, minimal styling",
      images: [
        {
          src: "/images/product/minimalist-watch.jpg",
          alt: "Minimalist watch",
          title: "Minimalist Watch",
          tags: ["studio", "branding", "ad"],
          category: "Product / Commercial",
          orientation: "square",
        },
        {
          src: "/images/product/styled-coffee.jpg",
          alt: "Styled coffee cup",
          title: "Styled Coffee Cup",
          tags: ["branding", "lifestyle", "product"],
          category: "Product / Commercial",
          orientation: "landscape",
        },
        {
          src: "/images/product/sneaker-detail.jpg",
          alt: "Sneaker detail shot",
          title: "Sneaker Detail",
          tags: ["fashion", "detail", "texture"],
          category: "Product / Commercial",
          orientation: "portrait",
        },
      ],
    },
    {
      name: "Lifestyle",
      description: "Products in context",
      images: [
        {
          src: "/images/product/home-desk.jpg",
          alt: "Product on desk",
          title: "Home Desk Setup",
          tags: ["home", "desk", "workflow"],
          category: "Product / Commercial",
          orientation: "landscape",
        },
        {
          src: "/images/product/tote-brand.jpg",
          alt: "Branded tote",
          title: "Tote Branding",
          tags: ["brand", "print", "minimal"],
          category: "Product / Commercial",
          orientation: "portrait",
        },
      ],
    },
  ]);

  // 9) Urban Life
  await createGalleryWithAlbums("urban", "Urban Life", "Cityscapes and daily life", [
    {
      name: "Architecture",
      description: "Glass, steel, reflections",
      images: [
        {
          src: "/images/urban/skyscraper-reflections.jpg",
          alt: "Glass skyscrapers reflecting sunset",
          title: "Skyscraper Reflections",
          tags: ["city", "architecture", "reflection"],
          category: "Urban Life",
          orientation: "landscape",
        },
        {
          src: "/images/urban/geometry-facade.jpg",
          alt: "Geometric facade",
          title: "Geometry Facade",
          tags: ["pattern", "structure", "modern"],
          category: "Urban Life",
          orientation: "square",
        },
      ],
    },
    {
      name: "Transport",
      description: "Subway, streets, flow",
      images: [
        {
          src: "/images/urban/subway-silence.jpg",
          alt: "Empty subway car",
          title: "Subway Silence",
          tags: ["subway", "transport", "minimal"],
          category: "Urban Life",
          orientation: "portrait",
        },
        {
          src: "/images/urban/street-vendor.jpg",
          alt: "Vendor at night market",
          title: "Street Vendor",
          tags: ["street", "market", "night"],
          category: "Urban Life",
          orientation: "square",
        },
        {
          src: "/images/urban/crossing-flow.jpg",
          alt: "Crossing flow at junction",
          title: "Crossing Flow",
          tags: ["traffic", "city", "rush"],
          category: "Urban Life",
          orientation: "landscape",
        },
      ],
    },
  ]);

  // 10) Abstract Art
  await createGalleryWithAlbums("abstract", "Abstract Art", "Creative and conceptual visuals", [
    {
      name: "Color & Shape",
      description: "Expression and geometry",
      images: [
        {
          src: "/images/abstract/color-burst.jpg",
          alt: "Explosion of vibrant paint colors",
          title: "Color Burst",
          tags: ["abstract", "color", "expression"],
          category: "Abstract Art",
          orientation: "square",
        },
        {
          src: "/images/abstract/geometric-flow.jpg",
          alt: "Overlapping geometric shapes",
          title: "Geometric Flow",
          tags: ["geometry", "minimal", "modern"],
          category: "Abstract Art",
          orientation: "landscape",
        },
        {
          src: "/images/abstract/monochrome-waves.jpg",
          alt: "Black and white waves",
          title: "Monochrome Waves",
          tags: ["monochrome", "pattern", "texture"],
          category: "Abstract Art",
          orientation: "portrait",
        },
        {
          src: "/images/abstract/grain-field.jpg",
          alt: "Textured grain field",
          title: "Grain Field",
          tags: ["texture", "grain", "minimal"],
          category: "Abstract Art",
          orientation: "square",
        },
      ],
    },
    {
      name: "Minimal Forms",
      description: "Shape reduction and flow",
      images: [
        {
          src: "/images/abstract/minimal-curves.jpg",
          alt: "Minimal curves on neutral background",
          title: "Minimal Curves",
          tags: ["minimal", "form", "neutral"],
          category: "Abstract Art",
          orientation: "landscape",
        },
        {
          src: "/images/abstract/block-contrast.jpg",
          alt: "Contrasting blocks of color",
          title: "Block Contrast",
          tags: ["color", "contrast", "shape"],
          category: "Abstract Art",
          orientation: "portrait",
        },
      ],
    },
  ]);

  console.log("✅ Seeded galleries, albums (random UUIDs), and images with photographer, caption, and geolocation");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
