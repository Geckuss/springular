import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { count } from 'rxjs';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(private formBuilder: FormBuilder, private formService: FormService) {
    this.checkoutFormGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shipping: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        region: [''],
        zipCode: ['']
      }),
      billing: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        region: [''],
        zipCode: ['']
      }),
      payment: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    })

    // Initialize credit card months & years
    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );


  }

  onYearChange() {
    const currentYear = new Date().getFullYear();
    const selectedYear = this.checkoutFormGroup.get('payment.expirationYear')?.value;
  
    let startMonth: number;
    if (selectedYear == currentYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
  
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  onSubmit() {
    console.log('Handling the submit button');
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billing'].setValue(this.checkoutFormGroup.controls['shipping'].value);
    } else {
      this.checkoutFormGroup.controls['billing'].reset();
    }
  }

}
