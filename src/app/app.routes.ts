import { Routes } from '@angular/router';
import { TemplateListComponent } from './client/template-list/template-list.component';
import { GlAccountComponent } from './client/gl-account/gl-account.component';


export const routes: Routes = [
    { path: '', redirectTo: 'client/template', pathMatch: 'full' },
    {
        path: 'client',
        data: { breadcrumb: 'Client' },
        children: [
            {
                path: 'template',
                data: { breadcrumb: 'Template' },
                children: [
                    {
                        path: '',
                        component: TemplateListComponent
                    },
                    {
                        path: ':id/gl-accounts/create',
                        data: { breadcrumb: 'Create GL Account' },
                        component: GlAccountComponent
                    },
                    {
                        path: ':id/gl-accounts/edit/:glId',
                        data: { breadcrumb: 'Edit GL Account' },
                        component: GlAccountComponent
                    }
                ]
            }
        ]
    }
];
