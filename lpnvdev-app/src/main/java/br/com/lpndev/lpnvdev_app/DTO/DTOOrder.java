package br.com.lpndev.lpnvdev_app.DTO;

public class DTOOrder {
     private Integer adressID;
     private String dtpedido;
     private Integer formapagamento;
     private Integer valorfrete;
     private Integer valortotalpedido;
     private boolean statuspedido;

    public Integer getAdressID() {
        return adressID;
    }

    public void setAdressID(Integer adressID) {
        this.adressID = adressID;
    }

    public String getDtpedido() {
        return dtpedido;
    }

    public void setDtpedido(String dtpedido) {
        this.dtpedido = dtpedido;
    }

    public Integer getFormapagamento() {
        return formapagamento;
    }

    public void setFormapagamento(Integer formapagamento) {
        this.formapagamento = formapagamento;
    }

    public Integer getValortotalpedido() {
        return valortotalpedido;
    }

    public void setValortotalpedido(Integer valortotalpedido) {
        this.valortotalpedido = valortotalpedido;
    }

    public Integer getValorfrete() {
        return valorfrete;
    }

    public void setValorfrete(Integer valorfrete) {
        this.valorfrete = valorfrete;
    }

    public boolean isStatuspedido() {
        return statuspedido;
    }

    public void setStatuspedido(boolean statuspedido) {
        this.statuspedido = statuspedido;
    }
}
