import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { count } from 'rxjs';
import { FormService } from '../../services/form-service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Validators as validators } from '../../validators/validators';

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
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      }),
      shipping: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
      }),
      billing: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
      }),
      payment: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), validators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
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

  get firstName() {return this.checkoutFormGroup.get('customer.firstName') as FormControl;}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName') as FormControl;}
  get email() {return this.checkoutFormGroup.get('customer.email') as FormControl;}

  get shippingStreet() {return this.checkoutFormGroup.get('shipping.street') as FormControl;}
  get shippingCity() {return this.checkoutFormGroup.get('shipping.city') as FormControl;}
  get shippingZipCode() {return this.checkoutFormGroup.get('shipping.zipCode') as FormControl;}
  get shippingState() {return this.checkoutFormGroup.get('shipping.state') as FormControl;}
  get shippingCountry() {return this.checkoutFormGroup.get('shipping.country') as FormControl;}

  get billingStreet() {return this.checkoutFormGroup.get('billing.street') as FormControl;}
  get billingCity() {return this.checkoutFormGroup.get('billing.city') as FormControl;}
  get billingZipCode() {return this.checkoutFormGroup.get('billing.zipCode') as FormControl;}
  get billingState() {return this.checkoutFormGroup.get('billing.state') as FormControl;}
  get billingCountry() {return this.checkoutFormGroup.get('billing.country') as FormControl;}

  get cardType() {return this.checkoutFormGroup.get('payment.cardType') as FormControl;}
  get nameOnCard() {return this.checkoutFormGroup.get('payment.nameOnCard') as FormControl;}
  get cardNumber() {return this.checkoutFormGroup.get('payment.cardNumber') as FormControl;}
  get securityCode() {return this.checkoutFormGroup.get('payment.securityCode') as FormControl;}
  get expirationMonth() {return this.checkoutFormGroup.get('payment.expirationMonth') as FormControl;}
  get expirationYear() {return this.checkoutFormGroup.get('payment.expirationYear') as FormControl;}

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
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
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
