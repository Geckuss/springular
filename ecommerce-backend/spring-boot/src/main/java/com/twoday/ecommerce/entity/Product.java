package com.twoday.ecommerce.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column(name="sku")
    private String sku;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="active")
    private Boolean active;

    @Column(name="units_in_stock")
    private int unitsInStock;

    @Column(name="date_created")
    @CreationTimestamp
    private Date createdAt;

    @Column(name="last_updated")
    @UpdateTimestamp
    private Date modifiedAt;

}
