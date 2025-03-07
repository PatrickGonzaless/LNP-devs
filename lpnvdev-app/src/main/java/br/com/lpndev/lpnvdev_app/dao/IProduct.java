package br.com.lpndev.lpnvdev_app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lpndev.lpnvdev_app.model.Product;

public interface IProduct extends JpaRepository<Product, Integer> {

}
