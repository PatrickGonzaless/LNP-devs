package br.com.lpndev.lpnvdev_app.model;

import java.util.ArrayList;

public class AlterImgDto {
    private Product product;
    private int principal;
    private ArrayList<ProductImg> arquivos;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getPrincipal() {
        return principal;
    }

    public void setPrincipal(int principal) {
        this.principal = principal;
    }

    public ArrayList<ProductImg> getArquivos() {
        return arquivos;
    }

    public void setArquivos(ArrayList<ProductImg> arquivos) {
        this.arquivos = arquivos;
    }

}
