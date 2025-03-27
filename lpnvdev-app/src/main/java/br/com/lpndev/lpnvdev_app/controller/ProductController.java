package br.com.lpndev.lpnvdev_app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lpndev.lpnvdev_app.model.Product;
import br.com.lpndev.lpnvdev_app.service.ProductService;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> productList() {
        return productService.findAll();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping
    public Product editProduct(@RequestBody Product product) {
        return productService.alterProduct(product);
    }

    @DeleteMapping("/{id}")
    public Optional<Product> deleteProduct(@PathVariable Integer id) {
        Optional<Product> product = productService.findById(id);
        productService.deleteProduct(id);
        return product;
    }

    @DeleteMapping("/all")
    public void deleteAll() {
        for (int i = 11; i < 130; i++) {
            productService.deleteProduct(i);
        }
    }
}
