package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.ProductImg;
import br.com.lpndev.lpnvdev_app.service.ProductImgService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin("*")
@RequestMapping("/productImg")
public class ProductImgController {

    private static final String UPLOAD_DIR = "uploads/";
    private final ProductImgService productImgService;

    public ProductImgController(ProductImgService productImgService) {
        this.productImgService = productImgService;
    }

    @GetMapping
    public List<ProductImg> productImgList() {
        return productImgService.findAll();
    }

    @PostMapping
    public String createProduct(@RequestParam("images") ArrayList<MultipartFile> images) throws ExecutionException {
        String productName = String.valueOf(images.getFirst());
        images.remove(0);
        try {
            String productDir = UPLOAD_DIR + productName.replaceAll("\\s+", "") + "/";
            Path productPath = Paths.get(productDir);
            if (!Files.exists(productPath)) {
                Files.createDirectories(productPath);
            }

            for (MultipartFile image : images) {
                String filePath = productDir + image.getOriginalFilename();
                image.transferTo(new File(filePath));

                ProductImg productImg = new ProductImg();
                productImg.setLinkimg(filePath);
                productImg.setNome(productName);
                int padrao = 0;
                productImg.setPadrao( padrao == 0 ? true : false);
                padrao++;

                productImgService.saveProductImg(productImg); 
            }

            return "Produto '" + productName + "' criado com sucesso! Imagens salvas em " + productDir;
        } catch (IOException e) {
            return "Erro ao criar produto: " + e.getMessage();
        }
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
