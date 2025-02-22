package br.com.lpndev.lpnvdev_app.model;

import jakarta.persistence.*;

@Entity
@Table(name="register")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username", length = 200, nullable = true)
    private String username;

    @Column(name = "cpf", length = 11, nullable = true)
    private String cpf;

    @Column(name = "email", length = 50, nullable = true)
    private String email;

    @Column(name = "grupo")
    private String grupo;

    @Column(name = "senha", columnDefinition = "TEXT", nullable = true)
    private String senha;

    @Column(name = "stats", nullable = false)
    private boolean stats;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public boolean isStats() {
        return stats;
    }

    public void setStats(boolean stats) {
        this.stats = stats;
    }
}
