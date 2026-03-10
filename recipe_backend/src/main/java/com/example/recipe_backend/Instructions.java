package com.example.recipe_backend;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Instructions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL) //one to many bc multiple step DB in one instruction
    @JoinColumn(name = "instruction_id")
    private List<Step> steps;

    public Instructions(){}

    public Instructions(List<Step> instructions) {
        this.steps = instructions;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> instructions) {
        this.steps = instructions;
    }

    @JsonProperty("totalTime")
    public int getTotalTime(){
        int totalMinutes = 0;
        for(Step s: steps){
            totalMinutes += s.getMinutes();
        }
        return totalMinutes;
    }


}
