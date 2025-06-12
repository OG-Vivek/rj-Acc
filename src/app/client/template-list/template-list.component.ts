import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, CardModule],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.css'
})
export class TemplateListComponent {
  templates = [
    { name: 'Template 1', type: 'Type A', preg: 'Preg 1' },
    { name: 'Template 2', type: 'Type B', preg: 'Preg 2' }
  ];
}
