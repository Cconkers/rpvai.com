import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { ToastMessageComponent } from './shared/components/toast-message/toast-message.component';
import { SpinnerOverlayComponent } from './shared/components/spinner-overlay.component/spinner-overlay.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, TranslateModule, NavbarComponent, ToastMessageComponent, SpinnerOverlayComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


}
