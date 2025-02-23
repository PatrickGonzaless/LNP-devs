package br.com.lpndev.lpnvdev_app.controller;

import br.com.lpndev.lpnvdev_app.dao.IUser;
import br.com.lpndev.lpnvdev_app.model.User;
import br.com.lpndev.lpnvdev_app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController (UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> userList(){
        return ResponseEntity.status(200).body(userService.listUser());
    }

    @PostMapping
    public ResponseEntity <User> createUser (@Valid @RequestBody User user){
        return ResponseEntity.status(201).body(userService.createUser(user));
    }


    @PutMapping
    public ResponseEntity <User> editUser (@Valid @RequestBody User user){
        return ResponseEntity.status(200).body(userService.editUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser (@PathVariable Integer id){
        userService.deleteUser(id);
        return ResponseEntity.status(204).build();
    }

    @PostMapping("/login")
    public ResponseEntity<User> validadePassword(@Valid @RequestBody User user){
        Boolean valid = userService.validatePassword(user);
        if (!valid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(200).build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex){
        Map <String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) ->{
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

}
