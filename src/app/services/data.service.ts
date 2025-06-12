import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface GlAccount {
    id: number;
    glAccount: string;
    type: string;
    offset: string;
    description: string;
    document?: any;
    documentName?: string;
}

export interface Template {
    id: string;
    name: string;
    reference: string;
    frequency: string;
    type: string;
    glAccounts: GlAccount[];
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private glAccounts: GlAccount[] = [];

    private templates: Template[] = [
        { id: '1', reference: 'Reference 1', name: 'Template A', type: 'sales', frequency: 'monthly', glAccounts: [] },
        { id: '2', reference: 'Reference 2', name: 'B', type: 'cc', frequency: 'quarterly', glAccounts: [] },
        { id: '3', reference: 'Reference 3', name: 'C', type: 'payroll', frequency: 'yearly', glAccounts: [] }
    ];

    private templates$ = new BehaviorSubject<Template[]>(this.templates);

    public templateValue: any | null = null;

    getTemplates(): Observable<Template[]> {
        return this.templates$.asObservable();
    }

    getTemplateById(id: string): Observable<Template | undefined> {
        return of(this.templates.find(t => t.id === id));
    }

    addTemplate(template: Omit<Template, 'id'>) {
        const newTemplate: Template = {
            ...template,
            id: Date.now().toString()
        };
        this.templates = [...this.templates, newTemplate];
        this.templates$.next(this.templates);
    }

    updateTemplate(updatedTemplate: Template) {
        const index = this.templates.findIndex(t => t.id === updatedTemplate.id);
        if (index > -1) {
            this.templates[index] = updatedTemplate;
            this.templates$.next([...this.templates]);
        }
    }

    deleteTemplate(id: string) {
        this.templates = this.templates.filter(t => t.id !== id);
        this.templates$.next(this.templates);
    }

    constructor() { }

    getGlAccountById(id: number): Observable<GlAccount | undefined> {
        return of(this.glAccounts.find(g => g.id === id));
    }

    getGlAccounts(): GlAccount[] {
        return this.glAccounts;
    }

    resetGlAccounts() {
        this.glAccounts = [];
    }

    addGlAccount(glAccount: GlAccount) {
        this.glAccounts.push(glAccount);
    }

    updateGlAccount(updatedGlAccount: GlAccount) {
        const index = this.glAccounts.findIndex(g => g.id === updatedGlAccount.id);
        if (index > -1) {
            this.glAccounts[index] = updatedGlAccount;
        }
    }

    removeGlAccount(id: number) {
        this.glAccounts = this.glAccounts.filter(g => g.id !== id);
    }
}
