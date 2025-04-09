import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbCardModule, NbLayoutModule } from "@nebular/theme";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NbLayoutModule, NbCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'channel';
}
