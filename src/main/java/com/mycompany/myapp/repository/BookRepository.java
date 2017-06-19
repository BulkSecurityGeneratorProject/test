package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Book;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Book entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
   
	@Query("SELECT p FROM Book p WHERE p.priice = :priice")
	Book getAllBooksWithPricesHigherThen(@Param("priice") double priice);
	
	@Query("SELECT p FROM Book p WHERE p.priice =8")
	Book getBookPriceis();
	
	@Query("SELECT DISTINCT count(id) AS total FROM Book")
	Integer getTotalBooks();
	
	@Query("SELECT DISTINCT sum(priice)AS total FROM Book")
	Integer getTotalPrice();

	

	
	
	
}
