import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {
  PasswordValidator,
  ParentErrorStateMatcher,
} from '../validators';


@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matchingPassGroup: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    'Male',
    'Female',
    'Other'
  ];

  validationMess = {
    fullname: [
      { type: 'required', message: 'Full name is required' }
    ],
    bio: [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    gender: [
      { type: 'required', message: 'Please select your gender' },
    ],
    birthday: [
      { type: 'required', message: 'Please insert your birthday' },
    ],
  };

  accValidationMess = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matchingPassGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: ['Marcus Cassius', Validators.required ],
      // tslint:disable-next-line:max-line-length
      bio: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', Validators.maxLength(256)],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matchingPassGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmitAccountDetails(value) {
    console.log(value);
  }

  onSubmitUserDetails(value) {
    console.log(value);
  }

}
