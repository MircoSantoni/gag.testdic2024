package com.testglobalasist.testglobalassist.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.testglobalasist.testglobalassist.entities.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{

    Optional<Client> findByEmail(String email);
}
