package br.com.lpndev.lpnvdev_app.model;

import java.util.ArrayList;

import org.springframework.web.multipart.MultipartFile;

public class ImageDto {
    Product product;
    ArrayList<MultipartFile> arquivos = new ArrayList<>();
    int principal;

    public ImageDto() {
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ArrayList<MultipartFile> getArquivos() {
        return arquivos;
    }

    public void setArquivos(ArrayList<MultipartFile> arquivos) {
        this.arquivos = arquivos;
    }

    public int getPrincipal() {
        return principal;
    }

    public void setPrincipal(int principal) {
        this.principal = principal;
    }
}
