package br.com.lpndev.lpnvdev_app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lpndev.lpnvdev_app.model.Cart;

public interface ICart extends JpaRepository<Cart, Integer> {

}
