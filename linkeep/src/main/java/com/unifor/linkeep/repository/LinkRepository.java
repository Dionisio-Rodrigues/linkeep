package com.unifor.linkeep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.unifor.linkeep.entity.Link;
import com.unifor.linkeep.entity.User;

@Repository
public interface LinkRepository extends CrudRepository<Link, Long> {
//    List<Link> findByUser(User user);
}
