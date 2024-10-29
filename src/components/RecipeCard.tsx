import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Favorite } from "@mui/icons-material";

import { Recipe } from "../types/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onToggleFavorite: (id: string) => void;
}

export default function RecipeCard({
  recipe,
  onSelect,
  onToggleFavorite,
}: RecipeCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          backgroundColor: "rgba(0, 0, 255, 0.05)",
        },
      }}
      onClick={() => onSelect(recipe)}
    >
      <CardMedia
        component="img"
        height="180"
        image={recipe.image}
        alt={recipe.name}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {recipe.name}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id);
            }}
            color={recipe.isFavorite ? "warning" : "default"}
          >
            {recipe.isFavorite ? <Favorite /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          {recipe.description}
        </Typography>
        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
          {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <Chip key={index} label={ingredient} />
          ))}
          {recipe.ingredients.length > 3 && (
            <Chip label={`+${recipe.ingredients.length - 3} more`} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
