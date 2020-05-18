import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LangtranslateComponent } from 'app/langtranslate/langtranslate.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'langtransalte',      component: LangtranslateComponent },
];
