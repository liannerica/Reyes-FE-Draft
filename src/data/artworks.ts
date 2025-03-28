
export type ArtworkType = 'painting' | 'sculpture' | 'handicraft' | 'photography' | 'digital';

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  type: ArtworkType;
  description: string;
  image: string;
  startingBid: number;
  currentBid: number;
  bids: Bid[];
  chat: ChatMessage[];
  auctionEnds: Date;
  featured: boolean;
  collection?: string;
}

// Sample artwork data with real image URLs
export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Harmony",
    artist: "Elena Riviera",
    type: "painting",
    description:
      "A captivating abstract oil painting that explores the interplay between light and shadow. The dynamic brushstrokes and subtle color transitions create a mesmerizing visual experience that draws the viewer into its ethereal world. Created using a unique technique that layers translucent colors to achieve extraordinary depth.",
    image:
      "https://thumbs.dreamstime.com/b/graceful-dance-peacock-woman-s-ethereal-harmony-artistic-rendering-captures-vibrant-elegant-amidst-335648241.jpg",
    startingBid: 1200,
    currentBid: 1850,
    bids: [
      {
        id: "b1",
        userId: "u1",
        userName: "ArtCollector78",
        amount: 1200,
        timestamp: new Date("2023-05-15T10:30:00"),
      },
      {
        id: "b2",
        userId: "u2",
        userName: "GalleryOwner",
        amount: 1500,
        timestamp: new Date("2023-05-15T14:45:00"),
      },
      {
        id: "b3",
        userId: "u3",
        userName: "ModernArtLover",
        amount: 1850,
        timestamp: new Date("2023-05-16T09:15:00"),
      },
    ],
    chat: [
      {
        id: "c1",
        userId: "u1",
        userName: "ArtCollector78",
        message: "The use of color in this piece is extraordinary",
        timestamp: new Date("2023-05-15T10:32:00"),
      },
      {
        id: "c2",
        userId: "u4",
        userName: "ArtHistorian",
        message:
          "Riviera's influence from the post-impressionist movement is evident here",
        timestamp: new Date("2023-05-15T11:03:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    featured: true,
    collection: "Ethereal Movements",
  },
  {
    id: "2",
    title: "Solitude in Bronze",
    artist: "Marcus Chen",
    type: "sculpture",
    description:
      "A contemplative bronze sculpture that captures the essence of solitude and introspection. The figure, positioned in a meditative pose, invites viewers to reflect on their own moments of quiet contemplation. The patina finish gives the piece a timeless quality, bridging ancient sculptural traditions with contemporary sensibilities.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/The_Solitude_of_the_Soul_LACMA_AC1994.133.1_%282_of_3%29.jpg",
    startingBid: 3500,
    currentBid: 4200,
    bids: [
      {
        id: "b4",
        userId: "u5",
        userName: "SculptureEnthusiast",
        amount: 3500,
        timestamp: new Date("2023-05-14T16:20:00"),
      },
      {
        id: "b5",
        userId: "u6",
        userName: "PrivateCollector",
        amount: 3800,
        timestamp: new Date("2023-05-15T11:45:00"),
      },
      {
        id: "b6",
        userId: "u2",
        userName: "GalleryOwner",
        amount: 4200,
        timestamp: new Date("2023-05-16T15:30:00"),
      },
    ],
    chat: [
      {
        id: "c3",
        userId: "u5",
        userName: "SculptureEnthusiast",
        message: "The patina work is exquisite",
        timestamp: new Date("2023-05-14T16:25:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    featured: true,
    collection: "Solitude Series",
  },
  {
    id: "3",
    title: "Woven Memories",
    artist: "Amara Okafor",
    type: "handicraft",
    description:
      "An intricate handwoven tapestry that tells a story of cultural heritage and personal history. Each thread and color has been carefully selected to represent different aspects of the artist's lineage, creating a visual narrative that spans generations. The piece combines traditional weaving techniques with contemporary design elements.",
    image:
      "https://revolutionfibers.com/cdn/shop/articles/Wall_Hanging_4.jpg?v=1677259929",
    startingBid: 950,
    currentBid: 1100,
    bids: [
      {
        id: "b7",
        userId: "u7",
        userName: "TextileCollector",
        amount: 950,
        timestamp: new Date("2023-05-15T09:10:00"),
      },
      {
        id: "b8",
        userId: "u8",
        userName: "CraftEnthusiast",
        amount: 1100,
        timestamp: new Date("2023-05-16T13:40:00"),
      },
    ],
    chat: [
      {
        id: "c4",
        userId: "u7",
        userName: "TextileCollector",
        message: "The symbolism in this piece is fascinating",
        timestamp: new Date("2023-05-15T09:15:00"),
      },
      {
        id: "c5",
        userId: "u9",
        userName: "CulturalArtExpert",
        message:
          "Okafor's blend of traditional and modern techniques is masterful",
        timestamp: new Date("2023-05-15T14:20:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    featured: false,
    collection: "Woven Memories",
  },
  {
    id: "4",
    title: "Whispers of Light",
    artist: "Sophia James",
    type: "photography",
    description:
      "A stunning large-format photograph capturing an ephemeral moment of light filtering through ancient forest canopy. The photographer spent weeks studying the exact location to capture this perfect interplay of light, shadow, and natural elements. Printed on museum-quality archival paper using a proprietary process that enhances depth and luminosity.",
    image:
      "https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    startingBid: 800,
    currentBid: 1250,
    bids: [
      {
        id: "b9",
        userId: "u10",
        userName: "PhotographyLover",
        amount: 800,
        timestamp: new Date("2023-05-14T11:25:00"),
      },
      {
        id: "b10",
        userId: "u11",
        userName: "NaturalistCollector",
        amount: 950,
        timestamp: new Date("2023-05-15T16:55:00"),
      },
      {
        id: "b11",
        userId: "u12",
        userName: "GalleryDirector",
        amount: 1250,
        timestamp: new Date("2023-05-16T10:15:00"),
      },
    ],
    chat: [
      {
        id: "c6",
        userId: "u10",
        userName: "PhotographyLover",
        message: "The detail in the highlights is remarkable",
        timestamp: new Date("2023-05-14T11:30:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    featured: false,
    collection: "Whispers of Light",
  },
  {
    id: "5",
    title: "Digital Reverie",
    artist: "Akira Tanaka",
    type: "digital",
    description:
      "An innovative digital artwork created at the intersection of art and technology. This piece uses generative algorithms influenced by natural patterns to create a constantly evolving visual experience. Each viewing reveals new details and relationships between elements. The work comes with authenticated NFT provenance and a high-resolution display.",
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    startingBid: 2200,
    currentBid: 3500,
    bids: [
      {
        id: "b12",
        userId: "u13",
        userName: "TechArtCollector",
        amount: 2200,
        timestamp: new Date("2023-05-13T15:40:00"),
      },
      {
        id: "b13",
        userId: "u14",
        userName: "DigitalArtEnthusiast",
        amount: 2800,
        timestamp: new Date("2023-05-14T19:20:00"),
      },
      {
        id: "b14",
        userId: "u15",
        userName: "NFTCollector",
        amount: 3500,
        timestamp: new Date("2023-05-16T12:50:00"),
      },
    ],
    chat: [
      {
        id: "c7",
        userId: "u13",
        userName: "TechArtCollector",
        message: "The generative elements are mesmerizing",
        timestamp: new Date("2023-05-13T15:45:00"),
      },
      {
        id: "c8",
        userId: "u16",
        userName: "GalleryTech",
        message: "The display specs for this piece are cutting edge",
        timestamp: new Date("2023-05-14T09:30:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    featured: true,
    collection: "Digital Reverie",
  },
  {
    id: "6",
    title: "Ceramic Reflections",
    artist: "Mei Lin",
    type: "handicraft",
    description:
      "A masterful ceramic vessel that pushes the boundaries of the medium. The artist has developed a unique glazing technique that creates iridescent surfaces that shift in appearance as the viewer moves around the piece. Inspired by traditional Eastern ceramics but executed with a contemporary sensibility.",
    image:
      "https://potteryandpoetry.eu/wp-content/uploads/2024/05/whiskey-cups-Sea-reflections-7-scaled.jpg",
    startingBid: 1800,
    currentBid: 2400,
    bids: [
      {
        id: "b15",
        userId: "u17",
        userName: "CeramicsCollector",
        amount: 1800,
        timestamp: new Date("2023-05-14T14:15:00"),
      },
      {
        id: "b16",
        userId: "u18",
        userName: "AsianArtSpecialist",
        amount: 2100,
        timestamp: new Date("2023-05-15T17:30:00"),
      },
      {
        id: "b17",
        userId: "u6",
        userName: "PrivateCollector",
        amount: 2400,
        timestamp: new Date("2023-05-16T11:20:00"),
      },
    ],
    chat: [
      {
        id: "c9",
        userId: "u17",
        userName: "CeramicsCollector",
        message: "The iridescent effect is unlike anything I've seen before",
        timestamp: new Date("2023-05-14T14:20:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    featured: false,
    collection: "Ceramic Reflections",
  },
  {
    id: "7",
    title: "Urban Fragments III",
    artist: "Elena Riviera",
    type: "painting",
    description:
      "Part of Riviera's Urban Fragments series, this mixed media painting incorporates elements of city life into an abstract composition. Subtle collage elements from maps and architectural drawings create layers of meaning beneath the vibrant painted surface.",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    startingBid: 1400,
    currentBid: 1700,
    bids: [
      {
        id: "b18",
        userId: "u19",
        userName: "UrbanArtFan",
        amount: 1400,
        timestamp: new Date("2023-05-15T13:20:00"),
      },
      {
        id: "b19",
        userId: "u20",
        userName: "AbstractCollector",
        amount: 1700,
        timestamp: new Date("2023-05-16T16:45:00"),
      },
    ],
    chat: [
      {
        id: "c10",
        userId: "u19",
        userName: "UrbanArtFan",
        message: "The layering technique creates such visual depth",
        timestamp: new Date("2023-05-15T13:25:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
    featured: false,
    collection: "Urban Fragments",
  },
  {
    id: "8",
    title: "Coastal Dialogue #2",
    artist: "Sophia James",
    type: "photography",
    description:
      "A striking image from James's Coastal Dialogues series, capturing the dynamic interaction between sea and land. Long exposure techniques create a sense of time passing while maintaining crystal clarity in key elements of the composition.",
    image: "https://www.rwongphoto.com/images/640/RW3285-2.jpg",
    startingBid: 900,
    currentBid: 1050,
    bids: [
      {
        id: "b20",
        userId: "u21",
        userName: "NaturePhotographyFan",
        amount: 900,
        timestamp: new Date("2023-05-14T10:10:00"),
      },
      {
        id: "b21",
        userId: "u22",
        userName: "OceanicArtLover",
        amount: 1050,
        timestamp: new Date("2023-05-15T15:35:00"),
      },
    ],
    chat: [
      {
        id: "c11",
        userId: "u21",
        userName: "NaturePhotographyFan",
        message: "The tonal range in this print is exceptional",
        timestamp: new Date("2023-05-14T10:15:00"),
      },
    ],
    auctionEnds: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000), // 11 days from now
    featured: false,
    collection: "Coastal Dialogues",
  },
];

// Helper function to get an artwork by ID
export const getArtworkById = (id: string): Artwork | undefined => {
  return artworks.find(artwork => artwork.id === id);
};

// Helper function to get artworks by artist name
export const getArtworksByArtist = (artistName: string): Artwork[] => {
  return artworks.filter(artwork => artwork.artist === artistName);
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper function to format time remaining
export const formatTimeRemaining = (endDate: Date): string => {
  const now = new Date();
  const timeRemaining = endDate.getTime() - now.getTime();
  
  if (timeRemaining <= 0) {
    return "Auction ended";
  }
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else {
    return `${minutes}m remaining`;
  }
};
