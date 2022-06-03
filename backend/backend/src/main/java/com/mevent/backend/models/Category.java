package com.mevent.backend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Table(
        name= "category",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "categoryName")
        })
public class Category {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long categoryId;

    @NotBlank
    @Size(max = 20)
    private String categoryName;

    public Category(@NotBlank @Size(max = 20) String categoryName) {
        this.categoryName = categoryName;
    }
}
