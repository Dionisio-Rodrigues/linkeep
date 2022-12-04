package com.unifor.linkeep.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifor.linkeep.entity.Link;
import com.unifor.linkeep.entity.User;
import com.unifor.linkeep.repository.LinkRepository;

@Service
public class LinkService{
    @Autowired
    LinkRepository linkRepository;

    public Iterable<Link> getAll(){
        return linkRepository.findAll();
    }

    public List<Link> getAllByUser(User user){
        return linkRepository.findByUser(user);
    }

    public void save(Link link){
        linkRepository.save(link);
    }

    public void delete(Link link){
        linkRepository.delete(link);
    }
}