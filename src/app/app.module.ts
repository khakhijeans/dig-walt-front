
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

import { CompanyService } from './shared/services/company.service';
import { DocumentService } from './shared/services/document.service';

import { CustomOption } from "./shared/toastr/custom-option";


@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        LoginLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        BrowserModule,
        NgUploaderModule,
        NgbModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthGuard,
        CompanyService,
        DocumentService,
        {provide: ToastOptions, useClass: CustomOption}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }