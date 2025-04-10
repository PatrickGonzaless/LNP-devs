package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.Costumer;
import br.com.lpndev.lpnvdev_app.service.CostumerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/costumer")
public class CostumerController {
    private final CostumerService costumerService;

    public CostumerController(CostumerService costumerService) {
        this.costumerService = costumerService;
    }

    @GetMapping
    public List<Costumer> costumerList() {
        return costumerService.findAll();
    }

    @PostMapping("/login")
    public String createCostumer(@RequestBody Costumer costumer) {
        Optional<Costumer> foundUser = costumerService.findByEmail(costumer.getEmail());

        if (foundUser.isPresent()) {
            Costumer existingUser = foundUser.get();
            if (costumerService.checkPassword(existingUser, costumer.getSenha())) {
                return "Login successful";
            } else {
                return "Senha incorreta";
            }
        }
        return "Usuário não encontrado";
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
