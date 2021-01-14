package com.devsuperior.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.CategoryDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		
		List<Category> list = categoryRepository.findAll(); 
		
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		
		Optional<Category> optional = categoryRepository.findById(id);  
		Category category = optional.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		
		return new CategoryDTO(category);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO categoryDTO) {
		
		Category category = new Category();
		category.setName(categoryDTO.getName());
		
		category = categoryRepository.save(category);
		
		return new CategoryDTO(category);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
		
		try {
			
			// Usa-se o getOne para criar um objeto provisório para atualizar um registro(s)
			Category category = categoryRepository.getOne(id);

			category.setName(categoryDTO.getName());
			category = categoryRepository.save(category);
			
			return new CategoryDTO(category);
			
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
}
