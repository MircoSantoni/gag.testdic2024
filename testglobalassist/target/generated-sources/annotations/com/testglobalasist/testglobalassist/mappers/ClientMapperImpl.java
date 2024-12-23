package com.testglobalasist.testglobalassist.mappers;

import com.testglobalasist.testglobalassist.dtos.RequestClientDto;
import com.testglobalasist.testglobalassist.dtos.ResponseClientDto;
import com.testglobalasist.testglobalassist.entities.Client;
import com.testglobalasist.testglobalassist.enumms.Gender;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-23T15:09:24-0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.41.0.v20241217-1506, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class ClientMapperImpl implements ClientMapper {

    @Override
    public Set<ResponseClientDto> setClientToResponseClientDtoSet(Set<Client> clients) {
        if ( clients == null ) {
            return null;
        }

        Set<ResponseClientDto> set = new LinkedHashSet<ResponseClientDto>( Math.max( (int) ( clients.size() / .75f ) + 1, 16 ) );
        for ( Client client : clients ) {
            set.add( clientToResponseClientDto( client ) );
        }

        return set;
    }

    @Override
    public ResponseClientDto clientToResponseClientDto(Client client) {
        if ( client == null ) {
            return null;
        }

        Long id = null;
        String firstName = null;
        String lastName = null;
        String email = null;
        Gender gender = null;
        String ipAddress = null;
        String country = null;

        id = client.getId();
        firstName = client.getFirstName();
        lastName = client.getLastName();
        email = client.getEmail();
        gender = client.getGender();
        ipAddress = client.getIpAddress();
        country = client.getCountry();

        ResponseClientDto responseClientDto = new ResponseClientDto( id, firstName, lastName, email, gender, ipAddress, country );

        return responseClientDto;
    }

    @Override
    public Client requestClientDtoToClient(RequestClientDto requestClientDto) {
        if ( requestClientDto == null ) {
            return null;
        }

        Client client = new Client();

        client.setCountry( requestClientDto.country() );
        client.setEmail( requestClientDto.email() );
        client.setFirstName( requestClientDto.firstName() );
        client.setGender( requestClientDto.gender() );
        client.setIpAddress( requestClientDto.ipAddress() );
        client.setLastName( requestClientDto.lastName() );

        return client;
    }
}
