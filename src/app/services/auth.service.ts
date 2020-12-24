import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurUser } from '../models/curuser.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private atoken: string;
  private curUser = new Subject<CurUser>();
  private cUser;
  public authStatus = new Subject<boolean>();
  private isLog: boolean = false;

  getToken() {
    return this.atoken;
  }

  authSubsListner() : Observable<boolean> {
    return this.authStatus.asObservable();
  }

  isLogged() {
    console.log('isLogged called and returned ');
    if(this.cUser){
      console.log('true');
      return true;
    }
    console.log('false');
    return false;
  }

  createUser(
    batchFrom: Date,
    batchTo: Date,
    enrolNo: string,
    name: string,
    mobile: string,
    email: string,
    branch: string,
    password: string,
    profilepic: File
  ) {
    const regUser = new FormData();
    regUser.append('batchFrom', batchFrom.toString());
    regUser.append('batchTo', batchTo.toString());
    regUser.append(
      'enrolNo',
      batchFrom.getFullYear().toString() + '/CTAE/' + enrolNo
    );
    regUser.append('name', name);
    regUser.append('mobile', mobile);
    regUser.append('email', email);
    regUser.append('branch', branch);
    regUser.append('password', password);
    if (profilepic) {
      regUser.append('profilepic', profilepic, enrolNo + Date.now());
    } else {
      regUser.append('profilepic', null);
    }

    this.http
      .post('http://turing.cs.olemiss.edu:5001/api/user/signup', regUser)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/login']);
      });
  }

  createFacUser(
    employeeId: string,
    name: string,
    mobile: string,
    email: string,
    branch: string,
    password: string,
    profilepic: File
  ) {
    const regUser = new FormData();
    regUser.append('employeeId', employeeId);
    regUser.append('name', name);
    regUser.append('mobile', mobile);
    regUser.append('email', email);
    regUser.append('branch', branch);
    regUser.append('password', password);
    if (profilepic) {
      regUser.append('profilepic', profilepic, employeeId + Date.now());
    } else {
      regUser.append('profilepic', null);
    }

    this.http
      .post('http://turing.cs.olemiss.edu:5001/api/user/signupfac', regUser)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/login']);
      });
  }

  createAuthFacUser(
    employeeId: string,
    name: string,
    mobile: string,
    email: string,
    branch: string,
    password: string,
    profilepic: File
  ){
    const regUser = new FormData();
    regUser.append('employeeId', employeeId);
    regUser.append('name', name);
    regUser.append('mobile', mobile);
    regUser.append('email', email);
    regUser.append('branch', branch);
    regUser.append('password', password);
    if (profilepic) {
      regUser.append('profilepic', profilepic, employeeId + Date.now());
    } else {
      regUser.append('profilepic', null);
    }

    return this.http
      .post('http://turing.cs.olemiss.edu:5001/api/user/signupfac', regUser);
  }

  setCurUserInfo(): Observable<any> {
    return this.http
      .get('http://turing.cs.olemiss.edu:5001/api/user/getCurUserInfo');
  }

  getCurUser() {
    return this.cUser;
  }

  loginUser(email: string, password: string) {
    const user = { email: email, password: password };
    this.http
      .post<{ token: string }>('http://turing.cs.olemiss.edu:5001/api/user/login', user)
      .subscribe(result => {
        const token = result.token;
        this.atoken = token;
        if (this.atoken) {
          this.isLog = true;
          this.authStatus.next(true);
          this.setCurUserInfo().subscribe(user => {
            this.cUser = user.user;
            console.log('cuser from auth '+  this.cUser.name)
            this.curUser.next(this.cUser);
            this.saveAuthData(token);
            this.router.navigate(['/']);
            console.log('logged in successfully');
          });
        }
      });
  }

  distributeCurUserInfo() {
    return this.curUser.asObservable();
  }

  logout() {
    this.atoken = null;
    this.isLog = false;
    this.authStatus.next(false);
    this.removeAuthData();
    this.router.navigate(['/login']);
  }

  saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  removeAuthData() {
    localStorage.removeItem('token');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return token;
  }

  autoAuthUser() {
    const authToken = this.getAuthData();
    if (authToken) {
      this.atoken = authToken;
      this.setCurUserInfo().subscribe(user => {
        this.cUser = user;
        this.cUser = this.cUser.user;
        // console.log('cUser value is ');
        // console.log(this.cUser);
        this.curUser.next(this.cUser);
        this.isLog = true;
        this.authStatus.next(true);
      });

    }
  }
}
