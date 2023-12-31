import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  constructor(private http: HttpClient) {}

  public backUrl: string =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/';

  public postData(product:any): Observable<any> {
    // Definir el encabezado con el Authorization
    const headers = new HttpHeaders({
      authorID: '300',
    });
    // Agregar el encabezado a la solicitud GET
    const options = { headers: headers };
    // Realizar la solicitud HTTP GET con los encabezados
    return this.http
      .post<any>(this.backUrl + 'bp/products',product, options)
      .pipe(catchError(this.handlerError));
  }

   private handlerError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error('Se ha producido un error ', error.error);
    }
    else {
      console.error('Backend retornó el codigo de estado ', error.status,error.error);
    }
    return throwError(()=> new Error('Algo falló. Pro favor intente nuevamente. '));
  }
}
