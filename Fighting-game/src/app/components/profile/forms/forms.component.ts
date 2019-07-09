import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
  imagePath: string;
  img: string;
  buttonClicked = false;
  userDetailsForm: FormGroup;
  userId: string;
  currentPlayer: any;

  genders = [
    'Male',
    'Female',
    'Other'
  ];

  playerObj = {
    fullname: '',
    bio: '',
    birthday: '',
    gender: '',
    photoPath: ''
  };
  url = '';

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

  constructor(private fb: FormBuilder,
              public authService: AuthService) { }

  ngOnInit() {
    this.createForms(this.playerObj);
    this.loadData();
  }

  createForms(player) {
    let convertedDate;
    if (player.birthDate) {
      convertedDate = new Date(player.birthDate.seconds * 1000).toISOString();
    }
    this.userDetailsForm = this.fb.group({
      fullname: [player.fullname, Validators.required ],
      bio: [player.bio, Validators.maxLength(256)],
      birthday: [convertedDate, Validators.required],
      gender: new FormControl(player.gender, Validators.required),
      photoPath: new FormControl(player.photoURL),
    });

  }

  loadData() {
    this.userId = this.authService.getUserId();
    this.authService.getPlayer(this.userId).subscribe(player => {
      this.createForms(player);
      this.setImageURL(player.photoURL);
    });
  }

  onSubmitUserDetails(value) {
    this.authService.submitUser(value);
    console.log(value.birthday);
  }

  setImageURL(url) {
    this.img = url;
    if (!this.img) {
        this.img = '../../../assets/ddd.png';
    }
  }
}
