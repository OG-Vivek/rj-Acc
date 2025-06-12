import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface GlAccount {
    id: number;
    glAccount: string;
    offset: string;
    description: string;
    documentURL: string;
}

export interface Template {
    id: number;
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
        { id: 1, name: 'Template 1', reference: 'Reference 1', frequency: 'Frequency 1', type: 'Type 1', glAccounts: [] },
        { id: 2, name: 'Template 2', reference: 'Reference 2', frequency: 'Frequency 2', type: 'Type 2', glAccounts: [] },
        { id: 3, name: 'Template 3', reference: 'Reference 3', frequency: 'Frequency 3', type: 'Type 3', glAccounts: [] },
    ];

    constructor() { }

    getGlAccounts(): GlAccount[] {
        return this.glAccounts;
    }

    addGlAccount(glAccount: GlAccount) {
        this.glAccounts.push(glAccount);
    }

    getTemplates(): Template[] {
        return this.templates;
    }
}
