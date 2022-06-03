package com.mevent.backend.services;

import com.mevent.backend.models.Category;
import java.util.List;

public interface AppService {

    abstract List<Category> getCategories();
}
