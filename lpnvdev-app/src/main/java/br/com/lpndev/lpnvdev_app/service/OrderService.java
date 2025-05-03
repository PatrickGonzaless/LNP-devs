package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IOrder;
import br.com.lpndev.lpnvdev_app.model.Adress;
import br.com.lpndev.lpnvdev_app.model.Order;

import java.util.List;
import java.util.Optional;

public class OrderService {

    private final IOrder daoO;
    private final AdressService adressService;

    public OrderService(IOrder daoO, AdressService adressService) {
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

        // Cria nova instância de Order com os dados atualizados
        Order order2 = new Order(order.getDt_pedido(), order.getFormapagamento(),order.getValorfrete(),
                order.getValortotalpedido(),order.isStatuspedido(), adress);

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
