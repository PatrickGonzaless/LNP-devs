package br.com.lpndev.lpnvdev_app.controller;

import java.util.List;
import br.com.lpndev.lpnvdev_app.service.CartService;
import org.springframework.web.bind.annotation.*;
import br.com.lpndev.lpnvdev_app.model.Cart;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<Cart> cartList() {
        return cartService.findAll();
    }

    @GetMapping("/{id}")
    public List<Cart> cartByIdCliente(@PathVariable Integer id) {
        return cartService.findByIdCliente(id);
    }

    @PostMapping
    public Cart createCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }

    @PutMapping
    public Cart editCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }

    @DeleteMapping
    public void deleteCart() {
        List<Cart> carts = cartService.findAll();

        if (carts.isEmpty()) {
            return; // or throw an exception if preferred
        }

        carts.forEach(cart -> cartService.deleteCart(cart.getId_carrinho()));
    }

    @DeleteMapping("/{id}")
    public List<Cart> deleteAllCart(@PathVariable Integer id) {
        List<Cart> cart = cartService.findAll();
        for (Cart c : cart) {
            if (c.getId_cliente().getId() == id) {
                cartService.deleteCart(c.getId_carrinho());
            }
        }
        cartService.deleteCart(id);
        return cart;
    }
}
