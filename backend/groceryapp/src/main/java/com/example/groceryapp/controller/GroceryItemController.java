package com.example.groceryapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.groceryapp.entity.GroceryItem;
import com.example.groceryapp.service.GroceryItemService;

@RestController
@RequestMapping("/api/grocery")
@CrossOrigin("*")
public class GroceryItemController {

	@Autowired
	private GroceryItemService groceryItemService;

	@GetMapping
	public List<GroceryItem> getAllItems() {
		return groceryItemService.getAllItems();
	}

	@PostMapping
	public GroceryItem addItem(@RequestBody GroceryItem item) {
		return groceryItemService.addItem(item);
	}

	@DeleteMapping("/{id}")
	public void deleteItem(@PathVariable long id) {
		groceryItemService.deleteItem(id);
	}

	@PutMapping("/{id}")
	public GroceryItem updateItem(@PathVariable long id, @RequestBody GroceryItem item) {
		return groceryItemService.updateItem(id, item);
	}

}