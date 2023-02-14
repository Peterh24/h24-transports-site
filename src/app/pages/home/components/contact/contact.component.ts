import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '@app/models/backend/components/contact';
import { GlobalService } from '@app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form: FormGroup
  public datas$: Observable<Contact>;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);
    this.form = this.fb.group(
    {
      lastname: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required, Validators.minLength(3)
        ]
      }],
      firstname: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required, Validators.minLength(3)
        ]
      }],
      subject: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required, Validators.minLength(3)
        ]
      }],
      message: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required, Validators.minLength(3)
        ]
      }],
    }
    );
  }

  onPatchValue(): void {
    this.form.patchValue({input: 'test'})
  }

  onSubmit(): void {
    console.log('Submit !')
  }

}
