package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.Directory;
import br.com.lpndev.lpnvdev_app.model.Product;
import br.com.lpndev.lpnvdev_app.model.ProductImg;
import br.com.lpndev.lpnvdev_app.service.ProductImgService;
import br.com.lpndev.lpnvdev_app.service.ProductService;

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
    private ProductService productService;
    private String UPLOAD_DIR = "../../resources/img/uploads/";
    private String caminho;
    private int id;

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
            List<String> caminhos = new ArrayList<>();

            // Salva cada arquivo
            for (MultipartFile arquivo : arquivos) {
                if (!arquivo.isEmpty()) {
                    String fileName = arquivo.getOriginalFilename();
                    Path filePath = Paths.get(caminho + fileName);
                    Files.write(filePath, arquivo.getBytes());
                    caminhos.add(filePath.toString());
                    List<Product> prod = productService.findAll();
                    ProductImg img = null;
                    for (Product product : prod) {
                        if (product.getId() == id) {
                            img = new ProductImg(fileName, filePath.toString(), false, product);
                        }
                    }
                    productImgService.saveProductImg(img);
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

    @PostMapping("/directory")
    public ResponseEntity<String> criaDiretorio(@RequestBody Directory prod) {
        caminho = UPLOAD_DIR + prod.getNome();
        id = prod.getId();
        try {
            // Cria o diretório se não existir
            File directory = new File(caminho);
            if (!directory.exists()) {
                directory.mkdirs(); // Cria o diretório e subdiretórios se necessário
                return ResponseEntity.ok("Diretório criado: " + caminho);
            } else {
                return ResponseEntity.ok("Diretório já existe: " + caminho);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao criar diretório: " + e.getMessage());
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
