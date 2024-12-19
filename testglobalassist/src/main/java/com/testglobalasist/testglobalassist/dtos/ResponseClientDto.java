package com.testglobalasist.testglobalassist.dtos;

import com.testglobalasist.testglobalassist.enumms.Gender;

public record ResponseClientDto(
    Long id,
    String firstName,
    String lastName,
    Gender gender,
    String ipAdress,
    String email,
    String country
) { }
