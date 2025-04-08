package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.ICostumer;
import br.com.lpndev.lpnvdev_app.model.Costumer;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class CostumerService {
    private final ICostumer daoC;

    public CostumerService(ICostumer daoC) {
        this.daoC = daoC;
    }

    public Costumer saveCostumer(Costumer costumer) {
        return daoC.save(costumer);
    }

    public Costumer alterCostumer(Costumer costumer) {
        return daoC.save(costumer);
    }

    public List<Costumer> findAll() {
        return daoC.findAll();
    }

    public Optional<Costumer> findById(Integer id) {
        return daoC.findById(id);
    }

    public void deleteCostumer(Integer id) {
        daoC.deleteById(id);
    }
}
