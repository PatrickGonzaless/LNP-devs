package br.com.lpndev.lpnvdev_app.DTO;

import java.util.List;

import br.com.lpndev.lpnvdev_app.model.Costumer;
import br.com.lpndev.lpnvdev_app.model.Product;

public class DTOOrder {
    private Integer adressID;
    private String formapagamento;
    private Double valorfrete;
    private Double valortotalpedido;
    private List<Product> produtos;
    private Costumer costumer;

    public DTOOrder(Integer adressID, String formapagamento, Double valorfrete, Double valortotalpedido,
            List<Product> produtos, Costumer costumer) {
        this.adressID = adressID;
        this.formapagamento = formapagamento;
        this.valorfrete = valorfrete;
        this.valortotalpedido = valortotalpedido;
        this.produtos = produtos;
        this.costumer = costumer; // Initialize costumer as null
    }

    public Integer getAdressID() {
        return adressID;
    }

    public void setAdressID(Integer adressID) {
        this.adressID = adressID;
    }

    public String getFormapagamento() {
        return formapagamento;
    }

    public void setFormapagamento(String formapagamento) {
        this.formapagamento = formapagamento;
    }

    public Double getValortotalpedido() {
        return valortotalpedido;
    }

    public void setValortotalpedido(Double valortotalpedido) {
        this.valortotalpedido = valortotalpedido;
    }

    public Double getValorfrete() {
        return valorfrete;
    }

    public void setValorfrete(Double valorfrete) {
        this.valorfrete = valorfrete;
    }

    public List<Product> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Product> produtos) {
        this.produtos = produtos;
    }

    public Costumer getCostumer() {
        return costumer;
    }

    public void setCostumer(Costumer costumer) {
        this.costumer = costumer;
    }

}
