package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IOrderItem;
import br.com.lpndev.lpnvdev_app.model.Order;
import br.com.lpndev.lpnvdev_app.model.OrderItem;
import br.com.lpndev.lpnvdev_app.model.Product;
import br.com.lpndev.lpnvdev_app.model.ProductImg;

import java.util.List;
import java.util.Optional;

public class OrderItemService {

    private final IOrderItem orderItemDao;
    private final OrderService orderService;
    private final ProductService productService;
    private final ProductImgService productImgService;

    public OrderItemService(
            IOrderItem orderItemDao,
            OrderService orderService,
            ProductService productService,
            ProductImgService productImgService
    ) {
        this.orderItemDao = orderItemDao;
        this.orderService = orderService;
        this.productService = productService;
        this.productImgService = productImgService;
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
        return orderItemDao.save(orderItem);
    }

    public OrderItem alterOrderItem(OrderItem item) {
        OrderItem existing = orderItemDao.findById(item.getId())
                .orElseThrow(() -> new RuntimeException("Item de pedido não encontrado"));

        existing.setQtdproduto(item.getQtdproduto());
        existing.setValorunit(item.getValorunit());
        existing.setSubtotal(item.getSubtotal());

        Order order = orderService.findById(item.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        Product produto = productService.findById(item.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        ProductImg img = productImgService.findById(item.getProdimg().getIdImg())
                .orElseThrow(() -> new RuntimeException("Imagem não encontrada"));

        existing.setOrder(order);
        existing.setProduct(produto);
        existing.setProdimg(img);

        return orderItemDao.save(existing);
    }

    public List<OrderItem> findAll() {
        return orderItemDao.findAll();
    }

    public Optional<OrderItem> findById(Integer id) {
        return orderItemDao.findById(id);
    }

    public void deleteOrderItem(Integer id) {
        orderItemDao.deleteById(id);
    }
}
