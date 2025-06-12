import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavItem } from '../nav-item.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-secondary-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatIconModule],
  templateUrl: './secondary-sidebar.component.html',
  styleUrl: './secondary-sidebar.component.css'
})
export class SecondarySidebarComponent {
  menuItems: NavItem[] = [
    {
      label: 'Data',
      // route: '/data',
      icon: 'data_object'
    },
    {
      label: 'Settings',
      // route: '/settings',
      icon: 'settings'
    },
    {
      label: 'Template',
      route: '/client/template',
      icon: 'article'
    },
  ];
}
