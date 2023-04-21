import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  aeForm: FormGroup;

  education: string[] = [
    'Cap 1',
    'Cap 2',
    'Cap 3',
    'Cao dang',
    'Dai hoc',
    'Cao hoc',
  ];

  constructor(private _fb: FormBuilder, 
              private _aeService:UserService, 
              private _dialogRef: MatDialogRef<AddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.aeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      gender: '',
      education: '',
      company: '',
    })
  }

  ngOnInit(): void {
    this.aeForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.aeForm.valid) {
      if(this.data) {
        this._aeService.updateUser(this.data.id, this.aeForm.value).subscribe({
          next: (val: any) => {
            alert('User updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }else {
        this._aeService.addUser(this.aeForm.value).subscribe({
          next: (val: any) => {
            alert('User added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
