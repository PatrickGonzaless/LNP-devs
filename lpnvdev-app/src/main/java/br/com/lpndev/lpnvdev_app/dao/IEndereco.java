package br.com.lpndev.lpnvdev_app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.lpndev.lpnvdev_app.model.Endereco;

public interface IEndereco extends JpaRepository<Endereco, Integer> {

}
