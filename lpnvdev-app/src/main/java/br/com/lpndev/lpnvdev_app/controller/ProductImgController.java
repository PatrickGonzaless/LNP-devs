package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.ProductImg;
import br.com.lpndev.lpnvdev_app.service.ProductImgService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient.Builder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.nio.file.Path;

@RestController
@CrossOrigin("*")
@RequestMapping("/productImg")
public class ProductImgController {

    private final ProductImgService productImgService;
    private static final String UPLOAD_DIR = "../../resources/img/uploads/";

    public ProductImgController(ProductImgService productImgService, Builder webClientBuilder) {
        this.productImgService = productImgService;
    }

    @GetMapping
    public List<ProductImg> productImgList() {
        return productImgService.findAll();
    }

    @PostMapping
    public ResponseEntity<String> uploadArquivos(@RequestParam("arquivos") MultipartFile[] arquivos) {
        try {
            // Cria o diretório se não existir
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            List<String> caminhos = new ArrayList<>();

            // Salva cada arquivo
            for (MultipartFile arquivo : arquivos) {
                if (!arquivo.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "-" + arquivo.getOriginalFilename();
                    Path filePath = Paths.get(UPLOAD_DIR + fileName);
                    Files.write(filePath, arquivo.getBytes());
                    caminhos.add(filePath.toString());
                }
            }

            if (caminhos.isEmpty()) {
                return ResponseEntity.status(400).body("Nenhum arquivo válido enviado, mano!");
            }

            return ResponseEntity.ok("Arquivos salvos com sucesso: " + String.join(", ", caminhos));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao salvar os arquivos: " + e.getMessage());
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
