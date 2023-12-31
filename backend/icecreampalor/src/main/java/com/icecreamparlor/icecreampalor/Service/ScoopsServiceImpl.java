
package com.icecreamparlor.icecreampalor.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.icecreamparlor.icecreampalor.Entity.Scoops;
import com.icecreamparlor.icecreampalor.Exceptions.DuplicateDataError;
import com.icecreamparlor.icecreampalor.Exceptions.ResourceNotFound;
import com.icecreamparlor.icecreampalor.Repository.ScoopsRepo;

@Service
public class ScoopsServiceImpl implements ScoopsService {

	@Autowired
	private ScoopsRepo scoopsrepo;

	@Override
	public Scoops saveScoops(Scoops scoops) {
		try {
			System.out.println("scoops: " + scoops);
			// TODO Auto-generated method stub
			return scoopsrepo.save(scoops);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateDataError("icecream with same name exists");
		}

	}

	@Override
	public Scoops getScoops(int id) {
		Optional<Scoops> scoopsFromDB = scoopsrepo.findById(id);
		Scoops scoopsDb = scoopsFromDB.orElse(null);
		if (scoopsDb != null) {
			return scoopsDb;
		} else
			throw new ResourceNotFound("Ice cream Not found in database");
	}

	@Override
	public Scoops getScoopByTitle(String title) {
		Optional<Scoops> scoopsFromDB = scoopsrepo.findByTitle(title);
		if (scoopsFromDB.isPresent()) {
			Scoops scoop = scoopsFromDB.get();
			return scoop;

		} else {
			throw new ResourceNotFound("Ice cream not found");
		}

	}

	@Override
	public List<Scoops> getScoops() {
		return scoopsrepo.findAll();
	}

	@Override
	public String deleteScoops(int id) {
		try {
			getScoops(id);
			scoopsrepo.deleteById(id);
			return "Deleted";
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound("Cannot find scoops Id...");
		}

	}

	@Override
	public Scoops updateScoops(Scoops scoops) {

		try {
			Scoops scoopExist = getScoops(scoops.getScoopsId());
			return scoopsrepo.save(scoops);

		} catch (ResourceNotFound e) {
			throw new ResourceNotFound("Scoops Id not found!!");
		}
	}

	@Override
	public Scoops updateScoopStock(String title, Double stockOrdered) {
		Scoops scoop = getScoopByTitle(title);
		if (scoop == null) {
			return null;
		} else {
			Double existingStock = scoop.getAmount();
			if (existingStock >= stockOrdered) {
				scoop.setAmount(scoop.getAmount() - stockOrdered);
				return updateScoops(scoop);
			} else {
				throw new ResourceNotFound("Item out of Stock");
			}
		}
	}

}
