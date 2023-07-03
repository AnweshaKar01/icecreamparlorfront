package com.transactions.transactions.scoops.service;

import java.util.List;

import com.transactions.transactions.dto.ScoopPOJO;

public interface ScoopHandlingInterface<T> {

    // post
    public T addScoop(ScoopPOJO scoop);

    // get all
    public List<T> getAllScoops();

    // getOneItem
    public T getAllScoopsOfSingleUser(int id);

}
