import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavItem } from '../nav-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: NavItem[] = [
    {
      label: 'Client',
      icon: 'group',
      route: '/client/template'
    }
  ];

  onItemSelected(item: NavItem) {
    if (item.children && item.children.length) {
      item.expanded = !item.expanded;
    }
  }
}
