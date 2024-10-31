import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CardModule, ButtonModule, AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
