package com.testglobalasist.testglobalassist.entities;

import com.testglobalasist.testglobalassist.enumms.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "clients")
@RequiredArgsConstructor
@Data
public class Client {

    // Aca si estuviera generando esto de 0, generaria un UUID y 
    // dejaria el id numerico para un numero de cliente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "first_name" , nullable = false)
    public String firstName;

    @Column(name = "last_name" , nullable = false)
    public String lastName;

    @Column( nullable = false)

    public String email;

    // El campo gender es un Enumm, es mas flexible
    @Column(name = "first_name" , nullable = false)
    @Enumerated(EnumType.STRING)
    public Gender gender;

    @Column(name = "ip_adress" , nullable = false)
    public String ipAdress;

    // Country tambien podria ser un Enumm para que no se puedan 
    // colocar paises inexistentes
    @Column(name = "country_name" , nullable = false)
    public String country;
    
}
