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
import { DataService, GlAccount } from '../../services/data.service';
import { MatIconModule } from '@angular/material/icon';

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
    MatRadioModule,
    MatIconModule
  ],
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  templateForm: FormGroup;
  isEditMode = false;
  templateId: string | null = null;
  types: any[] = [{ label: 'Type A', value: 'A' }, { label: 'Type B', value: 'B' }];
  frequencies: any[] = [{ label: 'Monthly', value: 'monthly' }, { label: 'Quarterly', value: 'quarterly' }, { label: 'Yearly', value: 'yearly' }];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      frequency: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id');
    if (this.templateId) {
      this.isEditMode = true;
      this.dataService.getTemplateById(this.templateId).subscribe(template => {
        if (template) {
          this.templateForm.patchValue(template);
        }
      });
    }
  }

  saveAndClose() {
    if (this.templateForm.valid) {
      if (this.isEditMode && this.templateId) {
        this.dataService.updateTemplate({ id: this.templateId, ...this.templateForm.value, glAccounts: this.dataService.getGlAccounts() });
      } else {
        this.dataService.addTemplate({ ...this.templateForm.value, glAccounts: this.dataService.getGlAccounts() });
      }
      this.router.navigate(['/client/template']);
    }
  }

  saveAndAddNew() {
    if (this.templateForm.valid) {
      if (this.isEditMode && this.templateId) {
        this.dataService.updateTemplate({ id: this.templateId, ...this.templateForm.value });
        this.router.navigate(['/client/template/new']);
      } else {
        this.dataService.addTemplate(this.templateForm.value);
      }
      this.templateForm.reset({ preg: 'yes' });
    }
  }

  addGlAccount() {
    if (this.isEditMode && this.templateId) {
      this.router.navigate([`/client/template/edit/${this.templateId}/gl-accounts/create`]);
    } else {
      this.router.navigate(['/client/template/new/gl-accounts/create']);
    }
  }

  editGlAccount(glAccount: GlAccount) {
    if (this.isEditMode && this.templateId) {
      this.router.navigate([`/client/template/edit/${this.templateId}/gl-accounts/edit/${glAccount.id}`]);
    } else {
      this.router.navigate([`/client/template/new/gl-accounts/edit/${glAccount.id}`]);
    }
  }

  removeGlAccount(id: number) {
    this.dataService.removeGlAccount(id);
  }
}
