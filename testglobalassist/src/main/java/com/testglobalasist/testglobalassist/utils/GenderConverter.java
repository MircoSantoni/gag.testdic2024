package com.testglobalasist.testglobalassist.utils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.testglobalasist.testglobalassist.enumms.Gender;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {

    @Override
    public String convertToDatabaseColumn(Gender gender) {
        return gender != null ? gender.getDisplayValue() : null;
    }

    @Override
    public Gender convertToEntityAttribute(String dbData) {
        return dbData != null ? Gender.fromString(dbData) : null;
    }
}