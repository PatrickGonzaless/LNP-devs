package br.com.lpndev.lpnvdev_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "enderecos")
public class Adress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Integer id;

    @Column(name = "logradouro", length = 100, nullable = true)
    public String logradouro;

    @Column(name = "cep", length = 9, nullable = true)
    public String cep;

    @Column(name = "bairro", length = 100, nullable = true)
    public String bairro;

    @Column(name = "uf", length = 2, nullable = true)
    public String uf;

    @Column(name = "cidade", length = 100, nullable = true)
    public String cidade;

    @Column(name = "numero", length = 4, nullable = true)
    public String numero;

    @Column(name = "complemento", length = 20, nullable = true)
    public String complemento;

    @Column(name = "tipoendereco", nullable = true)
    public boolean tipoEndereco; // 0 = entrega, 1 = cobrança

    @Column(name = "principal", nullable = true)
    public boolean principal; // 0 = não, 1 = sim

    @OneToMany
    @JsonIgnore
    @JoinColumn(name = "id_cliente", nullable = false)
    public Costumer idCostumer; // FK para a tabela de clientes

    public Adress() {
    }

    public Adress(String logradouro, String cep, String bairro, String uf, String cidade, String numero,
            String complemento, boolean tipoEndereco, boolean principal, Costumer idCliente) {
        this.logradouro = logradouro;
        this.cep = cep;
        this.bairro = bairro;
        this.uf = uf;
        this.cidade = cidade;
        this.numero = numero;
        this.complemento = complemento;
        this.tipoEndereco = tipoEndereco;
        this.principal = principal;
        this.idCostumer = idCliente;
    }

    public Adress(int id, String logradouro, String cep, String bairro, String uf, String cidade, String numero,
            String complemento, boolean tipoEndereco, boolean principal, Costumer idCliente) {
        this.id = id;
        this.logradouro = logradouro;
        this.cep = cep;
        this.bairro = bairro;
        this.uf = uf;
        this.cidade = cidade;
        this.numero = numero;
        this.complemento = complemento;
        this.tipoEndereco = tipoEndereco;
        this.principal = principal;
        this.idCostumer = idCliente;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public boolean isTipoEndereco() {
        return tipoEndereco;
    }

    public void setTipoEndereco(boolean tipoEndereco) {
        this.tipoEndereco = tipoEndereco;
    }

    public boolean isPrincipal() {
        return principal;
    }

    public void setPrincipal(boolean principal) {
        this.principal = principal;
    }

    public Costumer getIdCliente() {
        return idCostumer;
    }

    public void setIdCliente(Costumer idCliente) {
        this.idCostumer = idCliente;
    }

}
