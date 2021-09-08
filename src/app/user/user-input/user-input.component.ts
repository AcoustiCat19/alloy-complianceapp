import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import axios from 'axios';
import { rmdir } from 'fs';
import { range } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { variable } from '@angular/compiler/src/output/output_ast';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})

export class UserInputComponent implements OnInit {
  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild('lastNameInput') lastNameInput: ElementRef;
  @ViewChild('addressOneInput') addressOneInput: ElementRef;
  @ViewChild('addressTwoInput') addressTwoInput: ElementRef;
  @ViewChild('cityInput') cityInput: ElementRef;
  @ViewChild('stateInput') stateInput: ElementRef;
  @ViewChild('zipInput') zipInput: ElementRef;
  @ViewChild('countryInput') countryInput: ElementRef;
  @ViewChild('ssnInput') ssnInput: ElementRef;
  @ViewChild('dobInput') dobInput: ElementRef;
  @ViewChild('phoneInput') phoneInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;

  @Output() Message = " ";
  @Output() statusMessage = "";
  @Output() rvwMessage = " ";
  @Output() dclMessage = " ";
  @Output() showCompliancedGif = false;
  @Output() showReviewGif = false;
  @Output() showSeemsLegitGif = false;
  
  constructor() {}

  ngOnInit() {
  };

  ngOnClick() {
    this.setStatusMessage('');
    const firstName = this.firstNameInput.nativeElement.value;
    const lastName = this.lastNameInput.nativeElement.value;
    const addressOne = this.addressOneInput.nativeElement.value;
    const addressTwo = this.addressTwoInput.nativeElement.value;
    const city = this.cityInput.nativeElement.value;
    const state = this.stateInput.nativeElement.value;
    const zip = this.zipInput.nativeElement.value;
    const country = this.countryInput.nativeElement.value;
    const ssn = this.ssnInput.nativeElement.value;
    const dob = this.dobInput.nativeElement.value;
    const phone = this.phoneInput.nativeElement.value;
    const email = this.emailInput.nativeElement.value;
    var postData = {
      firstName, 
      lastName, 
      addressOne, 
      addressTwo, 
      city, 
      state, 
      zip, 
      country,
      ssn,
      dob,
      phone, 
      email
    };
    
    if (this.validate(postData)) {
      this.setMessage('');
      
      console.log(postData)
      axios.post('http://localhost:3000/clientOnboarding', postData)
        .then(r => r.data)
        .then(d => {
          console.log(d);
          this.setStatusMessage(d.result.summary.outcome);
          
        });
    }; 
  };

  setStatusMessage(outcome) {
    this.showCompliancedGif = false;
    this.showReviewGif = false;
    this.showSeemsLegitGif = false;
    if (outcome === 'Approved') {
      this.statusMessage = "Congratulations! You have successfully created an account with our platform.";
      this.showSeemsLegitGif = true;
    } else if (outcome === 'Manual Review') {
      this.statusMessage = "Thank you for your application, we will be in touch shortly.";
      this.showReviewGif = true;
    } else if (outcome === "Denied") {
      this.statusMessage = "Sorry, your application was not successful.";
      this.showCompliancedGif = true;
    }
  }
  


  validate (data):boolean {
    if (data.firstName.length === 0) {
      this.setMessage("First Name cannot be empty");
      return false;
    }
    if (data.lastName.length === 0) {
      this.setMessage("Last Name cannot be empty");
      return false;
    }
    if (data.addressOne.length === 0) {
      this.setMessage("Address cannot be empty");
      return false;
    }
    if (data.city.length === 0) {
      this.setMessage("City cannot be empty");
      return false;
    }
    if (data.state.length !== 2) {
      this.setMessage("Please use state abbreviation");
      return false;
    }
    if (data.zip.length !== 5) {
      this.setMessage("Please enter five-digit zip code");
      return false;
    }
    if (data.country.length !== 2) {
      this.setMessage("Please use two-letter country code");
      return false;
    }
    if (data.ssn.length !== 9) {
      this.setMessage("Please enter your nine-digit SSN without dashes");
      return false;
    }
    if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(data.dob) === null) {
      this.setMessage("Please enter your date in YYYY-MM-DD format.");
      return false;
    }
    if (data.phone.length !== 11) {
      this.setMessage("Please enter a valid US or Canadian phone number, including the country code (1)");
      return false;
    }
    return true;
  };

  setMessage(msg) {
    this.Message = msg;
  }


};
