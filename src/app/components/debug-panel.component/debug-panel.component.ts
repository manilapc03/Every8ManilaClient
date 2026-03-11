import { Component, input, computed } from '@angular/core';
import { FieldState } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.scss'],
  imports: [JsonPipe]
})
export class DebugPanelComponent {
  readonly form = input.required<FieldState<unknown>>();
  readonly formValue = computed(() => this.form().value());
  readonly formValid = computed(() => this.form().valid());
}

