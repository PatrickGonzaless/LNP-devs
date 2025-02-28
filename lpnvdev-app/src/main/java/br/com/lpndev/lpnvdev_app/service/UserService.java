package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IUser;
import br.com.lpndev.lpnvdev_app.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final IUser dao;
    private final PasswordEncoder passwordEncoder;

    public UserService(IUser dao, PasswordEncoder passwordEncoder) {
        this.dao = dao;
        this.passwordEncoder = passwordEncoder;
    }

    // Método para salvar um usuário, criptografando a senha
    public User saveUser(User user) {
        if (user.getSenha() != null && !user.getSenha().isEmpty()) {
            user.setSenha(passwordEncoder.encode(user.getSenha())); // Encriptando a senha
        }
        return dao.save(user);
    }

    // Método para buscar todos os usuários
    public List<User> findAll() {
        return dao.findAll();
    }

    // Método para buscar usuário por ID
    public Optional<User> findById(Integer id) {
        return dao.findById(id);
    }

    // Método para deletar usuário por ID
    public void deleteUser(Integer id) {
        dao.deleteById(id);
    }

    // Método para verificar a senha de um usuário
    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getSenha()); // Verifica se a senha criptografada bate
    }

    // Método para encontrar um usuário pelo email
    public Optional<User> findByEmail(String email) {
        return dao.findAll().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }
}
