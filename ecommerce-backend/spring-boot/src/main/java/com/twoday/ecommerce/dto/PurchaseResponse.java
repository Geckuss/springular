package com.twoday.ecommerce.dto;

import com.twoday.ecommerce.entity.Address;
import com.twoday.ecommerce.entity.Customer;
import com.twoday.ecommerce.entity.Order;
import com.twoday.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class PurchaseResponse {

    private final String orderTrackingNumber;

}
