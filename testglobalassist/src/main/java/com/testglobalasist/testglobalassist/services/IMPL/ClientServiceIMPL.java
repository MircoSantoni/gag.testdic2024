package com.testglobalasist.testglobalassist.services.IMPL;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.testglobalasist.testglobalassist.dtos.RequestClientDto;
import com.testglobalasist.testglobalassist.dtos.ResponseClientDto;
import com.testglobalasist.testglobalassist.entities.Client;
import com.testglobalasist.testglobalassist.exceptions.ClientNotFoundException;
import com.testglobalasist.testglobalassist.exceptions.EmailAlreadyInUseException;
import com.testglobalasist.testglobalassist.exceptions.EmptyResourceException;
import com.testglobalasist.testglobalassist.mappers.ClientMapper;
import com.testglobalasist.testglobalassist.repositories.ClientRepository;
import com.testglobalasist.testglobalassist.services.ClientService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientServiceIMPL implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

@Override
@Transactional(readOnly = true)
public Set<ResponseClientDto> getClients() {
    List<Client> clientList = clientRepository.findAll();
    Set<Client> clientSet = clientList.stream()
            .sorted(Comparator.comparing(Client::getId))
            .collect(Collectors.toCollection(LinkedHashSet::new));

    if (clientSet.isEmpty()) {
        throw new EmptyResourceException("La lista de clientes esta vacia");
    }

    return clientMapper.setClientToResponseClientDtoSet(clientSet);
}

    @Override
    public ResponseClientDto getClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Cliente con id" + id + " no encontrado"));

        return clientMapper.clientToResponseClientDto(client);
    }

    @Override
    public ResponseClientDto createClient(RequestClientDto requestClientDto) {
        Client client = clientRepository.findByEmail(requestClientDto.email())
                .orElseThrow(() -> new EmailAlreadyInUseException("Ya existe un cliente con el mail" + requestClientDto.email()));

        Client newClient = new Client();
        newClient.setFirstName(requestClientDto.firstName());
        newClient.setLastName(requestClientDto.lastName());
        newClient.setGender(requestClientDto.gender());
        newClient.setIpAddress(requestClientDto.ipAdress());
        newClient.setEmail(requestClientDto.email());
        newClient.setCountry(requestClientDto.country());

        Client savedClient = clientRepository.save(newClient);
        return clientMapper.clientToResponseClientDto(savedClient);
    }
    
    @Override
    public ResponseClientDto updateClient(RequestClientDto requestClientDto, Long id) {
        Client client = clientRepository.findByEmail(requestClientDto.email())
                .orElseThrow(() -> new EmailAlreadyInUseException("Ya existe un cliente con el mail" + requestClientDto.email()));

        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Cliente con id" + id + " no encontrado"));

        existingClient.setFirstName(requestClientDto.firstName());
        existingClient.setLastName(requestClientDto.lastName());
        existingClient.setGender(requestClientDto.gender());
        existingClient.setIpAddress(requestClientDto.ipAdress());
        existingClient.setEmail(requestClientDto.email());
        existingClient.setCountry(requestClientDto.country());

        Client savedClient = clientRepository.save(existingClient);
        return clientMapper.clientToResponseClientDto(savedClient);
    }

    @Override
    public ResponseClientDto deleteClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Cliente con id" + id + " no encontrado"));

        clientRepository.delete(client);
        return clientMapper.clientToResponseClientDto(client);
    }

}
