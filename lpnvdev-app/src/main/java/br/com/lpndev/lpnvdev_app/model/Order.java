package br.com.lpndev.lpnvdev_app.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "pedido")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer id_pedido;

    @Column(name = "dtpedido", length = 100, nullable = true)
    private String dt_pedido;

    @Column(name = "formapagamento", nullable = true)
    private String formapagamento;

    @Column(name = "valorfrete", nullable = true)
    private Double valorfrete;

    @Column(name = "valortotalpedido", nullable = true)
    private Double valortotalpedido;

    @Column(name = "statuspedido", nullable = true)
    private String statuspedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_endereco", nullable = false)
    private Adress idAdress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_cliente", nullable = false)
    private Costumer idCostumer;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "produtos_pedidos", joinColumns = @JoinColumn(name = "id_pedido"), inverseJoinColumns = @JoinColumn(name = "id_produto"))
    private List<Product> produtos;

    public Order(String dt_pedido, String formapagamento, Double valorfrete,
            Double valortotalpedido, String statuspedido, Adress idAdress, Costumer idCostumer,
            List<Product> produtos) {
        this.dt_pedido = dt_pedido;
        this.formapagamento = formapagamento;
        this.valorfrete = valorfrete;
        this.valortotalpedido = valortotalpedido;
        this.statuspedido = statuspedido;
        this.idAdress = idAdress;
        this.idCostumer = idCostumer;
        this.produtos = produtos;
    }

    public Order(int id, String dt_pedido, String formapagamento, Double valorfrete,
            Double valortotalpedido, String statuspedido, Adress idAdress, Costumer idCostumer,
            List<Product> produtos) {
        this.id_pedido = id;
        this.dt_pedido = dt_pedido;
        this.formapagamento = formapagamento;
        this.valorfrete = valorfrete;
        this.valortotalpedido = valortotalpedido;
        this.statuspedido = statuspedido;
        this.idAdress = idAdress;
        this.idCostumer = idCostumer;
        this.produtos = produtos;
    }

    public Order() {
    }

    public Integer getId() {
        return id_pedido;
    }

    public void setId(Integer id) {
        this.id_pedido = id;
    }

    public String getDt_pedido() {
        return dt_pedido;
    }

    public void setDt_pedido(String dt_pedido) {
        this.dt_pedido = dt_pedido;
    }

    public String getFormapagamento() {
        return formapagamento;
    }

    public void setFormapagamento(String formapagamento) {
        this.formapagamento = formapagamento;
    }

    public Double getValorfrete() {
        return valorfrete;
    }

    public void setValorfrete(Double valorfrete) {
        this.valorfrete = valorfrete;
    }

    public Double getValortotalpedido() {
        return valortotalpedido;
    }

    public void setValortotalpedido(Double valortotalpedido) {
        this.valortotalpedido = valortotalpedido;
    }

    public String isStatuspedido() {
        return statuspedido;
    }

    public void setStatuspedido(String statuspedido) {
        this.statuspedido = statuspedido;
    }

    public Adress getIdAdress() {
        return idAdress;
    }

    public void setIdAdress(Adress idAdress) {
        this.idAdress = idAdress;
    }

    public Costumer getIdCostumer() {
        return idCostumer;
    }

    public void setIdCostumer(Costumer idCostumer) {
        this.idCostumer = idCostumer;
    }

    public String getStatuspedido() {
        return statuspedido;
    }

    public List<Product> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Product> produtos) {
        this.produtos = produtos;
    }

}
