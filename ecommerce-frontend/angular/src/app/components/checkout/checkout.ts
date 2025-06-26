import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { count } from 'rxjs';
import { FormService } from '../../services/form-service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

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
        state: [''],
        zipCode: ['']
      }),
      billing: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
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

    // Initialize countries
    this.formService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    console.log(`Country Code: ${countryCode}, Country Name: ${countryName}`);
    console.log(`Form Group Name: ${formGroupName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {
        console.log(data);
        if (formGroupName == 'shipping') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        if (formGroup && formGroup.get('state')) {
          formGroup.get('state')!.setValue(data[0]);
        }
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
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billing'].reset();
      this.billingAddressStates = [];
    }
  }

}
