package com.unifor.linkeep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unifor.linkeep.entity.Link;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findByUserId(String user_id);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE Link l SET l.name = :#{#link.name}, l.iconUrl = :#{#link.iconUrl} WHERE l.url = :#{#link.url}"
    )
    void updateByUrl(@Param("link") Link link);
}
