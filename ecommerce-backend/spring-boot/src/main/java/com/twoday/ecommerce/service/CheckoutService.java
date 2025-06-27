package com.twoday.ecommerce.service;

import com.twoday.ecommerce.dto.Purchase;
import com.twoday.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
