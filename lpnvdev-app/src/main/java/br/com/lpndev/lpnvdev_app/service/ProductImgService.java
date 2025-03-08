package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IProductImg;
import br.com.lpndev.lpnvdev_app.model.ProductImg;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImgService {
    private final IProductImg daoPI;

    public ProductImgService(IProductImg daoPI) {
        this.daoPI = daoPI;
    }

    public ProductImg saveProductImg(ProductImg productImg) {
        return daoPI.save(productImg);
    }

    public ProductImg alterProductImg(ProductImg productImg) {
        return daoPI.save(productImg);
    }

    public List<ProductImg> findAll() {
        return daoPI.findAll();
    }

    public Optional<ProductImg> findById(Integer id) {
        return daoPI.findById(id);
    }

    public void deleteProduct(Integer id) {
        daoPI.deleteById(id);
    }
}
