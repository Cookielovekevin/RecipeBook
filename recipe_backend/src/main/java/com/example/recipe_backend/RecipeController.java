package com.example.recipe_backend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


    @GetMapping("/test")
    public Recipe test() throws Exception{
        Step s1 = new Step("Boil water", 10);
        Step s2 = new Step("Add pasta", 8);
        Instructions test = new Instructions(Arrays.asList(s1, s2));
        Recipe testRecipe = new Recipe("Pasta", Arrays.asList("Water", "Pasta"), test);
        return recipeRepository.save(testRecipe);
    }

}
