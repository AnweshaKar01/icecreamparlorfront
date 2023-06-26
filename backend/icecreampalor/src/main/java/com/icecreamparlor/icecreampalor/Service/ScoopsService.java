package com.icecreamparlor.icecreampalor.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icecreamparlor.icecreampalor.Entity.Scoops;
import com.icecreamparlor.icecreampalor.Repository.ScoopsRepo;

public interface ScoopsService {

	public Scoops saveScoops(Scoops scoops);

	public Scoops getScoops(int id);

	public List<Scoops> getScoops();

	public String deleteScoops(int id);

	Scoops updateScoops(Scoops scoops);

	Scoops getScoopByTitle(String title);

	Scoops updateScoopStock(String title, Double stockOrdered);
}
