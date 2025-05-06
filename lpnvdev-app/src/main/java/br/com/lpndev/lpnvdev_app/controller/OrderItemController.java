package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.OrderItem;
import br.com.lpndev.lpnvdev_app.service.OrderItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/orderitem")
public class OrderItemController {
    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public List<OrderItem> orderItemList() {
        return orderItemService.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> createOrderItem(@RequestBody OrderItem DTOrderItem) {
        return ResponseEntity.ok(DTOrderItem);
    }

    @Transactional
    @PutMapping
    public OrderItem editOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.alterOrderItem(orderItem);
    }
}
