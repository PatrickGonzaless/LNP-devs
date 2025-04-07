package br.com.lpndev.lpnvdev_app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.lpndev.lpnvdev_app.dao.IEndereco;
import br.com.lpndev.lpnvdev_app.model.Endereco;

@Service
public class EnderecoService {

    private final IEndereco daoE;

    public EnderecoService(IEndereco daoE) {
        this.daoE = daoE;
    }

    public Endereco saveEndereco(Endereco endereco) {
        return daoE.save(endereco);
    }

    public Endereco alterEndereco(Endereco endereco) {
        return daoE.save(endereco);
    }

    public List<Endereco> findAll() {
        return daoE.findAll();
    }

    public Optional<Endereco> findById(Integer id) {
        return daoE.findById(id);
    }

    public void deleteEndereco(Integer id) {
        daoE.deleteById(id);
    }
}
