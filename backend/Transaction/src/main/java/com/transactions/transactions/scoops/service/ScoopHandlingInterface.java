package com.transactions.transactions.scoops.service;

import java.util.List;

public interface ScoopHandlingInterface<T> {

    // post
    public T addScoop(T scoop);

    // get all
    public List<T> getAllScoops();

    // getOneItem
    public T getAllScoopsOfSingleUser(Integer id);

}
