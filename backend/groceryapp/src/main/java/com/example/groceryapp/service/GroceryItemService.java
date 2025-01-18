package com.example.groceryapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.groceryapp.entity.GroceryItem;
import com.example.groceryapp.repository.GroceryItemRepository;

@Service
public class GroceryItemService {

	@Autowired
	private GroceryItemRepository groceryItemRepository;

	public List<GroceryItem> getAllItems() {
		return groceryItemRepository.findAll();
	}

	public GroceryItem addItem(GroceryItem item) {
		return groceryItemRepository.save(item);
	}

	public void deleteItem(long id) {
		groceryItemRepository.deleteById(id);
	}

	public GroceryItem updateItem(long id, GroceryItem item) {
		Optional<GroceryItem> existingItem = groceryItemRepository.findById(id);
		if (existingItem.isPresent()) {
			GroceryItem updateItem = existingItem.get();
			updateItem.setName(item.getName());
			updateItem.setQuantity(item.getQuantity());
			return groceryItemRepository.save(updateItem);
		}
		return null;

	}

}
