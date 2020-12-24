import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './home/feed/feed.component';
import { EventsComponent } from './home/events/events.component';
import { AnnouncesComponent } from './home/announces/announces.component';
import { CreatePostComponent } from './home/feed/create-post/create-post.component';
import { PostsComponent } from './home/feed/posts/posts.component';
import { StdmatComponent } from './stdmat/stdmat.component';
import { BooksComponent } from './stdmat/books/books.component';
import { NotesComponent } from './stdmat/notes/notes.component';
import { PapersComponent } from './stdmat/papers/papers.component';
import { TutorialsComponent } from './stdmat/tutorials/tutorials.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgFileValidatorLibModule } from 'angular-file-validator';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AssignsComponent } from './assigns/assigns.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { LoginComponent } from './login/login.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { RegisterComponent } from './login/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OnepostComponent } from './home/feed/posts/onepost/onepost.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { AuthGuard } from './services/auth.guard';
import { PostsResolverService } from './home/feed/posts/posts-resolver.service';
import { PostUserResolverService } from './home/feed/posts/onepost/post-user-resolver.service';
import { CurUserResolveService } from './services/cur-user-resolve.service';
import { AnnouncesResolverService } from './home/announces/announces-resolver.service';
import { OneAnnounceComponent } from './home/announces/one-announce/one-announce.component';
import { OneEventComponent } from './home/events/one-event/one-event.component';
import { EventsResolverService } from './home/events/events-resolver.service';
import { NotesResolverService } from './stdmat/notes/notes-resolver.service';
import { BooksResolverService } from './stdmat/books/books-resolver.service';


import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from 'primeng/table';



registerLocaleData(en);

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    // resolve: {
    //   posts: PostsResolverService,
    //   curUser: CurUserResolveService,
    //   announces: AnnouncesResolverService,
    //   events: EventsResolverService
    //   // postUser: PostUserResolverService
    // }
  },

  {
    path: 'stdmat',
    children: [
      { path: '', component: StdmatComponent },
      { path: 'tutorials', component: TutorialsComponent },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      { path: 'papers', component: PapersComponent }
    ]
  },

  { path: 'assigns', component: AssignsComponent
  // , canActivate: [AuthGuard] 
},
  {
    path: 'edit/:postId',
    component: CreatePostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent },
      { path: 'reg', component: RegisterComponent }
    ]
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FeedComponent,
    EventsComponent,
    AnnouncesComponent,
    CreatePostComponent,
    PostsComponent,
    StdmatComponent,
    BooksComponent,
    NotesComponent,
    PapersComponent,
    TutorialsComponent,
    AssignsComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    OnepostComponent,
    OneAnnounceComponent,
    OneEventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    NzFormModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NzAffixModule,
    NzAlertModule,
    NzAnchorModule,
    NzAutocompleteModule,
    NzAvatarModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCalendarModule,
    NzCardModule,
    NzCarouselModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzCommentModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzGridModule,
    NzI18nModule,
    NzIconModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzListModule,
    NzMentionModule,
    NzMenuModule,
    NzMessageModule,
    NzModalModule,
    NzNoAnimationModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzProgressModule,
    NzRadioModule,
    NzRateModule,
    NzResultModule,
    NzSelectModule,
    NzSkeletonModule,
    NzSliderModule,
    NzSpinModule,
    NzStatisticModule,
    NzStepsModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzTimelineModule,
    NzToolTipModule,
    NzTransButtonModule,
    NzTransferModule,
    NzTreeModule,
    NzTreeSelectModule,
    NzTypographyModule,
    NzUploadModule,
    NzWaveModule,
    NzResizableModule,
    CKEditorModule,
    NgFileValidatorLibModule,
    CalendarModule,
    DialogModule,
    ButtonModule,
    SidebarModule,
    TableModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    PostsResolverService,
    PostUserResolverService,
    CurUserResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
