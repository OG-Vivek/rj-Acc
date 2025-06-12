import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, GlAccount } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gl-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    PdfViewerModule,
    MatIconModule
  ],
  templateUrl: './gl-account.component.html',
  styleUrl: './gl-account.component.css'
})
export class GlAccountComponent {
  glAccountForm: FormGroup;
  pdfSrc: any = null;
  fileName: string | null = null;
  glId: string | null = null;
  isEditMode = false;

  glAccounts = [
    { id: 1, name: 'Name 001' },
    { id: 2, name: 'Name 002' },
    { id: 3, name: 'Name 003' },
    { id: 4, name: 'Name 004' },
    { id: 5, name: 'Name 005' },
    { id: 6, name: 'Name 006' },
    { id: 7, name: 'Name 007' },
    { id: 8, name: 'Name 008' },
    { id: 9, name: 'Name 009' },
    { id: 10, name: 'Name 010' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private location: Location, public dataService: DataService, private route: ActivatedRoute) {
    this.glId = this.route.snapshot.paramMap.get('glId');
    this.glAccountForm = this.fb.group({
      glAccount: ['', Validators.required],
      type: ['debit', Validators.required],
      offset: ['', Validators.required],
      document: [null],
      description: ['']
    });
    if (this.glId) {
      this.isEditMode = true;
      this.getGlAccount(parseInt(this.glId));
    }
  }

  getGlAccount(id: number) {
    this.dataService.getGlAccountById(id).subscribe(glAccount => {
      if (glAccount) {
        this.glAccountForm.patchValue(glAccount);

        if (glAccount.document) {
          this.fileName = glAccount.documentName || 'document.pdf';
          this.pdfSrc = glAccount.document;
        }
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (e: any) => { 
          this.pdfSrc = e.target.result; 
          this.glAccountForm.patchValue({ document: this.pdfSrc });
          this.glAccountForm.patchValue({ documentName: file.name });
        };
        reader.readAsDataURL(file);
      } else {
        // Handle non-pdf file error
        this.fileName = null;
        this.pdfSrc = null;
        alert('Please select a PDF file.');
      }
    }
  }

  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
  }

  onSubmitAndAddNew() {
    if (this.glAccountForm.valid) {
      if (this.isEditMode && this.glId) {
        const updatedGlAccount: GlAccount = {
          ...this.glAccountForm.value,
          id: parseInt(this.glId),
          document: this.pdfSrc,
          documentName: this.fileName || undefined
        };
        this.dataService.updateGlAccount(updatedGlAccount);
      } else {
        const newGlAccount: GlAccount = {
          ...this.glAccountForm.value,
          id: Date.now(),
          document: this.pdfSrc,
          documentName: this.fileName || undefined
        };
        this.dataService.addGlAccount(newGlAccount);
      }
      this.glAccountForm.reset({type: 'debit'});
      this.pdfSrc = null;
      this.fileName = null;
    }
  }

  onSubmitAndClose(): void {
    if (this.glAccountForm.valid) {
      if (this.isEditMode && this.glId) {
        const updatedGlAccount: GlAccount = {
          ...this.glAccountForm.value,
          id: parseInt(this.glId),
          document: this.pdfSrc,
          documentName: this.fileName || undefined
        };
        this.dataService.updateGlAccount(updatedGlAccount);
      } else {
        const newGlAccount: GlAccount = {
          ...this.glAccountForm.value,
          id: Date.now(),
          document: this.pdfSrc,
          documentName: this.fileName || undefined
        };
        this.dataService.addGlAccount(newGlAccount);
      }
      this.location.back();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
