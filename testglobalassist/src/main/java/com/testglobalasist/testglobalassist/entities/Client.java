package com.testglobalasist.testglobalassist.entities;

import com.testglobalasist.testglobalassist.enumms.Gender;
import com.testglobalasist.testglobalassist.utils.GenderConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;

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

    @Column(name = "gender", nullable = false)
    @Convert(converter = GenderConverter.class)
    public Gender gender;

    @Column(name = "ip_address" , nullable = false)
    public String ipAddress;

    // Country tambien podria ser un Enumm para que no se puedan 
    // colocar paises inexistentes
    @Column(name = "country" , nullable = false)
    public String country;
    
}
