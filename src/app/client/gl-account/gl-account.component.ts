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
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

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

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private dataService: DataService) {
    this.glAccountForm = this.fb.group({
      glAccount: ['', Validators.required],
      type: ['debit', Validators.required],
      offset: ['', Validators.required],
      document: [null],
      description: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (e: any) => { this.pdfSrc = new Uint8Array(e.target.result); };
        reader.readAsArrayBuffer(file);
        this.glAccountForm.patchValue({ document: file });
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

  onSubmitAndAddNew(): void {
    if (this.glAccountForm.valid) {
      console.log('Form Submitted and Add New:', this.glAccountForm.value);
      const glAccount = this.glAccountForm.getRawValue();
      this.dataService.addGlAccount(glAccount);
      this.glAccountForm.reset({ type: 'debit' });
      this.pdfSrc = null;
      this.fileName = null;
    }
  }

  onSubmitAndClose(): void {
    if (this.glAccountForm.valid) {
      console.log('Form Submitted and Close:', this.glAccountForm.value);
      const glAccount = this.glAccountForm.getRawValue();
      this.dataService.addGlAccount(glAccount);
      this.router.navigate(['/client/template']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
