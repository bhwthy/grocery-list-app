package com.example.groceryapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.groceryapp.dto.GroceryItemDTO;
import com.example.groceryapp.entity.GroceryItem;
import com.example.groceryapp.repository.GroceryItemRepository;

@Service
public class GroceryItemService {

	@Autowired
	private GroceryItemRepository groceryItemRepository;

	public List<GroceryItem> getAllItems() {
		return groceryItemRepository.findAll();
	}

//	public GroceryItem addItem(GroceryItem item) {
//		return groceryItemRepository.save(item);
//	}

	public void deleteItem(long id) {
		groceryItemRepository.deleteById(id);
	}

//	public GroceryItem updateItem(long id, GroceryItem item) {
//		Optional<GroceryItem> existingItem = groceryItemRepository.findById(id);
//		if (existingItem.isPresent()) {
//			GroceryItem updateItem = existingItem.get();
//			updateItem.setName(item.getName());
//			updateItem.setQuantity(item.getQuantity());
//			return groceryItemRepository.save(updateItem);
//		}
//		return null;
//
//	}
	
	public Page<GroceryItem> getAllItems(int page, int size){
		PageRequest pageable = PageRequest.of(page, size);
		return groceryItemRepository.findAll(pageable);
	}
	
	public GroceryItem addItem(GroceryItemDTO itemDTO) {
	    GroceryItem item = new GroceryItem(itemDTO.getName(), itemDTO.getQuantity());
	    return groceryItemRepository.save(item);
	}

	public GroceryItem updateItem(Long id, GroceryItemDTO itemDTO) {
	    Optional<GroceryItem> existingItem = groceryItemRepository.findById(id);
	    if (existingItem.isPresent()) {
	        GroceryItem item = existingItem.get();
	        item.setName(itemDTO.getName());
	        item.setQuantity(itemDTO.getQuantity());
	        return groceryItemRepository.save(item);
	    }
	    return null;
	}
	
	public List<GroceryItem> searchItems(String keyword) {
	    return groceryItemRepository.searchByName(keyword);
	}

}
