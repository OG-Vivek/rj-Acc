import { Routes } from '@angular/router';
import { TemplateListComponent } from './client/template-list/template-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'client/template', pathMatch: 'full' },
    {
        path: 'client',
        data: { breadcrumb: 'Client' },
        children: [
            {
                path: 'template',
                component: TemplateListComponent,
                data: { breadcrumb: 'Template' }
            }
        ]
    }
];
