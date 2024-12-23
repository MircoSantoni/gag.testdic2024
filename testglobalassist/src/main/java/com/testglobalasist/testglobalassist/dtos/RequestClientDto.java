package com.testglobalasist.testglobalassist.dtos;

import com.testglobalasist.testglobalassist.enumms.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record RequestClientDto(
    @NotNull(message = "El nombre es requerido para crear un cliente")
    @Pattern(regexp = "^[A-Za-zÀ-ÿ\\s'-]{1,50}$", message = "El nombre solo puede contener letras, espacios, guiones y apóstrofes, y debe tener entre 1 y 50 caracteres")
    String firstName,
    
    @NotNull(message = "El apellido es requerido para crear un cliente")
    @Pattern(regexp = "^[A-Za-zÀ-ÿ\\s'-]{1,50}$", message = "El apellido solo puede contener letras, espacios, guiones y apóstrofes, y debe tener entre 1 y 50 caracteres")
    String lastName,
    
    @NotNull(message = "El genero es requerido para crear un cliente, el mismo debe ser Male, Female, No Binary o Other")
    Gender gender,
    
    @NotNull(message = "La direccion IP es requerida para crear un cliente")
    @Pattern(regexp = "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$", message = "La direccion IP debe tener un formato válido (e.g., 192.168.0.1)")
    String ipAddress,
    
    @NotNull(message = "El email es requerido para crear un cliente")
    @Email(message = "El email debe ser válido")
    String email,
    
    @NotNull(message = "El nombre del pais es requerido para crear un cliente")
    @Pattern(regexp = "^[A-Za-zÀ-ÿ\\s'-]", message = "El nombre del pais solo puede contener letras, espacios, guiones y apóstrofes")
    String country
) { }
