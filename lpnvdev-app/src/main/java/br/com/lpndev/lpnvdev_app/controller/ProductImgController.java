package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.Product;
import br.com.lpndev.lpnvdev_app.model.ProductImg;
import br.com.lpndev.lpnvdev_app.service.ProductImgService;
import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.Builder;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
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
    private final WebClient.Builder webClientBuilder;

    @Autowired
    public ProductImgController(ProductImgService productImgService, Builder webClientBuilder) {
        this.productImgService = productImgService;
        this.webClientBuilder = webClientBuilder;
    }

    @GetMapping
    public List<ProductImg> productImgList() {
        return productImgService.findAll();
    }

    @PostMapping
    public String createProduct(ArrayList<MultipartFile> images) {

        String url = "http://localhost:8080/product";
        MultipartFile nome = images.get(images.size() - 1);
        byte[] fileBytes = null;
        try {
            fileBytes = nome.getBytes();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String productName = new String(fileBytes, StandardCharsets.UTF_8);

        Mono<List<Product>> produtosMono = webClientBuilder.baseUrl(url).build().get().retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Product>>() {
                });

        final Integer[] idProd = new Integer[1];
        produtosMono.subscribe(produtos -> {
            produtos.forEach(produto -> {
                if (produto.getNome().equals(productName)) {
                    idProd[0] = produto.getId();
                }
            });
        });

        try {
            String productDir = UPLOAD_DIR + productName.replaceAll("\\s+", "") + "/";
            Path productPath = Paths.get("../../resources/imgProdutos/" + productDir);
            if (!Files.exists(productPath)) {
                Files.createDirectories(productPath);
            }
            int padrao = 0;
            for (MultipartFile image : images) {
                String filePath = ("../../resources/imgProdutos/" + productDir + image.getOriginalFilename());
                image.transferTo(new File(filePath));

                ProductImg productImg = new ProductImg();
                productImg.setNome(productName);
                productImg.setLinkimg(filePath);
                productImg.setPadrao(padrao == 0 ? true : false);
                padrao++;
                productImg.setIdImg(idProd[0]);
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
