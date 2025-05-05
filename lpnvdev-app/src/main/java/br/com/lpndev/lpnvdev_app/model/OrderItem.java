package br.com.lpndev.lpnvdev_app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "itempedido")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_itempedido")
    private Integer id;

    @Column(name = "qtdproduto", nullable = true)
    private Integer qtdproduto;

    @Column(name = "valorunit", nullable = true)
    private Integer valorunit;

    @Column(name = "subtotal", nullable = true)
    private Integer subtotal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_img", nullable = false)
    private ProductImg prodimg;

    public OrderItem(Integer qtdproduto, Integer valorunit, Integer subtotal,
                     Product product) {
        this.qtdproduto = qtdproduto;
        this.valorunit = valorunit;
        this.subtotal = subtotal;
        this.product = product;
    }

    public OrderItem(int id, Integer qtdproduto, Integer valorunit, Integer subtotal,
                     Order pedido, Product product, ProductImg prodimg) {
        this.id = id;
        this.qtdproduto = qtdproduto;
        this.valorunit = valorunit;
        this.subtotal = subtotal;
        this.order = pedido;
        this.product = product;
        this.prodimg = prodimg;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQtdproduto() {
        return qtdproduto;
    }

    public void setQtdproduto(Integer qtdproduto) {
        this.qtdproduto = qtdproduto;
    }

    public Integer getValorunit() {
        return valorunit;
    }

    public void setValorunit(Integer valorunit) {
        this.valorunit = valorunit;
    }

    public Integer getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Integer subtotal) {
        this.subtotal = subtotal;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order pedido) {
        this.order = pedido;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ProductImg getProdimg() {
        return prodimg;
    }

    public void setProdimg(ProductImg prodimg) {
        this.prodimg = prodimg;
    }
}


