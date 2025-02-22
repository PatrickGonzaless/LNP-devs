package br.com.lpndev.lpnvdev_app.dao;

import br.com.lpndev.lpnvdev_app.model.User;
import org.springframework.data.repository.CrudRepository;

public interface IUser extends CrudRepository<User, Integer> {
}
