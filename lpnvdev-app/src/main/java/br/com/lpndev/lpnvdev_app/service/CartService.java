package br.com.lpndev.lpnvdev_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.lpndev.lpnvdev_app.dao.ICart;
import br.com.lpndev.lpnvdev_app.model.Cart;

@Service
public class CartService {
    private final ICart daoCart;

    public CartService(ICart daoCart) {
        this.daoCart = daoCart;
    }

    public Cart saveCart(Cart cart) {
        return daoCart.save(cart);
    }

    private Cart alterCart(Cart cart) {
        return daoCart.save(cart);
    }

    public List<Cart> findAll() {
        return daoCart.findAll();
    }
    public Cart findById(Integer id) {
        return daoCart.findById(id).orElse(null);
    }
    public List<Cart> findByIdCliente(Integer id) {
        List<Cart> cartList = daoCart.findAll();
        List<Cart> defCart = new java.util.ArrayList<>();
        for (Cart cart : cartList) {
            if (cart.getId_cliente().getId().equals(id)) {
                defCart.add(cart);
            }
        }
        return defCart;
    }

    public void deleteCart(Integer id) {
        daoCart.deleteById(id);
    }
}
