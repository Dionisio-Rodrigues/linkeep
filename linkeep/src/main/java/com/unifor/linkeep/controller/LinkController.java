package com.unifor.linkeep.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class LinkController {
    @GetMapping("/teste")
    public String helloWorld(){
        return "Hello World";
    }
}
