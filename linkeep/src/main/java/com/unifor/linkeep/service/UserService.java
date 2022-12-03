package com.unifor.linkeep.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifor.linkeep.entity.User;
import com.unifor.linkeep.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findByName(User user){
        return userRepository.findByName(user.getName());
    }

    public void save(User user){
        userRepository.save(user);
    }
}
