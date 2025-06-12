import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Template, TemplateService } from '../template.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
export class TemplateListComponent implements OnInit {
  templates$!: Observable<Template[]>;

  constructor(public dialog: MatDialog, private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templates$ = this.templateService.getTemplates();
  }

  deleteTemplate(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure that you want to delete this template?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.templateService.deleteTemplate(id);
      }
    });
  }
}
