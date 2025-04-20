import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/spinner-loading.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-spinner-overlay',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})

export class SpinnerOverlayComponent {
  loadingService = inject(LoadingService);
}
