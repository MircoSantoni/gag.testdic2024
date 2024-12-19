package com.testglobalasist.testglobalassist.enumms;

public enum Gender {
    MALE("Male"),
    FEMALE("Female"),
    NON_BINARY("No Binary"),
    OTHER("Other");

    private final String gender;

    Gender(String gender){
        this.gender = gender;
    }

    public String getGender(){
        return gender;
    }
}

