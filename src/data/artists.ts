
import { ArtworkType } from './artworks';

export interface Collection {
  name: string;
  description: string;
  year: string;
}

export interface Artist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  profileImage: string;
  website?: string;
  artworksCount: number;
  collections: Collection[];
}

// Sample artist data
export const artists: Artist[] = [
  {
    id: '1',
    name: 'Elena Riviera',
    specialty: 'Abstract Oil Painting',
    bio: 'Elena Riviera is known for her dynamic abstract compositions that explore the interplay between light, color, and emotion. With a background in classical painting, Riviera brings technical precision to her expressive works, creating pieces that resonate on both intellectual and emotional levels. Her influences range from the Abstract Expressionists to contemporary digital imagery.',
    profileImage: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    website: 'https://elenariviera.com',
    artworksCount: 15,
    collections: [
      {
        name: 'Ethereal Movements',
        description: 'A series exploring the fluid dynamics of color and form, inspired by natural phenomena.',
        year: '2022'
      },
      {
        name: 'Urban Fragments',
        description: 'Works reflecting the fragmented experience of modern urban life through abstracted cityscapes.',
        year: '2021'
      }
    ]
  },
  {
    id: '2',
    name: 'Marcus Chen',
    specialty: 'Bronze Sculpture',
    bio: 'Marcus Chen works primarily in bronze, creating sculptural pieces that blend classical techniques with contemporary themes. His work often explores the relationship between the human form and its environment, addressing issues of identity, belonging, and change. Each piece undergoes an intensive process, from initial sketches to final patination, reflecting Chen\'s commitment to craftsmanship.',
    profileImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    artworksCount: 8,
    collections: [
      {
        name: 'Solitude Series',
        description: 'Contemplative bronze figures exploring themes of introspection and inner peace.',
        year: '2023'
      },
      {
        name: 'Urban Dialogues',
        description: 'Sculptural works examining the tensions and connections in contemporary urban society.',
        year: '2021'
      }
    ]
  },
  {
    id: '3',
    name: 'Amara Okafor',
    specialty: 'Textile Art & Mixed Media',
    bio: 'Amara Okafor combines traditional textile techniques with contemporary art practices to create works that speak to cultural heritage, memory, and identity. Drawing from her multicultural background, Okafor weaves narratives that span generations and geographies, inviting viewers to consider the interconnectedness of human experience. Her pieces often incorporate found materials and personal artifacts.',
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    website: 'https://amaraokafor.art',
    artworksCount: 12,
    collections: [
      {
        name: 'Woven Memories',
        description: 'Intricate tapestries that tell stories of cultural heritage and personal history.',
        year: '2023'
      },
      {
        name: 'Material Dialogues',
        description: 'Mixed media works exploring the conversation between traditional crafts and contemporary art.',
        year: '2022'
      }
    ]
  },
  {
    id: '4',
    name: 'Sophia James',
    specialty: 'Fine Art Photography',
    bio: 'Sophia James captures ephemeral moments of light and atmosphere in her large-format photography. With a background in environmental science, James brings a deep appreciation for natural systems to her artistic practice, creating images that reveal the subtle beauty of landscapes in transition. Her meticulous approach includes extensive location research and precise timing to capture ideal conditions.',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    artworksCount: 20,
    collections: [
      {
        name: 'Whispers of Light',
        description: 'Ethereal photographs capturing the interplay of light through ancient forests.',
        year: '2023'
      },
      {
        name: 'Coastal Dialogues',
        description: 'A photographic exploration of tidal zones and coastal ecosystems.',
        year: '2022'
      }
    ]
  },
  {
    id: '5',
    name: 'Akira Tanaka',
    specialty: 'Digital & Generative Art',
    bio: 'Akira Tanaka works at the intersection of art and technology, creating digital compositions that bridge human creativity and algorithmic processes. With training in both fine arts and computer science, Tanaka develops custom software tools that respond to environmental data, creating works that evolve and change over time. His pieces often explore themes of emergence, complexity, and the relationship between natural and artificial systems.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    website: 'https://akiratanaka.digital',
    artworksCount: 25,
    collections: [
      {
        name: 'Digital Reverie',
        description: 'Generative artworks created through algorithms influenced by natural patterns.',
        year: '2023'
      },
      {
        name: 'Data Landscapes',
        description: 'Visual representations of complex data sets transformed into abstract digital compositions.',
        year: '2022'
      }
    ]
  },
  {
    id: '6',
    name: 'Mei Lin',
    specialty: 'Ceramic Art',
    bio: 'Mei Lin creates ceramic vessels and sculptural objects that push the boundaries of the medium through innovative glazing techniques and forms. Inspired by both Eastern ceramic traditions and contemporary design, Lin\'s work bridges cultural and historical divides. Her studio practice involves extensive material research and experimentation, resulting in pieces with distinctive surface qualities that respond to light and movement.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    artworksCount: 18,
    collections: [
      {
        name: 'Ceramic Reflections',
        description: 'Vessels with unique glazing techniques creating iridescent, reflective surfaces.',
        year: '2023'
      },
      {
        name: 'Form & Function',
        description: 'Functional ceramic pieces that blur the line between utility and artistic expression.',
        year: '2021'
      }
    ]
  }
];

// Helper function to get an artist by ID
export const getArtistById = (id: string): Artist | undefined => {
  return artists.find(artist => artist.id === id);
};
