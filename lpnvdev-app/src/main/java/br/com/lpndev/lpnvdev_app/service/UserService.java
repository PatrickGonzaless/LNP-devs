package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IUser;
import br.com.lpndev.lpnvdev_app.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private IUser dao;
    private PasswordEncoder passwordEncoder;

    public UserService(IUser dao){
        this.dao = dao;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<User> listUser(){
        List<User> list = dao.findAll();
        return list;
    }

    public User createUser(User user){
        String encoder = this.passwordEncoder.encode(user.getSenha());
        user.setSenha(encoder);
        User newUser = dao.save(user);
        return newUser;
    }

    public User editUser(User user){
        String encoder = this.passwordEncoder.encode(user.getSenha());
        user.setSenha(encoder);
        User newUser = dao.save(user);
        return newUser;
    }

    public Boolean deleteUser(Integer id){
        dao.deleteById(id);
        return true;
    }


    public Boolean validatePassword(User user) {
        String password = dao.getReferenceById(user.getId()).getSenha();
        Boolean valid = passwordEncoder.matches(user.getSenha(), password);
        return valid;
    }
}
