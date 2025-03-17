package br.com.lpndev.lpnvdev_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "img_prod")
public class ProductImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_img")
    private Integer idImg;

    @Column(name = "nome", length = 200, nullable = true)
    private String nome;

    @Column(name = "linkimg", length = 250, nullable = true)
    private String linkimg;

    @Column(name = "padrao", nullable = true)
    private boolean padrao;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "produto_id", nullable = false)
    private Product produto;

    public ProductImg() {
    }

    public ProductImg(String nome, String linkimg, boolean padrao, Product produto) {
        this.nome = nome;
        this.linkimg = linkimg;
        this.padrao = padrao;
        this.produto = produto;
    }

    public Integer getIdImg() {
        return idImg;
    }

    public void setIdImg(Integer idImg) {
        this.idImg = idImg;
    }

    public String getLinkimg() {
        return linkimg;
    }

    public void setLinkimg(String linkimg) {
        this.linkimg = linkimg;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public boolean isPadrao() {
        return padrao;
    }

    public void setPadrao(boolean padrao) {
        this.padrao = padrao;
    }

    public Product getProduto() {
        return produto;
    }

    public void setProduto(Product produto) {
        this.produto = produto;
    }
}
