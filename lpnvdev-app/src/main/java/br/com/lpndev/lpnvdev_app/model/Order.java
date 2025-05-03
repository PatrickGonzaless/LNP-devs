package br.com.lpndev.lpnvdev_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "pedido")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer id;

    @Column(name = "dtpedido", length = 100, nullable = true)
    private String dt_pedido;

    @Column(name = "formapagamento", nullable = true)
    private Integer formapagamento;

    @Column(name = "valorfrete", nullable = true)
    private Integer valorfrete;

    @Column(name = "valortotalpedido", nullable = true)
    private Integer valortotalpedido;

    @Column(name = "statuspedido", nullable = true)
    private boolean statuspedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_endereco", nullable = false)
    @JsonIgnore
    private Adress idAdress;

    public Order(String dt_pedido, Integer formapagamento, Integer valorfrete,
                 Integer valortotalpedido, boolean statuspedido, Adress idAdress) {
        this.dt_pedido = dt_pedido;
        this.formapagamento = formapagamento;
        this.valorfrete = valorfrete;
        this.valortotalpedido = valortotalpedido;
        this.statuspedido = statuspedido;
        this.idAdress = idAdress;
    }

    public Order(int id, String dt_pedido, Integer formapagamento, Integer valorfrete,
                 Integer valortotalpedido, boolean statuspedido, Adress idAdress) {
        this.id = id;
        this.dt_pedido = dt_pedido;
        this.formapagamento = formapagamento;
        this.valorfrete = valorfrete;
        this.valortotalpedido = valortotalpedido;
        this.statuspedido = statuspedido;
        this.idAdress = idAdress;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDt_pedido() {
        return dt_pedido;
    }

    public void setDt_pedido(String dt_pedido) {
        this.dt_pedido = dt_pedido;
    }

    public Integer getFormapagamento() {
        return formapagamento;
    }

    public void setFormapagamento(Integer formapagamento) {
        this.formapagamento = formapagamento;
    }

    public Integer getValorfrete() {
        return valorfrete;
    }

    public void setValorfrete(Integer valorfrete) {
        this.valorfrete = valorfrete;
    }

    public Integer getValortotalpedido() {
        return valortotalpedido;
    }

    public void setValortotalpedido(Integer valortotalpedido) {
        this.valortotalpedido = valortotalpedido;
    }

    public boolean isStatuspedido() {
        return statuspedido;
    }

    public void setStatuspedido(boolean statuspedido) {
        this.statuspedido = statuspedido;
    }

    public Adress getIdAdress() {
        return idAdress;
    }

    public void setIdAdress(Adress idAdress) {
        this.idAdress = idAdress;
    }
}


