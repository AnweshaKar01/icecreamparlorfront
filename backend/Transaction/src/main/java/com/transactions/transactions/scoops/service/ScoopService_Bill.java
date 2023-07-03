package com.transactions.transactions.scoops.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.transactions.transactions.scoops.entity.Scoops_Bill;
import com.transactions.transactions.scoops.repository.Scoops_BillRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScoopService_Bill implements ScoopHandlingInterface<Scoops_Bill> {
    private final Scoops_BillRepo scoops_BillRepo;

    @Override
    public Scoops_Bill addScoop(Scoops_Bill scoop) {
        return scoops_BillRepo.save(scoop);
    }

    @Override
    public List<Scoops_Bill> getAllScoops() {
        return scoops_BillRepo.findAll();
    }

    @Override
    public Scoops_Bill getAllScoopsOfSingleUser(Integer id) {
        return null;
    }

}
