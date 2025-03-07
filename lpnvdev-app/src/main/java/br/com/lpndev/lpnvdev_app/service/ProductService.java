package br.com.lpndev.lpnvdev_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.lpndev.lpnvdev_app.dao.IProduct;
import br.com.lpndev.lpnvdev_app.model.Product;

@Service
public class ProductService {

    private final IProduct daoP;

    public ProductService(IProduct daoP) {
        this.daoP = daoP;
    }

    public Product saveProduct(Product product) {
        return daoP.save(product);
    }

    public Product alterProduct(Product product) {
        return daoP.save(product);
    }

    // Método para buscar todos os produtos
    public List<Product> findAll() {
        return daoP.findAll();
    }

    // Método para buscar produtos por ID
    public Optional<Product> findById(Integer id) {
        return daoP.findById(id);
    }

    // Método para deletar produto por ID
    public void deleteProduct(Integer id) {
        daoP.deleteById(id);
    }
}
