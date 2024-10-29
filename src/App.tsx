import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Fab,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Recipe } from "./types/Recipe";
import RecipeCard from "./components/RecipeCard";
import AddRecipeModal from "./components/AddRecipeModal";
import RecipeDetails from "./components/RecipeDetails";
import { Add, Favorite } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
    },
    warning: {
      main: "#f44336",
    },
  },
});

const initialRecipes: Recipe[] = [
  {
    id: "1",
    name: "Githeri",
    description:
      "A swahili dish made from maize and beans cooked together in water.",
    ingredients: [
      "Maize",
      "Beans",
      "Water",
      "Salt",
      "Onions",
      "Tomatoes",
      "Cooking oil",
    ],
    instructions:
      "Boil maize and beans in water until soft. Fry onions and tomatoes in oil, add to the boiled maize and beans, and cook for 10 minutes.",
    image: "/githeri.jpg",
    isFavorite: false,
  },
  {
    id: "2",
    name: "Pilau",
    description: "A flavorful rice dish cooked with spices and meat.",
    ingredients: [
      "Rice",
      "Beef",
      "Pilau masala",
      "Onions",
      "Tomatoes",
      "Garlic",
      "Ginger",
    ],
    instructions:
      "Fry onions, garlic, and ginger. Add beef and cook until browned. Add tomatoes and pilau masala, then cook for 10 minutes. Add rice and water, then cook until done.",
    image: "/pilau.jpg",
    isFavorite: true,
  },
  {
    id: "3",
    name: "Ugali Samaki",
    description: "A Kenyan dish of ugali served with fish in tomato sauce.",
    ingredients: [
      "Maize flour",
      "Water",
      "Fish",
      "Tomatoes",
      "Onions",
      "Cooking oil",
    ],
    instructions:
      "Boil water, add maize flour, and cook until thick. Fry fish, onions, and tomatoes in oil, then add water and cook for 10 minutes.",
    image: "/ugali.webp",
    isFavorite: true,
  },
];

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddRecipe = (newRecipe: Omit<Recipe, "id" | "isFavorite">) => {
    setRecipes([
      ...recipes,
      {
        ...newRecipe,
        id: Date.now().toString(),
        isFavorite: false,
      },
    ]);
  };

  const handleToggleFavorite = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  const handleRemoveRecipe = (recipe: Recipe) => {
    setRecipes(recipes.filter((r) => r.id !== recipe.id));
  };

  const filteredRecipes = recipes
    .filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .filter(
      (recipe) =>
        filter === "all" || (filter === "favorites" && recipe.isFavorite)
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container>
          <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom>
              Recipe Book
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: 1 }}
              />

              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(_, value) => value && setFilter(value)}
                aria-label="recipe filter"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="favorites">
                  {filter === "favorites" ? (
                    <Favorite color="warning" sx={{ marginRight: "2px" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon sx={{ marginRight: "2px" }} />
                  )}
                  Favorites
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  onSelect={setSelectedRecipe}
                  onToggleFavorite={handleToggleFavorite}
                />
              </Grid>
            ))}
          </Grid>

          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 24, right: 24 }}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Add />
          </Fab>
        </Container>

        <AddRecipeModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddRecipe}
        />

        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onRemove={handleRemoveRecipe}
        />
      </Box>
    </ThemeProvider>
  );
}
