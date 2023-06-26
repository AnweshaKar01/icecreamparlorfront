package com.icecreamparlor.icecreampalor.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.icecreamparlor.icecreampalor.Entity.Scoops;
import com.icecreamparlor.icecreampalor.Exceptions.ResourceNotFound;
import com.icecreamparlor.icecreampalor.Repository.ScoopsRepo;

@SpringBootTest
public class IcecreamParlorServiceTest {
	@Mock
	private ScoopsRepo scoopsrepo;
	@InjectMocks
	private ScoopsServiceImpl scoopsServiceImpl;

	@Test
	public void saveScoopsTest() {
		Scoops newscoop = new Scoops();
		newscoop.setTitle("Vanilla");
		newscoop.setPrice(50.0);
		newscoop.setAmount(1000.0);
		Scoops savedscoop = new Scoops(1, newscoop.getTitle(), newscoop.getPrice(), newscoop.getAmount());
		when(scoopsrepo.save(newscoop)).thenReturn(savedscoop);
		assertEquals(scoopsServiceImpl.saveScoops(newscoop), savedscoop);
	}

	@Test
	public void getScoopsTest() {
		int id = 10;
		Scoops newscoop = new Scoops(id, "Vanilla", 50.0, 1000.0);
		when(scoopsrepo.findById(id)).thenReturn(Optional.of(newscoop));
		assertEquals(scoopsServiceImpl.getScoops(id), newscoop);

	}

	@Test
	public void getScoopsByTitleTest() {
		String title = "Vanilla";
		Scoops newscoop = new Scoops(1, title, 50.0, 1000.0);
		when(scoopsrepo.findByTitle(title)).thenReturn(Optional.of(newscoop));
		assertEquals(scoopsServiceImpl.getScoopByTitle(title), newscoop);
	}

	@Test
	public void getScoopsByTitleExceptionTest() {
		String title = null;
		Scoops newscoop = new Scoops(1, title, 50.0, 1000.0);
		when(scoopsrepo.findByTitle(title)).thenReturn(Optional.empty());
		Exception ex = assertThrows(ResourceNotFound.class, () -> scoopsServiceImpl.getScoopByTitle(title));
		String expectedMsg = "Ice cream not found";
		String actualMsg = ex.getMessage();
		assertTrue(actualMsg.equals(expectedMsg));
	}
}
