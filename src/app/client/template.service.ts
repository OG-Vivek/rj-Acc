import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Template {
  id: string;
  name: string;
  description: string;
  type?: any;
  preg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [
    { id: '1', name: 'Template A', description: 'Description for Template A', type: 'A', preg: 'yes' },
    { id: '2', name: 'Template B', description: 'Description for Template B', type: 'B', preg: 'no' },
    { id: '3', name: 'Template C', description: 'Description for Template C', type: 'A', preg: 'yes' }
  ];

  private templates$ = new BehaviorSubject<Template[]>(this.templates);

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
}
