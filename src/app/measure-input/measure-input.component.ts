import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { FeetInchPipe } from '../feet-inch.pipe';

@Component({
  selector: 'measure-input',
  templateUrl: './measure-input.component.html',
  styleUrls: ['./measure-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MeasureInputComponent,
      multi: true
    },
    FeetInchPipe
  ]
})
export class MeasureInputComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() inputValue: string;
  @Input() isDisabled: boolean;
  @Output() readonly value: EventEmitter<string> = new EventEmitter<string>();

  public input = new FormControl('', [Validators.pattern(/^[0-9]+(\.)*[0-9]+$/)]);

  public onChange: (_: string) => void;
  public onTouched: VoidFunction;
  private originalValue;

  constructor(private feetPipe: FeetInchPipe) { }

  ngOnInit() {
    this.input.setValue(this.inputValue || '');
    this.input.valueChanges.subscribe(value => {
      if (value) {
        this.originalValue = value;
        this.onChange(this.input.value);
      }
    });
  }

  public writeValue(value: string): void {
    if (value) {
      const transientData = this.feetPipe.transform(this.input.value);
      this.input.setValue(transientData, { emitEvent: false });
    }
  }

  public registerOnChange(callback: (_: string) => void): void {
    this.onChange = callback;
  }

  public registerOnTouched(callback: VoidFunction): void {
    this.onTouched = callback;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public translate() {
    this.onTouched();
    const transientData = this.feetPipe.transform(this.originalValue);
    this.input.patchValue(transientData, { onlySelf: true, emitEvent: false });
  }

  public onFocus() {
    this.input.patchValue(this.originalValue, { onlySelf: true, emitEvent: false });
  }
}
