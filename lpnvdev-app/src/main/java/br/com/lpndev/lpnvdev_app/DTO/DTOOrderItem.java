package br.com.lpndev.lpnvdev_app.DTO;

public class DTOOrderItem {
    private Integer orderID;
    private Integer productID;
    private Integer prodImgID;

    private Integer qtdproduto;
    private Integer valorunit;
    private Integer subtotal;

    public Integer getOrderID() {
        return orderID;
    }

    public void setOrderID(Integer orderID) {
        this.orderID = orderID;
    }

    public Integer getProductID() {
        return productID;
    }

    public void setProductID(Integer productID) {
        this.productID = productID;
    }

    public Integer getProdImgID() {
        return prodImgID;
    }

    public void setProdImgID(Integer prodImgID) {
        this.prodImgID = prodImgID;
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
}
