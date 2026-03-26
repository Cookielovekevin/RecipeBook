package com.example.recipe_backend;
import jakarta.persistence.*;
import java.util.*;

@Entity //makes it a DB
public class Recipe {
    @Id // tag for making this var the ID
    @GeneratedValue(strategy =  GenerationType.IDENTITY) // auto incr. id
    private Long id;

    private String title;
    

    @ElementCollection
    private List<String> ingredients;

    @OneToOne(cascade = CascadeType.ALL) //link tables one to one, bc one set of instructions to one recipe
    private Instructions instructions;

    public Recipe(){};
    public String getTitle() { return title;}
    public void setTitle(String title) {this.title = title;}
    public List<String> getIngredients() {return ingredients;}
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
    public Instructions getInstructions() { return instructions; }
    public void setInstructions(Instructions instructions) { this.instructions = instructions; }
    public Long getId(){return id;}
    public Recipe(String title, List<String> ingredients, Instructions instructions) {
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

}
