package com.testglobalasist.testglobalassist.dtos;

import com.testglobalasist.testglobalassist.enumms.Gender;

public record RequestClientDto(
    String firstName,
    String lastName,
    Gender gender,
    String ipAdress,
    String email,
    String country
) { }
