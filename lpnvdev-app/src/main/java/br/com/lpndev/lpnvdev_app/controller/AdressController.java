package br.com.lpndev.lpnvdev_app.controller;

import java.util.List;
import java.util.Optional;

import br.com.lpndev.lpnvdev_app.service.AdressService;
import br.com.lpndev.lpnvdev_app.service.CostumerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Costumer;
import br.com.lpndev.lpnvdev_app.DTO.DTOadress;

@RestController
@CrossOrigin("*")
@RequestMapping("/adress")
public class AdressController {

    private final AdressService adressService;
    private final CostumerService costumerService;

    public AdressController(AdressService adressService, CostumerService costumer) {
        this.costumerService = costumer;
        this.adressService = adressService;
    }

    @GetMapping
    public List<Adress> userList() {
        return adressService.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody DTOadress adressDTO) {
        try {
            // Valida o costumerId
            Integer costumerId = adressDTO.getCostumerId();
            if (costumerId == null) {
                System.out.println("Erro: costumerId é null");
                return ResponseEntity.badRequest().body(null);
            }

            // Busca o Costumer
            Optional<Costumer> costumerOpt = costumerService.findById(costumerId);
            if (!costumerOpt.isPresent()) {
                System.out.println("Erro: Costumer não encontrado para ID " + costumerId);
                return ResponseEntity.badRequest().body(null);
            }

            // Monta o Adress
            Adress adress = new Adress();
            adress.setIdCostumer(costumerOpt.get());
            adress.setLogradouro(adressDTO.getLogradouro());
            adress.setCep(adressDTO.getCep());
            adress.setBairro(adressDTO.getBairro());
            adress.setUf(adressDTO.getUf());
            adress.setCidade(adressDTO.getCidade());
            adress.setNumero(adressDTO.getNumero());
            adress.setComplemento(adressDTO.getComplemento());
            adress.setTipoEndereco(adressDTO.isTipoEndereco());
            adress.setPrincipal(adressDTO.isPrincipal());

            // Salva
            Adress saved = adressService.saveAdress(adress);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
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
