package com.example.recipe_backend;

import java.util.List;

public class Instructions {
    private List<Step> instructions;

    public Instructions(){}

    public Instructions(List<Step> instructions) {
        this.instructions = instructions;
    }

    public List<Step> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<Step> instructions) {
        this.instructions = instructions;
    }

    public int getTotalTime(){
        int totalMinutes = 0;
        for(Step s: instructions){
            totalMinutes += s.getMinutes();
        }
        return totalMinutes;
    }


}
