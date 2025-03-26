package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.ImageDto;
import br.com.lpndev.lpnvdev_app.model.Product;
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
    private String UPLOAD_DIR = "lpnvdev-app/src/main/resources/img/uploads/";

    public ProductImgController(ProductImgService productImgService, Builder webClientBuilder) {
        this.productImgService = productImgService;
    }

    @GetMapping
    public List<ProductImg> productImgList() {
        return productImgService.findAll();
    }

    @PostMapping
    public ResponseEntity<String> uploadArquivos(@RequestBody ImageDto imageDto) {

        Product produto = imageDto.getProduct();
        int principal = imageDto.getPrincipal();
        ArrayList<MultipartFile> arquivos = imageDto.getArquivos();

        String caminho = UPLOAD_DIR + produto.getNome() + "/";
        try {
            // Cria o diretório se não existir
            File directory = new File(caminho);
            if (!directory.exists()) {
                directory.mkdirs(); // Cria o diretório e subdiretórios se necessário
                System.out.println("Diretório criado: " + caminho);
            } else {
                System.out.println("Diretório já existe: " + caminho);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao criar diretório: " + e.getMessage());
        }

        try {
            // Salva cada arquivo
            int i = 1;
            for (MultipartFile arquivo : arquivos) {
                if (!arquivo.isEmpty()) {
                    Path filePath = Paths.get(caminho + produto.getNome() + "_" + i + ".png");
                    Files.write(filePath, arquivo.getBytes());
                    ProductImg img = new ProductImg(arquivo.getOriginalFilename(), filePath.toString(),
                            ((i - 1) == principal),
                            produto);
                    productImgService.saveProductImg(img);
                    i++;
                }
            }

            if (arquivos.size() == 0) {
                return ResponseEntity.status(400).body("Nenhum arquivo válido enviado, mano!");
            }

            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao salvar os arquivos: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<String> editProductImg(@RequestBody ImageDto imageDto) {
        Product produto = imageDto.getProduct();
        int principal = imageDto.getPrincipal();
        ArrayList<MultipartFile> arquivos = imageDto.getArquivos();
        deleteProductImg(produto);

        String caminho = UPLOAD_DIR + produto.getNome() + "/";
        try {
            // Cria o diretório se não existir
            File directory = new File(caminho);
            if (!directory.exists()) {
                directory.mkdirs(); // Cria o diretório e subdiretórios se necessário
                System.out.println("Diretório criado: " + caminho);
            } else {
                System.out.println("Diretório já existe: " + caminho);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao criar diretório: " + e.getMessage());
        }

        try {
            // Salva cada arquivo
            int i = 1;
            for (MultipartFile arquivo : arquivos) {
                if (!arquivo.isEmpty()) {
                    Path filePath = Paths.get(caminho + produto.getNome() + "_" + i + ".png");
                    Files.write(filePath, arquivo.getBytes());
                    ProductImg img = new ProductImg(arquivo.getOriginalFilename(), filePath.toString(),
                            ((i - 1) == principal),
                            produto);
                    productImgService.saveProductImg(img);
                    i++;
                }
            }
            if (arquivos.size() == 0) {
                return ResponseEntity.status(400).body("Nenhum arquivo válido enviado, mano!");
            }
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao salvar os arquivos: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public Optional<ProductImg> deleteProductImg(Product produto) {
        for (ProductImg img : produto.getImagens()) {
            File diretorio = new File(img.getLinkimg());
            if (diretorio.exists() && diretorio.isDirectory()) {
                diretorio.delete();
            }
            productImgService.deleteProduct(img.getIdImg());
        }
        File diretorio = new File(UPLOAD_DIR + produto.getNome() + "/");
        if (diretorio.exists() && diretorio.isDirectory()) {
            diretorio.delete();
        }
        return null;
    }
}
