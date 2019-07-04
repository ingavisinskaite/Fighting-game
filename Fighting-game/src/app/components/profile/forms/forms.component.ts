import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
  imagePath: string;
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
    this.userDetailsForm = this.fb.group({
      fullname: [player.fullname, Validators.required ],
      bio: [player.bio, Validators.maxLength(256)],
      birthday: [player.birthDate, Validators.required],
      gender: new FormControl(player.gender, Validators.required),
      photoPath: new FormControl(player.photoURL),
    });
  }

  loadData() {
    this.userId = this.authService.getUserId();
    this.authService.getPlayer(this.userId).subscribe(player => {
      this.createForms(player);
    });
  }

  onSubmitUserDetails(value) {
    this.authService.submitUser(value);
  }

  getImageURL(clicked, path) {
    this.buttonClicked = clicked;
    this.imagePath = path;
  }

  setImageURL() {
    if (!this.buttonClicked) {
      this.imagePath = '../../../assets/ddd.png';
    }
    return this.imagePath;
  }
}
