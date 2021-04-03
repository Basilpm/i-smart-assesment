import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
        amount: ['', Validators.required],
        date: ['', Validators.required],
        paymentType: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.paymentForm.invalid) {
        return;
    }
  }
  get f() { return this.paymentForm.controls; }

}
