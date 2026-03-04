package com.example.recipe_backend;

import java.util.*;

public class Recipe {
    private String id;
    private String title;
    private List<String> ingredients;
    private String instructions;

    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
    public String getTitle() { return title;}
    public void setTitle(String title) {this.title = title;}
    public List<String> getIngredients() {return ingredients;}
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public Recipe(String id, String title, List<String> ingredients, String instructions) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

}
