import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact, JsonFormControls } from '@app/models/backend/components/contact';
import { GlobalService } from '@app/services/global';
import { Observable, take } from 'rxjs';
import { regex, regexErrors } from '@app/shared/utils/regex';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit  {
  public form: FormGroup = this.fb.group({});
  public datas$: Observable<Contact>;
  public id: string;
  public regex: any = regex;
  public regexErrors: any = regexErrors;
  public message: any = {
    validation: '',
    error: ''
  }
  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.datas$ = this.globalService.getDataComponent(this.id);

    this.datas$.pipe(take(1)).subscribe(data => {
      this.createForm(data.list);
    })
  }

  createForm(controls: JsonFormControls[][]){
    for (const row of controls) {
      for (const control of row) {
        const validatorsToAdd: any[] = [];
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
              if (value && this.regex[value]) {
                validatorsToAdd.push(Validators.pattern(new RegExp(this.regex[value])));
              }
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
        // Ajouter le contrôle à la FormGroup
        this.form.addControl(control.name, new FormControl(control.value, validatorsToAdd));
      }
    }
  }

  onPatchValue(): void {
    this.form.patchValue({input: 'test'})
  }

  onSubmit(): void {
    console.log('Submit !:', this.form.value)
    const apiUrl = 'https://127.0.0.1:8000/fr/api/send-email';
    this.http.post(apiUrl, this.form.value)
    .subscribe({
      next: (response) => {
        this.message.validation = 'Ok! Message send';
      },
      error: (error) => {
        this.message.error = 'Failed ! Your message was not send please try again later';
      }
    });

  }

}
