export interface Shoe {
    id: string;
    name: string;
    description: string;
    price: number;
    category: { id: string; name: string };
    images: { url: string }[];
    sizes: { size: number }[];
    mainColor: string;
    secondaryColor: string;
    existing: boolean;
  }
  