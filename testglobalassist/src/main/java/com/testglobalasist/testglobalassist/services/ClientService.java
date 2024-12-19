package com.testglobalasist.testglobalassist.services;

import java.util.Set;

import com.testglobalasist.testglobalassist.dtos.RequestClientDto;
import com.testglobalasist.testglobalassist.dtos.ResponseClientDto;

public interface ClientService {

    Set<ResponseClientDto> getClients ();

    ResponseClientDto getClient(Long id);

    ResponseClientDto createClient(RequestClientDto requestClientDto);

    ResponseClientDto updateClient(RequestClientDto requestClientDto, Long id);

    ResponseClientDto deleteClient(Long id);
    
} 