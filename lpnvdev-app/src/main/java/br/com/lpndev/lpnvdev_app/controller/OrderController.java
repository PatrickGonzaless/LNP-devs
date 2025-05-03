package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.Order;
import br.com.lpndev.lpnvdev_app.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> orderList() {
        return orderService.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> createOrder(@RequestBody Order DTOrder) {
        return ResponseEntity.ok(DTOrder);
    }

    @Transactional
    @PutMapping
    public Order editOrder(@RequestBody Order order) {
        return orderService.alterOrder(order);
    }
}
