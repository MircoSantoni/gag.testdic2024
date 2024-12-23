package com.testglobalasist.testglobalassist.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ClientNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleClienNotFoundException(ClientNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("Error:", "Conflicto en el cliente");
        response.put("Message:", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(EmailAlreadyInUseException.class)
    public ResponseEntity<Map<String, String>> handleEmailAlreadyInUseException(EmailAlreadyInUseException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("Error:", "Conflictos en el email");
        response.put("Message:", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
    
    @ExceptionHandler(EmptyResourceException.class)
    public ResponseEntity<Map<String, String>> handleEmptyResourceException(EmptyResourceException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("Error:", "Recurso vacio");
        response.put("Message:", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

}