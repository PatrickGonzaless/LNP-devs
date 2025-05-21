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

    @PostMapping
    public Cart createCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }
    @PostMapping
    public Cart editCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }
    @DeleteMapping
    public Cart deleteCart(@PathVariable Integer id) {
        Cart cart = cartService.findById(id);
        cartService.deleteCart(id);
        return cart;
    }
}
