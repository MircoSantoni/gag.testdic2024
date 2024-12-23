package com.testglobalasist.testglobalassist.enumms;

public enum Gender {
    MALE("Male"),
    FEMALE("Female"),
    AGENDER("Agender"),
    BIGENDER("Bigender"),
    NON_BINARY("Non-binary"),
    GENDER_FLUID("Genderfluid"),
    POLYGENDER("Polygender"),
    GENDERQUEER("Genderqueer");

    private final String displayValue;

    Gender(String displayValue) {
        this.displayValue = displayValue;
    }

    public String getDisplayValue() {
        return displayValue;
    }

    public static Gender fromString(String text) {
        if (text == null) {
            return null;
        }
        
        try {
            return Gender.valueOf(text.toUpperCase());
        } catch (IllegalArgumentException ignored) {
            for (Gender gender : Gender.values()) {
                if (gender.displayValue.equalsIgnoreCase(text)) {
                    return gender;
                }
            }
            throw new IllegalArgumentException("No constant with display value " + text + " found in Gender enum");
        }
    }

    @Override
    public String toString() {
        return displayValue;
    }
}