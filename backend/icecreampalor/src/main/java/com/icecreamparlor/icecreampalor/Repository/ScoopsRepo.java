package com.icecreamparlor.icecreampalor.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.icecreamparlor.icecreampalor.Entity.Scoops;

public interface ScoopsRepo extends JpaRepository<Scoops, Integer> {
	@Query(value = "select * from scoops_db where title=?1", nativeQuery = true)
	Optional<Scoops> findByTitle(String title);

}
