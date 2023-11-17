import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
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
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    logo: ['', [Validators.required]],
    date_release: [null, [Validators.required]],
    date_revision: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resFormService: RegistrationFormService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  get id() {
    return this.registerForm.controls.id;
  }

  get name() {
    return this.registerForm.controls.name;
  }

  get description() {
    return this.registerForm.controls.description;
  }

  get logo() {
    return this.registerForm.controls.logo;
  }

  get date_release() {
    return this.registerForm.controls.date_release;
  }

  get date_revision() {
    return this.registerForm.controls.date_revision;
  }

  submitForm() {
    if (this.registerForm.valid) {
      console.log('LLamar al servicio de registro');
      this.resFormService
        .postData(this.registerForm.value)
        .subscribe((response) => {
          console.log('Operación completada con éxito', response);
        
        // Después de agregar un nuevo producto, notificar a los suscriptores
        this.productService.getData().subscribe({
          next: (productData) => {
            this.productService.productDataSubject.next(productData || []);
          },
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            console.log('Notificación completa');
          },
        });
          this.router.navigateByUrl('');
          this.registerForm.reset();
        });
    } else {
      alert('error al ingesar los datos');
      this.registerForm.markAllAsTouched();
    }
  }

  limpiarFormulario() {
    this.registerForm.reset();
  }
}
