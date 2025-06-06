package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IOrder;
import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Costumer;
import br.com.lpndev.lpnvdev_app.model.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final IOrder daoO;
    private final AdressService adressService;
    private final CostumerService costumerService;

    public OrderService(IOrder daoO, AdressService adressService, CostumerService costumerService) {
        this.costumerService = costumerService;
        this.daoO = daoO;
        this.adressService = adressService;
    }

    public Order saveOrder(Order order) {
        return daoO.save(order);
    }

    public Order alterOrder(Order order) {
        // Busca o endereço pelo ID
        Adress adress = adressService.findById(order.getIdAdress().getId())
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        Costumer costumer = costumerService.findById(order.getIdCostumer().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Cria nova instância de Order com os dados atualizados
        Order order2 = new Order(order.getDt_pedido(), order.getFormapagamento(), order.getValorfrete(),
                order.getValortotalpedido(), order.isStatuspedido(), adress, costumer, order.getProdutos());

        return daoO.save(order2);
    }

    public List<Order> findAll() {
        return daoO.findAll();
    }

    public Optional<Order> findById(Integer id) {
        return daoO.findById(id);
    }

    public void deleteOrder(Integer id) {
        daoO.deleteById(id);
    }
}
