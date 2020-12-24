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
import { PapersService } from '../../services/papers.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {
  placement: NzDrawerPlacement = 'bottom';
  papersForm: FormGroup;
  fileName: string;
  notPlacement: NzNotificationPlacement;
  branches;
  submitFileError: boolean = false;
  sems;
  curUser;
  papers;
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
    private papersService: PapersService,
    private authService : AuthService
  ) {
    this.papersService.search(this.searchTerm$).subscribe(res => {
      this.papers = res;
      console.log(this.papers.length);
      if(this.papers.length === 0){
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
    this.papersService.getPapers().subscribe((result) =>{
      console.log('in papers observable');
      this.papers = result.papers;
      this.isDataLoaded = true;
    })
  }

  ngOnInit(): void {
    this.papersForm = this.fb.group({
      creator: ['', Validators.required],  
      exam: ['', Validators.required],  //done
      subjects: ['', Validators.required], //done
      branch: ['', Validators.required],  //done
      semester: ['', Validators.required],  //done
      sessionFrom: ['', Validators.required],  //done
      sessionTo: ['', Validators.required],  //done
      file: [null, [Validators.required, this.fileExtValidator]] //done
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
      this.papersForm.patchValue({ creator: this.curUser._id });
        this.papersForm.get('creator').updateValueAndValidity();
    })

    if(this.isDataLoaded){
      console.log(typeof this.papers[0].date);
      this.papers = this.papers.sort((a, b) => a.date - b.date);
      console.log(this.papers);
      this.notPlacement = 'bottomLeft';
    }
  }

  printCh(a: string) {
    console.log(a);
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.papersForm.patchValue({ file: file });
    this.papersForm.get('file').updateValueAndValidity();
    console.log(this.papersForm.value.file);
    if (this.papersForm.controls.file.status === 'VALID') {
      this.fileName = file.name;
      console.log(this.fileName);
    }
    if (this.papersForm.controls.file.status === 'INVALID') {
      this.createBasicNotification('bottomLeft');
    }
  }

  checkDeletable(notesCreator: string) {
    if (!this.curUser) {
      return false;
    }
    if (notesCreator === this.curUser._id) {
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
    this.papersForm.patchValue({ file: '' });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    for (const i in this.papersForm.controls) {
      this.papersForm.controls[i].markAsDirty();
      this.papersForm.controls[i].updateValueAndValidity();
    }
    if (this.papersForm.controls.file.status === 'INVALID') {
      this.submitFileError = true;
    } else if (this.papersForm.status === 'VALID') {
      this.uploadingStatus = true;
      console.log(this.papersForm);
      this.papersService.addPaper(
        this.papersForm.value.creator,
        this.papersForm.value.exam,
        this.papersForm.value.subjects,
        this.papersForm.value.branch,
        this.papersForm.value.semester,
        this.papersForm.value.sessionFrom,
        this.papersForm.value.sessionTo,
        this.papersForm.value.file
      ).subscribe((result) =>{
        this.uploadingStatus = false;
        this.close();
        console.log(result);
        this.papers.push(result);
      });
    }
  }

  getFile(filename: string) {
    console.log(filename);
    this.papersService.getFile(filename);
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
    this.papersService.filterRes(filterItems).subscribe(res => {
      console.log(res);
      this.papers = res;
      if(this.papers.length === 0){
        this.notFound = true;
      }
      this.filtering = false;
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  deleteFile(id: string) {
    this.papersService.deleteFile(id).subscribe((result) =>{
      console.log(result);
      this.papers = this.papers.filter((book) =>{
        return book._id !== id;
      })
    });
  }


  visibleSidebar4;




  list = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 88];
  title: string = 'Trees and Graphs';
  update = Date.now();
  upby: string = 'Binod';
  subjects: string = 'Data structures & Algos';
}
