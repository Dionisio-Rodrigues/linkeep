package com.unifor.linkeep.controller;

import org.springframework.web.bind.annotation.RestController;

import com.unifor.linkeep.entity.Link;
import com.unifor.linkeep.entity.User;
import com.unifor.linkeep.service.LinkService;
import com.unifor.linkeep.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class LinkController {
    @Autowired
    LinkService linkService;

    @Autowired
    UserService userService;

    @GetMapping("/getAllUser")
    public List<User> getAllUser(){
        return userService.findAll();
    }

//    @GetMapping("/getLinkByUser")
//    public List<Link> getLinkByUser(){
//        User usr = new User();
//        usr.setName("Dionisio");
//        usr.setId(1L);
//        usr.setEmail("d.rodriguesmaianeto@gmail.com");
//        return linkService.getAllByUser(usr);
//    }

    @GetMapping("/getAllLinks")
    public Iterable<Link> getAllLink(){
        return linkService.getAll();
    }

    @PostMapping("/test")
    public void saveUser(){
        User usr = new User();
        usr.setName("Farofa13");
        usr.setEmail("farofa123@gmail.com");
        userService.save(usr);
    }
}
