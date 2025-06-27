package com.twoday.ecommerce.service;

import com.twoday.ecommerce.dao.CustomerRepository;
import com.twoday.ecommerce.dto.Purchase;
import com.twoday.ecommerce.dto.PurchaseResponse;
import com.twoday.ecommerce.entity.Customer;
import com.twoday.ecommerce.entity.Order;
import com.twoday.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // Retrieve the order from the purchase object
        Order order = purchase.getOrder();

        // Generate a unique tracking number for the order
        String orderTrackingNumber = generateOrderTrackingNumber();

        // Set the tracking number to the order
        order.setOrderTrackingNumber(orderTrackingNumber);

        // Populate the order with orderItems
        Set<OrderItem> orderItems = order.getOrderItems();
        orderItems.forEach(order::add);

        // Set the addresses in the order
        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());

        // Set the customer in the order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // Save the customer and order to the database
        customerRepository.save(customer);

        // Return a response with the tracking number
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }

}
