package br.com.lpndev.lpnvdev_app.model;

import java.time.LocalDate;

public class DTOCostumer {

    private String email;
    private String cpf;
    private String nomeCompleto;
    private LocalDate dataNascimento;
    private boolean genero;
    private String senha;

    private String logradouro;
    private String cep;
    private String bairro;
    private String uf;
    private String cidade;
    private String numero;
    private String complemento;
    private boolean tipoEndereco; // 0 = entrega, 1 = cobrança
    private boolean principal; // 0 = não, 1 = sim

    private String logradouroD;
    private String cepD;
    private String bairroD;
    private String ufD;
    private String cidadeD;
    private String numeroD;
    private String complementoD;
    private boolean tipoEnderecoD; // 0 = entrega, 1 = cobrança
    private boolean principalD; // 0 = não, 1 = sim

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
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

    public String getLogradouroD() {
        return logradouroD;
    }

    public void setLogradouroD(String logradouroD) {
        this.logradouroD = logradouroD;
    }

    public String getCepD() {
        return cepD;
    }

    public void setCepD(String cepD) {
        this.cepD = cepD;
    }

    public String getBairroD() {
        return bairroD;
    }

    public void setBairroD(String bairroD) {
        this.bairroD = bairroD;
    }

    public String getUfD() {
        return ufD;
    }

    public void setUfD(String ufD) {
        this.ufD = ufD;
    }

    public String getCidadeD() {
        return cidadeD;
    }

    public void setCidadeD(String cidadeD) {
        this.cidadeD = cidadeD;
    }

    public String getNumeroD() {
        return numeroD;
    }

    public void setNumeroD(String numeroD) {
        this.numeroD = numeroD;
    }

    public String getComplementoD() {
        return complementoD;
    }

    public void setComplementoD(String complementoD) {
        this.complementoD = complementoD;
    }

    public boolean isTipoEnderecoD() {
        return tipoEnderecoD;
    }

    public void setTipoEnderecoD(boolean tipoEnderecoD) {
        this.tipoEnderecoD = tipoEnderecoD;
    }

    public boolean isPrincipalD() {
        return principalD;
    }

    public void setPrincipalD(boolean principalD) {
        this.principalD = principalD;
    }

}
