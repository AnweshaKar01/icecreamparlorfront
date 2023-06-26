package com.icecreamparlor.icecreampalor.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icecreamparlor.icecreampalor.Entity.Scoops;
import com.icecreamparlor.icecreampalor.Entity.UpdateStocksPOJO;
import com.icecreamparlor.icecreampalor.Exceptions.ResourceNotFound;
import com.icecreamparlor.icecreampalor.Service.ScoopsServiceImpl;

@RestController
@RequestMapping("/inventory")
public class ScoopController {
	@Autowired
	private ScoopsServiceImpl scoopsServiceImpl;

	@PostMapping("/addScoops")
	public Scoops postDetails(@RequestBody Scoops scoops) {
		return scoopsServiceImpl.saveScoops(scoops);

	}

	@GetMapping("/getScoops")
	public List<Scoops> getDetails() {
		return scoopsServiceImpl.getScoops();
	}

	@GetMapping("/getScoops/{id}")
	public Scoops getProductById(@PathVariable int id) {
		try {
			return scoopsServiceImpl.getScoops(id);
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}

	}

	@GetMapping("/getScoops/title/{title}")
	public Scoops getScoopsByTitle(@PathVariable String title) {
		try {
			return scoopsServiceImpl.getScoopByTitle(title);
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}
	}

	@PutMapping("/update/scoops")
	public Scoops updateProduct(@RequestBody Scoops scoops) {

		Scoops updatedflavour = scoopsServiceImpl.updateScoops(scoops);
		try {
			return updatedflavour;
		} catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());
		}
	}

	@PutMapping("/update/scoops-stocks")
	public ResponseEntity<Scoops> updateStocks(@RequestBody UpdateStocksPOJO update) {
		try {
			Scoops scoop = scoopsServiceImpl.updateScoopStock(update.getTitle(), update.getStockOrdered());
			return ResponseEntity.status(HttpStatus.OK).body(scoop);
		} catch (Exception ex) {
			throw ex;
		}
	}

	@DeleteMapping("/delete/scoops/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable int id) {
		try {
			scoopsServiceImpl.deleteScoops(id);
			return ResponseEntity.status(202).body("Item Deleted");
		}

		catch (ResourceNotFound e) {
			throw new ResourceNotFound(e.getMessage());

		}
	}

}
