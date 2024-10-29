export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
  image: string;
}
