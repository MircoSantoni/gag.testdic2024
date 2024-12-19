package com.testglobalasist.testglobalassist.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class EmptyResourceException extends RuntimeException{
    private String message;

}
