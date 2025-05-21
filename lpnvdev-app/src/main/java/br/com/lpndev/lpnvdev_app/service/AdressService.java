package br.com.lpndev.lpnvdev_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.lpndev.lpnvdev_app.dao.IAdress;
import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Costumer;

@Service
public class AdressService {

    private final IAdress daoE;

    public AdressService(IAdress daoE) {
        this.daoE = daoE;
    }

    public Adress saveAdress(Adress adress) {
        return daoE.save(adress);
    }

    @SuppressWarnings("null")
    public Adress alterAdress(Adress adress) {
        final CostumerService costumerService = null;
        // Obtenha o cliente com base no ID
        Costumer costumer = costumerService.findById(adress.getIdCostumer().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Crie o objeto Adress e associe o cliente
        Adress adress2 = new Adress(adress.getLogradouro(), adress.getCep(), adress.getBairro(),
                adress.getUf(), adress.getCidade(), adress.getNumero(), adress.getComplemento(),
                adress.isTipoEndereco(), adress.isPrincipal(), costumer);

        return daoE.save(adress2);
    }

    public List<Adress> findAll() {
        return daoE.findAll();
    }

    public Optional<Adress> findById(Integer id) {
        return daoE.findById(id);
    }

    public void deleteAdress(Integer id) {
        daoE.deleteById(id);
    }
}
