import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus  } from 'ngx-uploader';

import { CompanyService } from 'app/shared/services/company.service';
import { DocumentService } from 'app/shared/services/document.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from 'app/shared/services/constants';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <form class="form" [formGroup]="newCompanyForm" (ngSubmit)="saveCompany()">
    <div class="modal-header">
      <h4 class="modal-title">Add Company</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-body">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" formControlName="name" class="form-control" placeholder="Name"
          name="name">
        </div>
        <div class="form-group">
          <label for="contact">Contact</label>
          <input type="text" formControlName="contact" class="form-control" placeholder="Contact"
          name="contact">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" formControlName="email" class="form-control" placeholder="Email" name="email">
        </div>
        <div class="form-group">
          <label for="phone">Contact Number</label>
          <input type="text" formControlName="phone" class="form-control" placeholder="Phone" name="phone">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-primary btn-raised">Submit</button>
      <button type="button" class="btn btn-secondary btn-raised" (click)="activeModal.close()">Close</button>
    </div>
  </form>
`
})
export class NgbdModalContent {
  
  newCompanyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  })

  constructor (
    private companyService: CompanyService,
    private toastr: ToastsManager,
    public activeModal: NgbActiveModal
  ) { }

  saveCompany() {
    if (this.newCompanyForm.status == 'INVALID') {
      this.toastr.error('Please fill in all required fields');
    } else {
      this.companyService.saveCompany(JSON.stringify(this.newCompanyForm.value)).subscribe(data => {
        this.toastr.success(data.msg);
        if(data && data.success) {
          this.activeModal.close(data.company);
        }
      });
    }
  }
}

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cmbDashboardCompany = -1;

  companyList: any[];
  documentList: any[];

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  api = Constants.API_ENDPOINT;

  constructor(
    private companyService: CompanyService,
    private documentService: DocumentService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
  ) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
   }

  ngOnInit() {
    this.companyService.getCompanyList().subscribe(companyList => { this.companyList = companyList.companies; });
  }

  openAddCompanyModal() {
    const modalRef = this.modalService.open(NgbdModalContent).result.then((result) => {
      if(result) {
        this.companyList.push(result);
      }
    });
  }

  getDocumentList(companyId: number) {
    this.documentService.getDocumentList(companyId).subscribe(documentList => { this.documentList = documentList.files; });
    this.files = [];
  }

  deleteDocument(fileid: number) {
    this.documentService.deleteDocument(fileid).subscribe(data => {
      if(data.success) {
        this.toastr.success('Document deleted successfully');
        const index = this.documentList.findIndex(doc => doc._id === fileid);
        this.documentList.splice(index, 1);
      } else {
        this.toastr.error(data.msg);
      }
    });
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output.type);
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: Constants.API_ENDPOINT + '/api/upload/' + this.cmbDashboardCompany,
        method: 'POST',
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      console.log('done');
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }
 
  startUpload(): void {
    if (this.cmbDashboardCompany == null || this.cmbDashboardCompany == -1) {
      this.toastr.error('Please select company');
    }
    const event: UploadInput = {
      type: 'uploadAll',
      url: Constants.API_ENDPOINT + '/api/upload/' + this.cmbDashboardCompany,
      method: 'POST'
    };
 
    this.uploadInput.emit(event);
  }
 
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
 
  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
 
  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
