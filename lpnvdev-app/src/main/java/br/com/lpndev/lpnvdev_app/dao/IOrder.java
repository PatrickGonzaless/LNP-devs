package br.com.lpndev.lpnvdev_app.dao;

import br.com.lpndev.lpnvdev_app.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrder extends JpaRepository<Order, Integer> {
}
