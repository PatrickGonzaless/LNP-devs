package br.com.lpndev.lpnvdev_app.dao;

import br.com.lpndev.lpnvdev_app.model.Costumer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICostumer extends JpaRepository<Costumer, Integer> {
}
