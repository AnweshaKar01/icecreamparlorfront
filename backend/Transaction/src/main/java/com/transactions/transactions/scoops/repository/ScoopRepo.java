package com.transactions.transactions.scoops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transactions.transactions.scoops.entity.Scoops;

public interface ScoopRepo extends JpaRepository<Scoops, Integer> {
}
