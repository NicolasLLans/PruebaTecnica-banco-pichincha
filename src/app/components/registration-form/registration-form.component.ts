import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationFormService } from 'src/app/services/registration-form.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  registerForm = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    logo: ['', [Validators.required]],
    fechaLiberacion: [null, [Validators.required]],
    fechaRevision: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, private resFormService : RegistrationFormService) {}

  ngOnInit(): void {}

  get id() {
    return this.registerForm.controls.id;
  }

  get nombre() {
    return this.registerForm.controls.nombre;
  }

  get descripcion() {
    return this.registerForm.controls.descripcion;
  }

  get logo() {
    return this.registerForm.controls.logo;
  }

  get fechaLiberacion() {
    return this.registerForm.controls.fechaLiberacion;
  }

  get fechaRevision() {
    return this.registerForm.controls.fechaRevision;
  }

  submitForm() {
    if (this.registerForm.valid) {
      console.log('LLamar al servicio de registro');
      this.resFormService.postData(this.registerForm.value)
      this.router.navigateByUrl('');
      this.registerForm.reset();
    } else {
      alert('error al ingesar los datos');
      this.registerForm.markAllAsTouched();
    }
  }

  limpiarFormulario() {
    this.registerForm.reset();
  }
}
