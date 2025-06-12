import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  templateForm: FormGroup;
  isEditMode = false;
  templateId: string | null = null;
  types: any[] = [{ label: 'Type A', value: 'A' }, { label: 'Type B', value: 'B' }];
  jgAccounts = [
    { id: '1', name: 'Account 1' },
    { id: '2', name: 'Account 2' },
    { id: '3', name: 'Account 3' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private templateService: TemplateService
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
      preg: ['yes', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id');
    if (this.templateId) {
      this.isEditMode = true;
      this.templateService.getTemplateById(this.templateId).subscribe(template => {
        if (template) {
          this.templateForm.patchValue(template);
        }
      });
    }
  }

  saveAndClose() {
    if (this.templateForm.valid) {
      if (this.isEditMode && this.templateId) {
        this.templateService.updateTemplate({ id: this.templateId, ...this.templateForm.value });
      } else {
        this.templateService.addTemplate(this.templateForm.value);
      }
      this.router.navigate(['/client/template']);
    }
  }

  saveAndAddNew() {
    if (this.templateForm.valid) {
      if (this.isEditMode && this.templateId) {
        this.templateService.updateTemplate({ id: this.templateId, ...this.templateForm.value });
        this.router.navigate(['/client/template/new']);
      } else {
        this.templateService.addTemplate(this.templateForm.value);
      }
      this.templateForm.reset({ preg: 'yes' });
    }
  }
}
