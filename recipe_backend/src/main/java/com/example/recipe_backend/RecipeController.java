package com.example.recipe_backend;
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
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {
    private final String FILE_PATH = "recipes.json";
    private final ObjectMapper MAPPER = new ObjectMapper(); 
    
    @GetMapping
    public List<Recipe> getRecipes() throws Exception{
        File file = new File(FILE_PATH);
        if (!file.exists()) return new ArrayList<>();
        
        // Read the JSON file and turn it back into a Java List
        return MAPPER.readValue(file, new TypeReference<List<Recipe>>(){});
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe newRecipe) throws Exception {
        List<Recipe> recipes  = getRecipes();
        recipes.add(newRecipe);

        //save updated recipe list to json
        MAPPER.writeValue(new File(FILE_PATH), recipes);
        return newRecipe;
    }
}
