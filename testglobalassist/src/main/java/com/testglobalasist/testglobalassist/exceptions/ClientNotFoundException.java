package com.testglobalasist.testglobalassist.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ClientNotFoundException extends RuntimeException {
    private String message;

}
