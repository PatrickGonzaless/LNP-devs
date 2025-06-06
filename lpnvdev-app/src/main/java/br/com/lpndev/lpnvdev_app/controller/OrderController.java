package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.DTO.DTOOrder;
import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Costumer;
import br.com.lpndev.lpnvdev_app.model.Order;
import br.com.lpndev.lpnvdev_app.model.Product;
import br.com.lpndev.lpnvdev_app.service.AdressService;
import br.com.lpndev.lpnvdev_app.service.CostumerService;
import br.com.lpndev.lpnvdev_app.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final AdressService adressService;

    public OrderController(OrderService orderService, AdressService adressService) {
        this.orderService = orderService;
        this.adressService = adressService;
    }

    @GetMapping
    public List<Order> orderList() {
        return orderService.findAll();// coloca um campo int no pedido pra ser LITERALMENTE os id's de cliente e
                                      // endereço
    }

    @GetMapping("/{id}")
    public Order orderListById(@PathVariable Integer id) {
        Order order = orderService.findById(id).get();
        return order;
    }

    @PostMapping
    public Order createOrder(@RequestBody DTOOrder DTOrder) {
        System.out.println(DTOrder.getAdressID());

        Costumer costumer = DTOrder.getCostumer();

        Optional<Adress> adress = adressService.findById(DTOrder.getAdressID());

        List<Product> produtos = DTOrder.getProdutos();

        Order order = new Order(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                DTOrder.getFormapagamento(), DTOrder.getValorfrete(), DTOrder.getValortotalpedido(),
                "aguardando pagamento", adress.get(), costumer, produtos);
        return orderService.saveOrder(order);
    }

    @Transactional
    @PutMapping
    public Order editOrder(@RequestBody Order order) {
        return orderService.alterOrder(order);
    }
}
