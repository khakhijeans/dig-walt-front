import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeRoutingModule } from "./home-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgUploaderModule } from 'ngx-uploader';

import { HomeComponent, NgbdModalContent } from './home.component';

import { FileSizePipe } from '../../shared/pipes/file-size.pipe';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgUploaderModule
    ],
    declarations: [
        HomeComponent,
        NgbdModalContent,
        FileSizePipe
    ],
    entryComponents:[NgbdModalContent]
})
export class HomeLayoutPagesModule { }
