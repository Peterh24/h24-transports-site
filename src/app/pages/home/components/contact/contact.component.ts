import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact, JsonFormControls } from '@app/models/backend/components/contact';
import { GlobalService } from '@app/services/global';
import { Observable, take } from 'rxjs';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit  {
  public form: FormGroup = this.fb.group({});
  public datas$: Observable<Contact>;
  public id: string;

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);

    this.datas$.pipe(take(1)).subscribe(data => {
      this.createForm(data.list);
    })
  }

  createForm(controls: JsonFormControls[]){
      for (const control of controls) {
        const validatorsToAdd:any = [];
        for (const [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case 'min':
              validatorsToAdd.push(Validators.min(value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(value));
              break;
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'requiredTrue':
              if (value) {
                validatorsToAdd.push(Validators.requiredTrue);
              }
              break;
            case 'email':
              if (value) {
                validatorsToAdd.push(Validators.email);
              }
              break;
            case 'minLength':
              validatorsToAdd.push(Validators.minLength(value));
              break;
            case 'maxLength':
              validatorsToAdd.push(Validators.maxLength(value));
              break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(value));
              break;
            case 'nullValidator':
              if (value) {
                validatorsToAdd.push(Validators.nullValidator);
              }
              break;
            default:
              break;
          }
        }

        // Ajoutez des contrôles à la FormGroup
        this.form.addControl(
          control.name,
          new FormControl(control.value, validatorsToAdd)
        );
        console.log('form: ', this.form);
      }
  }

  onPatchValue(): void {
    this.form.patchValue({input: 'test'})
  }

  onSubmit(): void {
    console.log('Submit !')
  }

}
