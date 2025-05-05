package br.com.lpndev.lpnvdev_app.dao;

import br.com.lpndev.lpnvdev_app.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderItem extends JpaRepository<OrderItem, Integer> {
}
