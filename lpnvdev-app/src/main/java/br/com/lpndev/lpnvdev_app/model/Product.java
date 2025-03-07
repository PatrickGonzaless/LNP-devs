package br.com.lpndev.lpnvdev_app.model;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "cod", nullable = true, unique = true)
    private Integer cod;

    @Column(name = "nome", length = 200, nullable = true)
    private String nome;

    @Column(name = "qtd", nullable = true)
    private Integer qtd;

    @Column(name = "valor", precision = 10, scale = 2, nullable = true)
    private BigDecimal valor;

    @Column(name = "avaliacao", precision = 2, scale = 1)
    private BigDecimal avaliacao;

    @Column(name = "descricao", length = 2000)
    private String descricao;
}
