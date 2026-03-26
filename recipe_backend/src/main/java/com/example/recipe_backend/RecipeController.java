package com.example.recipe_backend;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.bytebuddy.utility.visitor.ExceptionTableSensitiveMethodVisitor;

import java.util.*;
import java.io.*;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {
    
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<Recipe> getRecipes(){
        return recipeRepository.findAll();
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe newRecipe){
        return recipeRepository.save(newRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id){
        if(recipeRepository.existsById(id)){
            recipeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Long id, @RequestBody Recipe updatedRecipe){
        return recipeRepository.findById(id)
            .map(recipe -> {
                recipe.setTitle(updatedRecipe.getTitle());
                recipe.setIngredients(updatedRecipe.getIngredients());
                recipe.setInstructions(updatedRecipe.getInstructions());
                Recipe saved = recipeRepository.save(recipe);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.notFound().build());
    } 

    @GetMapping("/test")
    public Recipe test() throws Exception{
        Step s1 = new Step("Boil water", 10);
        Step s2 = new Step("Add pasta", 8);
        Instructions test = new Instructions(Arrays.asList(s1, s2));
        Recipe testRecipe = new Recipe("Pasta", Arrays.asList("Water", "Pasta"), test);
        return recipeRepository.save(testRecipe);
    }


}
