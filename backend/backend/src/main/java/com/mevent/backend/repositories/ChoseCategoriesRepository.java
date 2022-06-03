package com.mevent.backend.repositories;

import com.mevent.backend.models.ChosenCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoseCategoriesRepository extends JpaRepository<ChosenCategories, Long> {
    boolean existsByUserIdAndCategoryId(Long userId, Long categoryId);

    List<ChosenCategories> findAllByUserId(Long aLong);
}
