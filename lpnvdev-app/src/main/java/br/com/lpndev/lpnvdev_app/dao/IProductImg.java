package br.com.lpndev.lpnvdev_app.dao;

import br.com.lpndev.lpnvdev_app.model.ProductImg;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lpndev.lpnvdev_app.model.Product;

public interface IProductImg extends JpaRepository<ProductImg, Integer> {


}
