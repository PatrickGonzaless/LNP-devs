package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.dao.IUser;
import br.com.lpndev.lpnvdev_app.model.User;
import br.com.lpndev.lpnvdev_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUser dao;

    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<User> userList() {
        return (List<User>) dao.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        System.out.println("Recebendo usuário: " + user); // DEBUG
        return dao.save(user);
    }

    @PutMapping
    public User editUser(@RequestBody User user) {
        User newUser = dao.save(user);
        return newUser;
    }

    @DeleteMapping("/{id}")
    public Optional<User> deleteUser(@PathVariable Integer id) {
        Optional<User> user = dao.findById(id);
        dao.deleteById(id);
        return user;
    }

}
