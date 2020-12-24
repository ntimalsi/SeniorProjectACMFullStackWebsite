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
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BooksService } from '../../services/books-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  placement: NzDrawerPlacement = 'bottom';
  booksForm: FormGroup;
  fileName: string;
  notPlacement: NzNotificationPlacement;
  branches;
  submitFileError: boolean = false;
  sems;
  curUser;
  books;
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
    private authService : AuthService,
    private booksService: BooksService
  ) {
    this.booksService.search(this.searchTerm$).subscribe(res => {
      this.books = res;
      console.log(this.books.length);
      if(this.books.length === 0){
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
    console.log('observ start');
    this.booksService.getBooks().subscribe((result) =>{
      console.log(result.books);
      this.books = result.books;
      this.books = this.books.sort((a, b) => a.date - b.date);
      this.isDataLoaded = true;
    })
    console.log('observe end');
  }

  ngOnInit(): void {
    this.booksForm = this.fb.group({
      creator: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      file: [null, [Validators.required, this.fileExtValidator]]
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
      this.booksForm.patchValue({ creator: this.curUser._id });
        this.booksForm.get('creator').updateValueAndValidity();
    })

    if(this.isDataLoaded){
      console.log(typeof this.books[0].date);
      this.books = this.books.sort((a, b) => a.date - b.date);
      console.log(this.books);
      this.notPlacement = 'bottomLeft';
    }
  }

  printCh(a: string) {
    console.log(a);
  }
  
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.booksForm.patchValue({ file: file });
    this.booksForm.get('file').updateValueAndValidity();
    console.log(this.booksForm.value.file);
    if (this.booksForm.controls.file.status === 'VALID') {
      this.fileName = file.name;
      console.log(this.fileName);
    }
    if (this.booksForm.controls.file.status === 'INVALID') {
      this.createBasicNotification('bottomLeft');
    }
  }

  checkDeletable(bookCreator: string) {
    if (!this.curUser) {
      return false;
    }
    if (bookCreator === this.curUser._id) {
      return true;
    }
  }

  searchItem(search : string){
    this.notFound = false;
    this.searching = true;
    this.searchTerm$.next(search);
  }

  fileExtValidator: ValidatorFn = (
    control: FormGroup
  ): { [key: string]: boolean } | null => {
    if (control.value) {
      let fileName: string = control.value.name;
      let ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      console.log('extension = ' + ext);
      if (
        ext === 'jpg' ||
        ext === 'jpeg' ||
        ext === 'png' ||
        ext === 'pdf' ||
        ext === 'docx' ||
        ext === 'doc' ||
        ext === 'xlsx' ||
        ext === 'pptx' ||
        ext === 'txt'
      ) {
        console.log('file valid');
        return null;
      }
      console.log('file invalid');
      return { fileInvalid: true };
    }
  };

  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Invalid File Type',
      'File must be of type : .jpg, .jpeg, .png, .txt, .pdf, .docx, .doc, .xlsx, .pptx',
      {
        nzPlacement: position,
        nzStyle: {
          width: '600px',
          color: 'red'
        },
        nzClass: 'test-class'
      }
    );
  }

  removeFile() {
    this.fileName = null;
    this.booksForm.patchValue({ file: '' });
  }

  open(): void {
    console.log('visible true');
    this.visible = true;
  }

  close(): void {
    console.log('visible false');
    this.visible = false;
  }

  onSubmit() {
    console.log('over here');
    for (const i in this.booksForm.controls) {
      this.booksForm.controls[i].markAsDirty();
      this.booksForm.controls[i].updateValueAndValidity();
    }
    console.log(this.booksForm);
    if (this.booksForm.controls.file.status === 'INVALID') {
      console.log('status invalid');
      this.submitFileError = true;
    } else if (this.booksForm.status === 'VALID') {
      this.uploadingStatus = true;
      this.booksService.addBook(
        this.booksForm.value.creator,
        this.booksForm.value.title,
        this.booksForm.value.author,
        this.booksForm.value.branch,
        this.booksForm.value.semester,
        this.booksForm.value.file
      ).subscribe((result) =>{
        this.uploadingStatus = false;
        this.close();
        console.log(result);
        this.books.push(result);
      });
    }
  }

  getFile(filename: string) {
    console.log(filename);
    this.booksService.getFile(filename);
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
    this.booksService.filterRes(filterItems).subscribe(res => {
      console.log(res);
      this.books = res;
      if(this.books.length === 0){
        this.notFound = true;
      }
      this.filtering = false;
    });
  }

  deleteFile(id: string) {
    this.booksService.deleteFile(id).subscribe((result) =>{
      console.log(result);
      this.books = this.books.filter((book) =>{
        return book._id !== id;
      })
    });
  }
}
