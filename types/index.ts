// Gallery: Represents a collection of images (e.g., “Wildlife”, “Portraits”).

// Album (optional): Nested grouping inside a gallery (e.g., “Kenya Safari 2024”).

// GalleryImage: The individual image entity.

type ImageOrientation = "landscape" | "portrait" | "square";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  placeholder?: string;
  photographer?: string;
  tags?: string[];
  category?: string;
  createdAt?: Date;

  // Technical details
  width?: number;
  height?: number;
  aspectRatio?: number;
  orientation?: ImageOrientation;
  dominantColor?: string;

  // Engagement
  likes?: number;
  views?: number;

  // Optional metadata (EXIF)
  metadata?: {
    camera?: string;
    lens?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: number;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  coverImage?: GalleryImage;
  images: GalleryImage[];
  createdAt?: Date;
}

export interface Gallery {
  id: string;
  name: string;
  description?: string;
  albums?: Album[];
  images?: GalleryImage[]; // for galleries without albums
  createdAt?: Date;
}

export interface CardData {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
}

export interface CardProps {
  cards: CardData[];
}

export interface PhotographyCategoryData {
  category: string;
  description: string;
  image_url: string;
}

export const sampleImages: Gallery[] = [
  {
    id: "gallery-001",
    name: "Wildlife Photography",
    description: "A collection of wildlife shots from different safaris.",
    createdAt: new Date(),
    albums: [
      {
        id: "album-001",
        name: "Kenya Safari 2024",
        description: "Highlights from Maasai Mara and Amboseli.",
        createdAt: new Date(),
        coverImage: {
          id: "img-001",
          src: "/images/lion-edited.jpg",
          alt: "A lion resting in the savannah",
          title: "King of the Mara",
          photographer: "Leakey Meitekini",
          tags: ["lion", "savannah", "wildlife"],
          category: "Big Cats",
          createdAt: new Date(),
          width: 1920,
          height: 1280,
          aspectRatio: 1.5,
          orientation: "landscape",
          dominantColor: "#c49a6c",
          metadata: {
            camera: "Canon EOS R5",
            lens: "RF 100-500mm",
            aperture: "f/5.6",
            shutterSpeed: "1/1000s",
            iso: 400,
            location: {
              latitude: -1.4061,
              longitude: 35.0131,
            },
          },
        },
        images: [
          {
            id: "img-002",
            src: "/images/elephant-edited.jpg",
            alt: "Elephant walking across the plains",
            title: "Gentle Giant",
            category: "Wildlife Photography",
            tags: ["elephant", "savannah", "wildlife"],
            createdAt: new Date(),
            width: 540,
            height: 360,
            aspectRatio: 1.5,
            orientation: "landscape",
            dominantColor: "#8a7f6d",
          },
          {
            id: "img-003",
            src: "/images/cheetah-edited.jpg",
            alt: "Cheetah scanning the horizon",
            title: "The Watcher",
            category: "Wildlife Photography",
            tags: ["cheetah", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-004",
            src: "/images/lion1-edited.jpg",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Wildlife Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-005",
            src: "/images/portfolio-img5.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Wildlife Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-006",
            src: "/images/portfolio-img4.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Wildlife Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-007",
            src: "/images/portfolio-img3.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Street Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-008",
            src: "/images/portfolio-img2.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Street Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-009",
            src: "/images/portfolio-img7.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Street Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-010",
            src: "/images/portfolio-img8.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Street Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-011",
            src: "/images/portfolio-img7.png",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Street Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
          {
            id: "img-012",
            src: "/images/tiger.jpg",
            alt: "Cheetah scanning the horizon",
            title: "The King",
            category: "Wildlife Photography",
            tags: ["lion", "predator", "wildlife"],
            createdAt: new Date(),
            width: 600,
            height: 553,
            aspectRatio: 0.67,
            orientation: "portrait",
            dominantColor: "#d4c29f",
          },
        ],
      },
    ],
  },
];

export const photograpyCategoryData: PhotographyCategoryData[] = [
  {
    category: "Landscape Photography",
    description:
      "Captures natural scenery such as mountains, forests, and oceans, often emphasizing scale and beauty.",
    image_url: "/images/landscape-img1.jpg",
  },
  {
    category: "Portrait Photography",
    description:
      "Focuses on capturing the personality, mood, and expressions of individuals or groups.",
    image_url: "/images/portrait-photography1.jpg",
  },
  {
    category: "Wildlife Photography",
    description:
      "Documents animals in their natural habitats, often requiring patience and long lenses.",
    image_url: "/images/wildlife-img2.jpg",
  },
  {
    category: "Street Photography",
    description:
      "Candidly captures everyday life and human interactions in public spaces.",
    image_url: "/images/street-photography.jpg",
  },
  {
    category: "Macro Photography",
    description:
      "Reveals tiny details of small subjects like insects, flowers, or textures.",
    image_url: "/images/macro-photography.jpg",
  },
  {
    category: "Architectural Photography",
    description:
      "Showcases buildings, structures, and urban design with artistic or documentary intent.",
    image_url: "/images/architectural-photography.jpg",
  },
  {
    category: "Food Photography",
    description:
      "Highlights meals, ingredients, and culinary art, often used in advertising and social media.",
    image_url: "/images/food-photography.jpg",
  },
  {
    category: "Astrophotography",
    description:
      "Captures celestial objects like stars, galaxies, and the Milky Way using long exposures.",
    image_url: "/images/astro-photography.jpg",
  },
];

export const monthlyActivityData = [
  {
    title: "Elephant",
    description: "I am big 5.",
    href: "#",
    imageUrl: "/images/elephant-headshot.jpg",
  },
  {
    title: "Lion",
    description: "The King of the Jungle.",
    href: "#",
    imageUrl: "/images/lion1.jpg",
  },
  {
    title: "Cheetah",
    description: "The Fastes",
    href: "#",
    imageUrl: "/images/cheetah.jpg",
  },
  {
    title: "Sitting Cheetah",
    description: "The slow movement of a cheetah is not a mistake.",
    href: "#",
    imageUrl: "/images/sitting-cheetah.jpg",
  },
  {
    title: "Tiger",
    description: "Tiger is stronger than the lion. But not the king",
    href: "#",
    imageUrl: "/images/tiger.jpg",
  },
];