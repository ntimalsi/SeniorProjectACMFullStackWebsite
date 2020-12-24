import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {
  NzNotificationService,
  NzNotificationPlacement
} from 'ng-zorro-antd/notification';
import { TutorialsService } from '../../services/tutorials.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'


@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {
  placement: NzDrawerPlacement = 'bottom';
  tutorialsForm: FormGroup;
  fileName: string;
  notPlacement: NzNotificationPlacement;
  branches;
  submitFileError: boolean = false;
  sems;
  curUser;
  tutorials;
  searchTerm$ = new Subject<string>();
  results: Object;
  checked = true;
  checkOptionOne = [];
  checkOptionTwo = [];
  popVisible: boolean = false;
  filterTerm$ = new Subject<object>();
  curUserDes: any;
  isDataLoaded : boolean = false;
  uploadingStatus : boolean = false;
  visible = false;
  notFound : boolean = false ;
  searching : boolean = false;
  filtering : boolean = false;


  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private tutorialService : TutorialsService,
    private authService : AuthService
  ) {
    this.tutorialService.search(this.searchTerm$).subscribe(res => {
      this.tutorials = res;
      console.log(this.tutorials.length);
      if(this.tutorials.length === 0){
        this.notFound = true;
      }
      this.searching = false;
    });
    this.branches = [
      'Electronics',
      'Computer Science',
      'Electrical',
      'Agriculture',
      'Mechanical',
      'Civil'
    ];
    this.sems = [1, 2, 3, 4, 5, 6, 7, 8];
    this.branches.forEach(element => {
      let a = {};
      a['label'] = element;
      a['value'] = element;
      a['checked'] = false;
      this.checkOptionOne.push(a);
    });
    this.sems.forEach(element => {
      let a = {};
      a['label'] = element;
      a['value'] = element;
      a['checked'] = false;
      this.checkOptionTwo.push(a);
    });
    this.tutorialService.getTutorials().subscribe((result) =>{
      console.log('in tutorials observable');
      this.tutorials = result.tutorial;
      console.log(this.tutorials);
      this.isDataLoaded = true;
    })
  }

  ngOnInit(): void {
    this.tutorialsForm = this.fb.group({
      creator: ['', Validators.required],
      topic: ['', Validators.required],
      subject: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      ytLink: ['', Validators.required]
    });

    if(this.authService.isLogged() ){
      console.log('yes logged in')
      this.curUser = this.authService.getCurUser();
      console.log(this.curUser);
      this.curUserDes = this.curUser.designation;
      console.log('designation ' + this.curUserDes);
    }

    this.authService.distributeCurUserInfo().subscribe((result) =>{
      console.log('disti logged in');
      this.curUser = result;
      console.log(this.curUser);
      this.curUserDes = this.curUser.designation;
      this.tutorialsForm.patchValue({ creator: this.curUser._id });
        this.tutorialsForm.get('creator').updateValueAndValidity();
    })

    if(this.isDataLoaded){
      console.log(typeof this.tutorials[0].date);
      this.tutorials = this.tutorials.sort((a, b) => a.date - b.date);
      console.log(this.tutorials);
      this.notPlacement = 'bottomLeft';
    }
  }

  printCh(a: string) {
    console.log(a);
  }

  checkDeletable(tutorialCreator: string) {
    if (!this.curUser) {
      return false;
    }
    if (tutorialCreator === this.curUser._id) {
      return true;
    }
  }

  searchItem(search : string){
    this.notFound = false;
    this.searching = true;
    this.searchTerm$.next(search);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    for (const i in this.tutorialsForm.controls) {
      this.tutorialsForm.controls[i].markAsDirty();
      this.tutorialsForm.controls[i].updateValueAndValidity();
    }
    if (this.tutorialsForm.status === 'VALID') {
      this.uploadingStatus = true;
      let tutorial = {
        creator  : this.tutorialsForm.value.creator,
        topic : this.tutorialsForm.value.topic,
        subject  : this.tutorialsForm.value.subject,
        branch  : this.tutorialsForm.value.branch,
        semester : this.tutorialsForm.value.semester,
        ytLink : this.tutorialsForm.value.ytLink
      }
      this.tutorialService.addTutorial(
        tutorial
      ).subscribe((result) =>{
        this.uploadingStatus = false;
        this.close();
        console.log(result);
        this.tutorials.push(result);
      });
    }
  }

  log(value: object[]): void {
    // console.log(value);
  }

  submitFilter(): void {
    this.notFound = false;
    this.popVisible = false;
    this.filtering = true;
    let branchFilters = [];
    let semFilters = [];
    this.checkOptionOne.forEach(element => {
      if (element.checked == true) {
        branchFilters.push(element.value);
      }
    });
    this.checkOptionTwo.forEach(element => {
      if (element.checked == true) {
        semFilters.push(element.value);
      }
    });
    let filterItems = {};
    filterItems['branch'] = branchFilters;
    filterItems['sem'] = semFilters;
    if (!branchFilters.length && !semFilters.length) {
      console.log('not there');
      filterItems['branch'] = this.branches;
      filterItems['sem'] = this.sems;
    }
    this.tutorialService.filterRes(filterItems).subscribe(res => {
      console.log(res);
      this.tutorials = res;
      if(this.tutorials.length === 0){
        this.notFound = true;
      }
      this.filtering = false;
    });
  }

  change(value: boolean): void {
    console.log(value);
  }

  deleteTutorial(id: string) {
    this.tutorialService.deleteTutoial(id).subscribe((result) =>{
      console.log(result);
      this.tutorials = this.tutorials.filter((book) =>{
        return book._id !== id;
      })
    });
  }

  getThumbnail(url : string){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      let newUrl = 'https://img.youtube.com/vi/'+ match[2] + '/mqdefault.jpg';
      console.log(newUrl);
      return newUrl;
    } else {
      console.log(
        'error in getting thumbnail'
      )
    }
  }


  list = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 88];
  title: string = 'Trees and Graphs';
  update = Date.now();
  upby: string = 'Binod';
  subject: string = 'Data structures & Algos';

  ytlink: string =
    'https://www.youtube.com/embed/K_PQPfDbgHM?wmode=transparent&autoplay=1';
  ytthumb: string = 'https://img.youtube.com/vi/K_PQPfDbgHM/hqdefault.jpg';
}
