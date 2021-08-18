import { Component, ElementRef, ViewChild } from '@angular/core';
import { DialogConfig, DialogRef } from '@tylertech/tyler-components-web-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-save',
  templateUrl: './search-save.component.html',
  styleUrls: ['./search-save.component.scss']
})
export class SearchSaveComponent {
  @ViewChild('name') nameElement: ElementRef;
  public record: {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    isPublic: boolean;
    filters: { property: string; value: string }[];
  };
  public formGroup: FormGroup;

  constructor(public dialogConfig: DialogConfig, private dialogRef: DialogRef) {
    this.record = dialogConfig.data;

    this.initializeFormGroup();
  }

  public isInvalid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl.invalid && formControl.touched;
  }

  public save() {
    this.dialogRef.close(this.parseFormGroup());
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  private initializeFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.record.name, { validators: [Validators.required] }),
      description: new FormControl(this.record.description),
      isDefault: new FormControl(this.record.isDefault),
      isPublic: new FormControl(this.record.isPublic)
    });
    window.requestAnimationFrame(() => {
      this.nameElement.nativeElement.focus();
    });
  }

  private parseFormGroup() {
    return {
      id: this.record.id,
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
      isDefault: this.formGroup.get('isDefault').value,
      isPublic: this.formGroup.get('isPublic').value,
      filters: this.record.filters
    };
  }
}
