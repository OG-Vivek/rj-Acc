import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavItem } from '../nav-item.model';

@Component({
  selector: 'app-secondary-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule],
  templateUrl: './secondary-sidebar.component.html',
  styleUrl: './secondary-sidebar.component.css'
})
export class SecondarySidebarComponent {
  menuItems: NavItem[] = [
    {
      label: 'Template',
      route: '/client/template',
      icon: 'article'
    }
  ];
}
