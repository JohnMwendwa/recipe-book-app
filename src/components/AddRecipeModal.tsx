import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Recipe } from "../types/Recipe";

interface AddRecipeModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (recipe: Omit<Recipe, "id" | "isFavorite">) => void;
}

export default function AddRecipeModal({
  open,
  onClose,
  onAdd,
}: AddRecipeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      description: formData.description,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      instructions: formData.instructions,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352",
    });
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      instructions: "",
      image: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Recipe</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Recipe Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              required
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <TextField
              label="Ingredients (comma-separated)"
              fullWidth
              required
              multiline
              rows={3}
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              helperText="Enter ingredients separated by commas"
            />
            <TextField
              label="Instructions"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
            />
            <TextField
              label="Image URL (optional)"
              fullWidth
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              helperText="Leave empty for default image"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add Recipe
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
