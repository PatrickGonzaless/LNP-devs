package br.com.lpndev.lpnvdev_app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import br.com.lpndev.lpnvdev_app.model.Endereco;
import br.com.lpndev.lpnvdev_app.service.EnderecoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/enderecos")
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @GetMapping
    public List<Endereco> userList() {
        return enderecoService.findAll();
    }

    @PostMapping
    public Endereco createUser(@RequestBody Endereco endereco) {
        return enderecoService.saveEndereco(endereco);
    }

    @PutMapping
    public Endereco editUser(@RequestBody Endereco endereco) {
        return enderecoService.alterEndereco(endereco);
    }

    @DeleteMapping("/{id}")
    public Optional<Endereco> deleteUser(@PathVariable Integer id) {
        Optional<Endereco> endereco = enderecoService.findById(id);
        enderecoService.deleteEndereco(id);
        return endereco;
    }
}
