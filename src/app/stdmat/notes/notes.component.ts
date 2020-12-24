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
import { NotesService } from '../../services/notes.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  placement: NzDrawerPlacement = 'bottom';
  notesForm: FormGroup;
  fileName: string;
  notPlacement: NzNotificationPlacement;
  branches;
  submitFileError: boolean = false;
  sems;
  curUser;
  notes;
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
    private notesService: NotesService,
    private authService : AuthService
  ) {
    this.notesService.search(this.searchTerm$).subscribe(res => {
      this.notes = res;
      console.log(this.notes.length);
      if(this.notes.length === 0){
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
    this.notesService.getNotes().subscribe((result) =>{
      console.log('in notes observable');
      this.notes = result.notes;
      this.isDataLoaded = true;
    })
  }

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      creator: ['', Validators.required],
      topic: ['', Validators.required],
      subject: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      file: [null, [Validators.required, this.fileExtValidator]]
    });

    if(this.authService.isLogged() ){
      this.curUser = this.authService.getCurUser();
      this.curUserDes = this.curUser.designation;
      this.notesForm.patchValue({ creator: this.curUser._id });
        this.notesForm.get('creator').updateValueAndValidity();
    }

    this.authService.distributeCurUserInfo().subscribe((result) =>{
      console.log('disti logged in');
      this.curUser = result;
      console.log(this.curUser);
      this.curUserDes = this.curUser.designation;
      this.notesForm.patchValue({ creator: this.curUser._id });
        this.notesForm.get('creator').updateValueAndValidity();
    })

    if(this.isDataLoaded){
      console.log(typeof this.notes[0].date);
      this.notes = this.notes.sort((a, b) => a.date - b.date);
      console.log(this.notes);
      this.notPlacement = 'bottomLeft';
    }
  }

  printCh(a: string) {
    console.log(a);
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.notesForm.patchValue({ file: file });
    this.notesForm.get('file').updateValueAndValidity();
    console.log(this.notesForm.value.file);
    if (this.notesForm.controls.file.status === 'VALID') {
      this.fileName = file.name;
      console.log(this.fileName);
    }
    if (this.notesForm.controls.file.status === 'INVALID') {
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
    this.notesForm.patchValue({ file: '' });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    for (const i in this.notesForm.controls) {
      this.notesForm.controls[i].markAsDirty();
      this.notesForm.controls[i].updateValueAndValidity();
    }
    if (this.notesForm.controls.file.status === 'INVALID') {
      this.submitFileError = true;
    } else if (this.notesForm.status === 'VALID') {
      this.uploadingStatus = true;
      this.notesService.addNotes(
        this.notesForm.value.creator,
        this.notesForm.value.topic,
        this.notesForm.value.subject,
        this.notesForm.value.branch,
        this.notesForm.value.semester,
        this.notesForm.value.file
      ).subscribe((result) =>{
        this.uploadingStatus = false;
        this.close();
        console.log(result);
        this.notes.push(result);
      });
    }
  }

  getFile(filename: string) {
    console.log(filename);
    this.notesService.getFile(filename);
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
    this.notesService.filterRes(filterItems).subscribe(res => {
      console.log(res);
      this.notes = res;
      if(this.notes.length === 0){
        this.notFound = true;
      }
      this.filtering = false;
    });
  }

  change(value: boolean): void {
    console.log(value);
  }

  deleteFile(id: string) {
    this.notesService.deleteFile(id).subscribe((result) =>{
      console.log(result);
      this.notes = this.notes.filter((book) =>{
        return book._id !== id;
      })
    });
  }
}
