import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = [...this.createBreadcrumbs(this.activatedRoute.root)];
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet !== 'primary') {
        continue;
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      if (child.snapshot.data['breadcrumb']) {
        if (!breadcrumbs.find(b => b.label === child.snapshot.data['breadcrumb'])) {
          breadcrumbs.push({
            label: child.snapshot.data['breadcrumb'],
            routerLink: nextUrl
          });
        }
      }

      const id = child.snapshot.paramMap.get('id');
      if (id) {
        if (!breadcrumbs.find(b => b.label === id)) {
          breadcrumbs.push({
            label: id,
            routerLink: nextUrl
          });
        }
      }
      
      return this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}
