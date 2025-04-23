package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Costumer;
import br.com.lpndev.lpnvdev_app.DTO.DTOCostumer;
import br.com.lpndev.lpnvdev_app.service.AdressService;
import br.com.lpndev.lpnvdev_app.service.CostumerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/costumer")
public class CostumerController {
    private final CostumerService costumerService;
    private final AdressService adressService;

    public CostumerController(CostumerService costumerService, AdressService adressService) {
        this.adressService = adressService;
        this.costumerService = costumerService;
    }

    @GetMapping
    public List<Costumer> costumerList() {
        return costumerService.findAll();
    }

    @PostMapping("/login")
    public Optional<Costumer> login(@RequestBody Costumer costumer) {
        Optional<Costumer> foundUser = costumerService.findByEmail(costumer.getEmail());
        if (foundUser.isPresent()) {
            Costumer existingUser = foundUser.get();
            if (costumerService.checkPassword(existingUser, costumer.getSenha())) {
                return foundUser;
            }
        }
        return null;
    }

    @PostMapping
    public Costumer createCostumer2(@ModelAttribute DTOCostumer DTO) {
        System.out.println(DTO);
        Costumer costumer = new Costumer(DTO.getEmail(), DTO.getNomeCompleto(), DTO.getCpf(), DTO.getDataNascimento(),
                DTO.isGenero(), DTO.getSenha());
        Costumer newCostumer = costumerService.saveCostumer(costumer);

        Adress adress = null;
        for (int i = 0; i < DTO.getLogradouro().length; i++) {
            adress = new Adress(DTO.getLogradouro()[i], DTO.getCep()[i], DTO.getBairro()[i], DTO.getUf()[i],
                    DTO.getCidade()[i], DTO.getNumero()[i], DTO.getComplemento()[i], DTO.getTipoEndereco()[i],
                    DTO.getPrincipal()[i], newCostumer);
            adressService.saveAdress(adress);
        }

        if (newCostumer != null && adress != null) {
            return newCostumer; // User created successfully
        } else {
            return null; // User already exists
        }
    }

    @PutMapping
    public Costumer editCostumer(@RequestBody Costumer costumer) {
        return costumerService.alterCostumer(costumer);
    }

    @DeleteMapping("/{id}")
    public Optional<Costumer> deleteCostumer(@PathVariable Integer id) {
        Optional<Costumer> costumer = costumerService.findById(id);
        costumerService.deleteCostumer(id);
        return costumer;
    }
}
