package com.example.recipe_backend;

import java.util.*;

public class Recipe {
    private String id;
    private String title;
    private List<String> ingredients;
    private Instructions instructions;

    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
    public String getTitle() { return title;}
    public void setTitle(String title) {this.title = title;}
    public List<String> getIngredients() {return ingredients;}
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
    public Instructions getInstructions() { return instructions; }
    public void setInstructions(Instructions instructions) { this.instructions = instructions; }

    public Recipe(String id, String title, List<String> ingredients, Instructions instructions) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

}
