package br.com.lpndev.lpnvdev_app.controller;

import java.util.List;
import java.util.Optional;

import br.com.lpndev.lpnvdev_app.service.AdressService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.lpndev.lpnvdev_app.model.Adress;

@RestController
@CrossOrigin("*")
@RequestMapping("/adress")
public class AdressController {

    private final AdressService adressService;

    public AdressController(AdressService adressService) {
        this.adressService = adressService;
    }

    @GetMapping
    public List<Adress> userList() {
        return adressService.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody Adress adressDTO) {
        return ResponseEntity.ok(adressDTO);
    }

    @PutMapping
    public Adress editUser(@RequestBody Adress adress) {
        return adressService.alterAdress(adress);
    }

    @DeleteMapping("/{id}")
    public Optional<Adress> deleteUser(@PathVariable Integer id) {
        Optional<Adress> adress = adressService.findById(id);
        adressService.deleteAdress(id);
        return adress;
    }
}
