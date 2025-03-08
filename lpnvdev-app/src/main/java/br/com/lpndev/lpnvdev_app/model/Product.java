package br.com.lpndev.lpnvdev_app.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;

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

    @Column(name = "stats", nullable = true)
    private boolean stats;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImg> imagens;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCod() {
        return cod;
    }

    public void setCod(Integer cod) {
        this.cod = cod;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQtd() {
        return qtd;
    }

    public void setQtd(Integer qtd) {
        this.qtd = qtd;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public BigDecimal getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(BigDecimal avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<ProductImg> getImagens() {
        return imagens;
    }

    public void setImagens(List<ProductImg> imagens) {
        this.imagens = imagens;
    }

    public boolean isStats() {
        return stats;
    }

    public void setStats(boolean stats) {
        this.stats = stats;
    }
}
