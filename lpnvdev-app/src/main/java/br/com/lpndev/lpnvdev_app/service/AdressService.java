package br.com.lpndev.lpnvdev_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.lpndev.lpnvdev_app.dao.IAdress;
import br.com.lpndev.lpnvdev_app.model.Adress;

@Service
public class AdressService {

    private final IAdress daoE;

    public AdressService(IAdress daoE) {
        this.daoE = daoE;
    }

    public Adress saveAdress(Adress adress) {
        return daoE.save(adress);
    }

    public Adress alterAdress(Adress adress) {
        return daoE.save(adress);
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
