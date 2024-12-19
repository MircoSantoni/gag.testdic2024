package com.testglobalasist.testglobalassist.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EmailAlreadyInUseException extends RuntimeException {
    private String message;

}
