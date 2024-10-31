import { Matcher } from './../../node_modules/@angular/compiler-cli/node_modules/chokidar/index.d';
import { Path } from './../../node_modules/@angular/compiler-cli/node_modules/chokidar/esm/handler.d';
import { PathOrDirent } from './../../node_modules/@angular/compiler-cli/node_modules/readdirp/esm/index.d';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { CarreraComponent } from './carrera/carrera.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'alumno',
    component: AlumnoComponent,
    title: 'Alumno'
  },
  {
    path: 'carrera',
    component: CarreraComponent,
    title: 'Carrera'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];
