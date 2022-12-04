package com.unifor.linkeep.service;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifor.linkeep.entity.Link;
import com.unifor.linkeep.repository.LinkRepository;

@Service
public class LinkService{
    @Autowired
    LinkRepository linkRepository;

    public List<Link> getAll(){
        return linkRepository.findAll();
    }

    public List<Link> getAllByUser(String user_id){
        return linkRepository.findByUserId(user_id);
    }

    public void save(Link link){
        linkRepository.save(link);
    }

    public void delete(List<Link> links){
        linkRepository.deleteAll(links);
    }

    public void update(Link link){
        linkRepository.updateByUrl(link);
    }

}