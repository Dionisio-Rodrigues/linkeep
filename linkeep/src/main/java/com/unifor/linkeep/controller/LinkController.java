package com.unifor.linkeep.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unifor.linkeep.entity.Link;
import com.unifor.linkeep.service.LinkService;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/links")
public class LinkController {
    @Autowired
    LinkService linkService;

    @GetMapping("/list/{userId}")
    public List<Link> listLinkByUser(@PathVariable("userId") String userId){
        return linkService.getAllByUser(userId);
    }

    @PostMapping("/save")
    public void saveLink(@RequestBody Link link) {
        linkService.save(link);
    }

    @DeleteMapping("/delete")
    public void deleteLink(@RequestBody Link link){
        linkService.delete(link);
    }

    @PutMapping("/update")
    public void updateLink(@RequestBody Link link){
        linkService.update(link);
    }

}
