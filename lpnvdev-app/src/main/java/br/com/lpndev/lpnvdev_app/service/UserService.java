package br.com.lpndev.lpnvdev_app.service;

import br.com.lpndev.lpnvdev_app.dao.IUser;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private IUser dao;

    public UserService(IUser dao){
        this.dao = dao;
    }

}
