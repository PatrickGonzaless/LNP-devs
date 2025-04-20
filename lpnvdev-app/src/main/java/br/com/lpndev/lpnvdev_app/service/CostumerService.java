package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.ICostumer;
import br.com.lpndev.lpnvdev_app.model.Costumer;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CostumerService {
    private final ICostumer daoC;
    private final PasswordEncoder passwordEncoder;

    public CostumerService(ICostumer daoC, PasswordEncoder passwordEncoder) {
        this.daoC = daoC;
        this.passwordEncoder = passwordEncoder;
    }

    public Costumer saveCostumer(Costumer costumer) {
        if (costumer.getSenha() != null && !costumer.getSenha().isEmpty()) {
            costumer.setSenha(passwordEncoder.encode(costumer.getSenha())); // Encriptando a senha
        }
        return daoC.save(costumer);
    }

    public Costumer alterCostumer(Costumer costumer) {
        if (costumer.getSenha() != null && !costumer.getSenha().isEmpty()) {
            costumer.setSenha(passwordEncoder.encode(costumer.getSenha())); // Encriptando a senha
        }
        return daoC.save(costumer);
    }

    public List<Costumer> findAll() {
        return daoC.findAll();
    }

    public Optional<Costumer> findById(Integer id) {
        return daoC.findById(id);
    }

    public void deleteCostumer(Integer idC) {
        daoC.deleteById(idC);
    }

    public boolean checkPassword(Costumer costumer, String rawPassword) {
        return passwordEncoder.matches(rawPassword, costumer.getSenha());
    }

    // Método para encontrar um usuário pelo email
    public Optional<Costumer> findByEmail(String email) {
        return daoC.findAll().stream()
                .filter(costumer -> costumer.getEmail().equals(email))
                .findFirst();
    }

    // Método para encontrar um usuário pelo CPF
    public Optional<Costumer> findByCpf(String cpf) {
        return daoC.findAll().stream()
                .filter(costumer -> costumer.getCpf().equals(cpf))
                .findFirst();
    }
}
