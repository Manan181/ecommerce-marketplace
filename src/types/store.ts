export type Store = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
  };
  products: Product[];
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};
