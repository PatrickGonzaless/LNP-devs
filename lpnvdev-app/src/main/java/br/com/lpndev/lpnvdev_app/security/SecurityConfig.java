package br.com.lpndev.lpnvdev_app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF (caso necessário)
                .cors(cors -> {}) // Configuração de CORS
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/users").permitAll() // Permite acesso público ao endpoint "/users"
                        .anyRequest().authenticated() // Exige autenticação para outras requisições
                )
                .addFilterBefore(new SecurityFilter(), UsernamePasswordAuthenticationFilter.class); // Adiciona o filtro customizado antes do de autenticação padrão

        return http.build();
    }

    // Classe interna para o filtro de segurança personalizado
    public static class SecurityFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                throws ServletException, IOException {
            System.out.println("Requisição passando pelo filtro de segurança: " + request.getRequestURI());
            filterChain.doFilter(request, response);
        }
    }
}
