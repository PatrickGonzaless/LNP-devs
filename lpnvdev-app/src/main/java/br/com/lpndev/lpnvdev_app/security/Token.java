package br.com.lpndev.lpnvdev_app.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Token {
    private String token;

    public Token(String token) {
        super();
        this.token = token;
    }
}
