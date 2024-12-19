package com.testglobalasist.testglobalassist.mappers;

import java.util.Set;

import org.mapstruct.Mapper;

import com.testglobalasist.testglobalassist.dtos.RequestClientDto;
import com.testglobalasist.testglobalassist.dtos.ResponseClientDto;
import com.testglobalasist.testglobalassist.entities.Client;

@Mapper(componentModel = "spring")
public interface ClientMapper {

        
        Set<ResponseClientDto> setClientToResponseClientDtoSet(Set<Client> clients);
        
        ResponseClientDto clientToResponseClientDto(Client client);

        Client requestClientDtoToClient(RequestClientDto requestClientDto);
    
}
