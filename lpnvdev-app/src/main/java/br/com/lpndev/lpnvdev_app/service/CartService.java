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
        List<Cart> cartList = daoCart.findAll();
        for (Cart cart : cartList) {
            if (cart.getId_cliente().equals(id)) {
                return cart;
            }
        }
        return null;
    }

    public void deleteCart(Integer id) {
        daoCart.deleteById(id);
    }
}
