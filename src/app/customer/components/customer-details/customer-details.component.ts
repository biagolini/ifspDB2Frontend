import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesModel } from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { CustomerService } from '../../services/customer.service';




@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private feedback: FeedbackService,
    private router: Router,
    private typeService: TypeService,
  ) {}

  isEdit = false;
  customerId!: number;
  processing: boolean = false;

  //MASK
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '.', '-', /\d/, /\d/];
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  // Options
  listState: StatesModel [] = []; //  Lista de estados e seus codigos

  customerForm = this.form.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', Validators.required],
    cpf: ['', Validators.required],
    street: ['', Validators.required],
    number: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
});




  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = params['id'] !== 'new';
        this.customerId = params['id'];
      },
    });

      // Pegar lista atualizada de estados
      this.typeService.updateListState().subscribe({
      next: (response) =>{
        this.listState = response;
      }
    });
    
    if (this.isEdit) {
      this.patchCustomer();
    }
  }

  patchCustomer(){
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (response) =>{
        this.customerForm.patchValue(response);
      }
    });

  }


  saveCustomer() {
    const data = this.customerForm.value;
    console.log(data);
    this.customerService.createCustomer(data).subscribe({
      next: () => {
        this.feedback.showMessage('customer.success.created').subscribe();
        this.router.navigate(['/customer']);
      },
      error: () => {
        this.feedback.showMessage('customer.error.created').subscribe();
      }
    });
  }

  createCustomer() {  
    const data = this.customerForm.value;
    console.log(data);
    this.customerService.updateCustomer(data, this.customerId).subscribe({
      next: () => {
        this.feedback.showMessage('customer.success.updated').subscribe();
        this.router.navigate(['/customer']);
      },
      error: () => {
        this.feedback.showMessage('customer.error.updated').subscribe();
      }
    });
  }
}
