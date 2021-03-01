import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CurrencyPipe, DatePipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserTransferListComponent } from './user-transfer-list/user-transfer-list.component';
import { AddTransferComponent } from './add-transfer/add-transfer.component';
import { AngularIbanModule } from 'angular-iban';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path:'addTransfer', component: AddTransferComponent},
  {path:'home', component: UserTransferListComponent},
  {path:'', component: UserTransferListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserTransferListComponent,
    AddTransferComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AngularIbanModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule
  ],
  providers: [CurrencyPipe , DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
