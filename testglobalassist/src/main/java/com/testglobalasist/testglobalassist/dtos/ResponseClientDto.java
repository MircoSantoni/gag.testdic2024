package com.testglobalasist.testglobalassist.dtos;

import com.testglobalasist.testglobalassist.enumms.Gender;

public record ResponseClientDto(
    Long id,
    String firstName,
    String lastName,
    String email,
    Gender gender,
    String ipAddress,
    String country
) { }
