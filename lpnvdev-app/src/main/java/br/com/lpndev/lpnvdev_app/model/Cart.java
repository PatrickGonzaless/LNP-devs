package br.com.lpndev.lpnvdev_app.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carrinho")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrinho")
    private Integer id_carrinho;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_cliente", nullable = false)
    private Costumer id_cliente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_produto", nullable = false)
    private List<Product> id_produto;

    @Column(name = "qtd")
    private Integer qtd;

    public Cart() {
    }

    public Cart(Integer id_carrinho, Costumer id_cliente, List<Product> id_produto, Integer qtd) {
        this.id_carrinho = id_carrinho;
        this.id_cliente = id_cliente;
        this.id_produto = id_produto;
        this.qtd = qtd;
    }

    public Integer getId_carrinho() {
        return id_carrinho;
    }

    public void setId_carrinho(Integer id_carrinho) {
        this.id_carrinho = id_carrinho;
    }

    public Integer getQtd() {
        return qtd;
    }

    public void setQtd(Integer qtd) {
        this.qtd = qtd;
    }

    public Costumer getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Costumer id_cliente) {
        this.id_cliente = id_cliente;
    }

    public List<Product> getId_produto() {
        return id_produto;
    }

    public void setId_produto(List<Product> id_produto) {
        this.id_produto = id_produto;
    }

}
