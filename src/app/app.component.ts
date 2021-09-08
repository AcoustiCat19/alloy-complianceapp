import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { ValidationService } from 'app/validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alloy-assignment';
  userForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],

    });
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(
        'FirstName: ${this.userForm.value.firstName} LastName: ${this.userForm.value.lastNation}'
      );
    }
  }
}
