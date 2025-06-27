import { Routes } from '@angular/router';
import { Dashboard1 } from './pages/dashboards/dashboard1/dashboard1';
import { Sidebar } from './shared/sidebar/sidebar';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard1,
        title: 'Admin dashboard',
    },
    {
        path: 'dashboard1',
        component: Dashboard1,
        title: 'Admin dashboard',
    },
    {
        path: 'sidebar',
        component: Sidebar,
        title: 'Sidebar',
    },
];
