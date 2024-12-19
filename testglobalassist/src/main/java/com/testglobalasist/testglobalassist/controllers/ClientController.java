package com.testglobalasist.testglobalassist.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testglobalasist.testglobalassist.dtos.RequestClientDto;
import com.testglobalasist.testglobalassist.dtos.ResponseClientDto;
import com.testglobalasist.testglobalassist.services.ClientService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class ClientController {

    private final ClientService clientService;

    @GetMapping("/")
    public ResponseEntity<Set<ResponseClientDto>> getClients() {
        return ResponseEntity.ok(clientService.getClients());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseClientDto> getClient(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClient(id));
    }
    
    @PostMapping("/")
    public ResponseEntity<ResponseClientDto> createClient(@RequestBody RequestClientDto requestClientDto) {
        ResponseClientDto responseClientDto = clientService.createClient(requestClientDto);  
        return ResponseEntity.status(HttpStatus.CREATED).body(responseClientDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseClientDto> updateClient(@PathVariable Long id, @RequestBody RequestClientDto requestClientDto) {
        ResponseClientDto responseClientDto = clientService.updateClient(requestClientDto, id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseClientDto);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseClientDto> deleteClient(@PathVariable Long id) {
        ResponseClientDto responseClientDto = clientService.deleteClient(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseClientDto);
    }

}
