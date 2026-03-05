package com.example.recipe_backend;

import java.util.List;

public class Instructions {
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

    public int getTotalTime(){
        int totalMinutes = 0;
        for(Step s: steps){
            totalMinutes += s.getMinutes();
        }
        return totalMinutes;
    }


}
