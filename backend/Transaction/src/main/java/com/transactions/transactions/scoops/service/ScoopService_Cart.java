package com.transactions.transactions.scoops.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.transactions.transactions.Exception.InvalidRequest;
import com.transactions.transactions.Exception.ResourceNotFound;
import com.transactions.transactions.dto.ScoopsFromInventoryPOJO;
import com.transactions.transactions.dto.Scoops_CartPOJO;
import com.transactions.transactions.scoops.entity.Scoops_Cart;
import com.transactions.transactions.scoops.repository.Scoops_CartRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoopService_Cart implements ScoopHandlingInterface<Scoops_Cart> {
    private final RestTemplate restTemplate;
    private final Scoops_CartRepo scoops_cartRepo;

    @Override
    public Scoops_Cart addScoop(Scoops_Cart scoop) {
        return scoops_cartRepo.save(scoop);
    }

    @Override
    public List<Scoops_Cart> getAllScoops() {
        return scoops_cartRepo.findAll();
    }

    @Override
    public Scoops_Cart getAllScoopsOfSingleUser(Integer id) {
        return null;
    }

    public Scoops_Cart getScoopsById(Integer scoopId) {
        return scoops_cartRepo.findById(scoopId).orElse(null);
    }

    public Optional<ScoopsFromInventoryPOJO> getScoopsFromInventory(Scoops_CartPOJO scoop) {
        try {
            ScoopsFromInventoryPOJO optional_inventoryScoop = restTemplate.getForObject(
                    "http://ICECREAMPARLOR/inventory/getScoops/title/" + scoop.scoopName(),
                    ScoopsFromInventoryPOJO.class);
            return Optional.ofNullable(optional_inventoryScoop);
        } catch (RestClientException ex) {
            throw new InvalidRequest("The request to inventory returned an error");
        }

    }

    public String deleteScoopFromCart(Integer itemId) {
        try {

            Optional<Scoops_Cart> scoop = scoops_cartRepo.findById(itemId);
            // log.error("clearing scoop: {}", scoop.get());
            if (scoop.isPresent()) {
                scoops_cartRepo.deleteById(itemId);
                return "deleted";
            } else {
                throw new ResourceNotFound("Item with given id is not found");
            }

        } catch (ResourceNotFound e) {
            throw e;
        }
    }

    public String deleteAllScoopsOfACart(List<Scoops_Cart> allScoops) {
        try {
            allScoops.parallelStream().forEach(s -> {
                scoops_cartRepo.deleteById(s.getScoopsId());
            });
            return "All scoops deleted";
        } catch (Exception ex) {
            throw ex;
        }
    }

}
