package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.model.User;
import br.com.lpndev.lpnvdev_app.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> userList() {
        return userService.findAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> foundUser = userService.findByEmail(user.getEmail());

        if (foundUser.isPresent()) {
            User existingUser = foundUser.get();

            if (existingUser.isStats()) {
                if (userService.checkPassword(existingUser, user.getSenha())) {
                    return "Login successful";
                } else {
                    return "Senha incorreta";
                }
            } else {
                return "Usuário desativado";
            }
        }
        return "Usuário não encontrado";
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping
    public User editUser(@RequestBody User user) {
        return userService.alterUser(user);
    }

    @DeleteMapping("/{id}")
    public Optional<User> deleteUser(@PathVariable Integer id) {
        Optional<User> user = userService.findById(id);
        userService.deleteUser(id);
        return user;
    }
}
