import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import { Recipe } from "../types/Recipe";

interface RecipeDetailsProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeDetails({ recipe, onClose }: RecipeDetailsProps) {
  if (!recipe) return null;

  return (
    <Dialog open={!!recipe} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{recipe.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <img
            src={recipe.image}
            alt={recipe.name}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography color="text.secondary">{recipe.description}</Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Ingredients
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <Chip key={index} label={ingredient} variant="outlined" />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Typography color="text.secondary">{recipe.instructions}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
