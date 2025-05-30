package br.com.lpndev.lpnvdev_app.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "cliente")
public class Costumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "email", length = 50, nullable = true)
    private String email;

    @Column(name = "nomecompleto", length = 100, nullable = true)
    private String nomecompleto;

    @Column(name = "cpf", length = 11, nullable = true)
    private String cpf;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "datanascimento", nullable = true)
    private LocalDate datanascimento;

    @Column(name = "genero", nullable = true)
    private boolean genero;

    @Column(name = "senha", length = 100, nullable = true)
    private String senha;

    @OneToMany(mappedBy = "idCostumer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Adress> enderecos; // FK para a tabela de endereços

    @OneToMany(mappedBy = "id_cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cart> carrinho; // FK para a tabela de carrinho

    public Costumer() {
    }

    public Costumer(String email, String nomecompleto, String cpf, LocalDate datanascimento, boolean genero,
            String senha) {
        this.email = email;
        this.nomecompleto = nomecompleto;
        this.cpf = cpf;
        this.datanascimento = datanascimento;
        this.genero = genero;
        this.senha = senha;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomecompleto() {
        return nomecompleto;
    }

    public void setNomecompleto(String nomecompleto) {
        this.nomecompleto = nomecompleto;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDatanascimento() {
        return datanascimento;
    }

    public void setDatanascimento(LocalDate datanascimento) {
        this.datanascimento = datanascimento;
    }

    public boolean isGenero() {
        return genero;
    }

    public void setGenero(boolean genero) {
        this.genero = genero;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Adress> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Adress> enderecos) {
        this.enderecos = enderecos;
    }

}
