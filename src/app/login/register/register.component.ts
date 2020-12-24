import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { CurUser } from '../../models/curuser.model';
import { CurUserService } from '../../services/cur-user.service';
import { AuthService } from '../../services/auth.service';
import { FileCheck } from 'angular-file-validator'; // <-------
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  regForm: FormGroup;
  facregForm: FormGroup;
  cuser: CurUser;
  imagePreview: string;
  facimagePreview: string;

  isLoading: boolean = false;

  constructor(public authUser: AuthService, private fb: FormBuilder, private router: Router) {
    this.regForm = this.fb.group({
      batchFrom: ['', [Validators.required]],
      batchTo: ['', [Validators.required]],
      enrolNo: ['', [Validators.required, Validators.maxLength(3)]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      branch: ['ECE', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [this.confirmValidator]],
      profilepic: ['', , FileCheck.ngFileValidator(['png', 'jpg', 'jpeg'])]
    });

    this.facregForm = this.fb.group({
      employeeId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      branch: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [this.confirmfacValidator]],
      profilepic: ['', , FileCheck.ngFileValidator(['png', 'jpg', 'jpeg'])]
    });
  }

  onImageSelected(event: Event) {
    let file = (event.target as HTMLInputElement).files[0];
    this.regForm.patchValue({ profilepic: file });
    this.regForm.get('profilepic').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onfacImageSelected(event: Event) {
    let file = (event.target as HTMLInputElement).files[0];
    this.facregForm.patchValue({ profilepic: file });
    this.facregForm.get('profilepic').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.facimagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.isLoading = true;
    const newUser = {
      _id: null,
      batchFrom: this.regForm.value.batchFrom,
      batchTo: this.regForm.value.batchTo,
      enrolNo: this.regForm.value.enrolNo,
      name: this.regForm.value.name,
      mobile: this.regForm.value.mobile,
      email: this.regForm.value.email,
      branch: this.regForm.value.branch,
      password: this.regForm.value.password,
      profilepic: this.regForm.value.profilepic
    };
    console.log(newUser);

    this.authUser.createUser(
      newUser.batchFrom,
      newUser.batchTo,
      newUser.enrolNo,
      newUser.name,
      newUser.mobile,
      newUser.email,
      newUser.branch,
      newUser.password,
      newUser.profilepic
    );
  }

  faconSubmit(): void {
    this.isLoading = true;
    const newfacUser = {
      _id: null,
      employeeId: this.facregForm.value.employeeId,
      name: this.facregForm.value.name,
      mobile: this.facregForm.value.mobile,
      email: this.facregForm.value.email,
      branch: this.facregForm.value.branch,
      password: this.facregForm.value.password,
      profilepic: this.facregForm.value.profilepic
    };
    console.log(newfacUser);

    // this.authUser.createFacUser(
    //   newfacUser.employeeId,
    //   newfacUser.name,
    //   newfacUser.mobile,
    //   newfacUser.email,
    //   newfacUser.branch,
    //   newfacUser.password,
    //   newfacUser.profilepic
    // );

    this.authUser.createAuthFacUser(
      newfacUser.employeeId,
      newfacUser.name,
      newfacUser.mobile,
      newfacUser.email,
      newfacUser.branch,
      newfacUser.password,
      newfacUser.profilepic
    ).subscribe(result => {
      console.log(result);
      this.router.navigate(['/login']);
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.regForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  confirmfacValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.facregForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };
}
