package br.com.lpndev.lpnvdev_app.controller;

import java.util.List;
import java.util.Optional;

import br.com.lpndev.lpnvdev_app.service.AdressService;
import br.com.lpndev.lpnvdev_app.service.CostumerService;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import br.com.lpndev.lpnvdev_app.DTO.DTOadress;
import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Costumer;

@RestController
@CrossOrigin("*")
@RequestMapping("/adress")
public class AdressController {

    private final AdressService adressService;
    private final CostumerService costumerService;

    public AdressController(AdressService adressService, CostumerService costumerService) {
        this.costumerService = costumerService;
        this.adressService = adressService;
    }

    @GetMapping
    public List<Adress> userList() {
        return adressService.findAll();
    }

    @GetMapping("/{id}")
    public List<Adress> findById(@PathVariable Integer id) {
        return adressService.findByCostumerId(id);
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody Adress adressDTO) {
        return ResponseEntity.ok(adressDTO);
    }

    @PostMapping("/save")
    public Adress saveAdress(@RequestBody DTOadress adress) {

        Costumer costumer = costumerService.findById(adress.getCostumerId())
                .orElseThrow(() -> new RuntimeException("Costumer not found"));
        Adress newAdress = new Adress(
                adress.getLogradouro(),
                adress.getCep(),
                adress.getBairro(),
                adress.getUf(),
                adress.getCidade(),
                adress.getNumero(),
                adress.getComplemento(),
                adress.isTipoEndereco(),
                adress.isPrincipal(),
                costumer);
        return adressService.saveAdress(newAdress);
    }

    @Transactional
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
