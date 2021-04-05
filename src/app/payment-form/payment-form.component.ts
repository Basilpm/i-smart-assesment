import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { APICallerService } from '../service/apicaller.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  submitted: boolean = false;
  maxDate = new Date();
  customerBalance = '25000';
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe, private apicaller: APICallerService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
        amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        date: ['', Validators.required],
        paymentType: ['Make Payment', Validators.required],
        category: ['Medical', Validators.required],
        description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.paymentForm.invalid) {
        return;
    }
    else {
      const control = this.paymentForm.controls['amount'];
      if (this.paymentForm.value && this.paymentForm.value.paymentType == 'Make Payment' && (Number(control.value) > Number(this.customerBalance))) {
        control.setErrors({ balanceLimit: true });
      } else {
        let data = {
            "amount": this.paymentForm.value.amount,
            "category": this.paymentForm.value.category,
            "date": this.datepipe.transform(this.paymentForm.value.date, 'yyyy-MM-dd'),
            "description": this.paymentForm.value.description,
            "paymentType": this.paymentForm.value.paymentType,
        }
        let submitUrl = environment.siteURL + 'api/v1/payment';
        this.apicaller.postCall(submitUrl, data)
          .subscribe(
            data => {
              console.log("Success");
              this.success = true;
              setTimeout(() => {
                this.success = false;
                this.submitted = false;
                this.paymentForm.reset();
              }, 3000);
            },
          (error) => {
            console.log("Error");
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.submitted = false;
              this.paymentForm.reset();
            }, 3000);
            }
        );
      }
      
    }
  }
  get f() { return this.paymentForm.controls; }

}
