import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from './services/settings.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  exports: [CommonModule, NgbModule, ReactiveFormsModule],
  providers: [SettingsService],
})
export class SharedModule {}
