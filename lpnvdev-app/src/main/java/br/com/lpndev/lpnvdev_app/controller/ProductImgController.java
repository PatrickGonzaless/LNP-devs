package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.ProductImg;
import br.com.lpndev.lpnvdev_app.service.ProductImgService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient.Builder;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/productImg")
public class ProductImgController {

    private final ProductImgService productImgService;

    public ProductImgController(ProductImgService productImgService, Builder webClientBuilder) {
        this.productImgService = productImgService;
    }

    @GetMapping
    public List<ProductImg> productImgList() {
        return productImgService.findAll();
    }

    @PostMapping
    public ProductImg createProductImg(ProductImg produtoImg) {
        return productImgService.saveProductImg(produtoImg);
    }

    @PutMapping
    public ProductImg editProductImg(@RequestBody ProductImg productImg) {
        return productImgService.alterProductImg(productImg);
    }

    @DeleteMapping("/{id}")
    public Optional<ProductImg> deleteProductImg(@PathVariable Integer id) {
        Optional<ProductImg> productImg = productImgService.findById(id);
        productImgService.deleteProduct(id);
        return productImg;
    }
}
