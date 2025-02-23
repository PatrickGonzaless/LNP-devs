package br.com.lpndev.lpnvdev_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Data
@Entity
@Table(name="register")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank(message = "O nome é obrigatório!")
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres!")
    @Column(name = "username", length = 200, nullable = false)
    private String username;

    @CPF(message = "Insira um cpf válido!")
    @NotBlank(message = "O cpf é obrigatório!")
    @Column(name = "cpf", length = 11, nullable = false)
    private String cpf;

    @Email(message = "Insira um e-mail válido!")
    @NotBlank(message = "O e-mail é obrigatório!")
    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @NotBlank(message = "O grupo é obrigatório!")
    @Column(name = "grupo")
    private String grupo;

    @NotBlank(message = "A senha é obrigatório!")
    @Column(name = "senha", columnDefinition = "TEXT", nullable = false)
    private String senha;

    @Column(name = "stats", nullable = false)
    private boolean stats;


}
