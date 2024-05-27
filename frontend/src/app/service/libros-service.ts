import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { apis } from '../../env/env';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  constructor(private http: HttpClient, private auth: OAuthService) {}

  obtenerLibros(): Observable<any> {
    let url = apis.obtener_libros;

    return this.http.get(url, {
      headers: new HttpHeaders({
      }),
    });
  }

  

  subirLibro(body: any): Observable<any> {
    let url = apis.subir_libro;
    return this.http
      .post<string[]>(
        url,
        {
          body,
        },
        {
          headers: new HttpHeaders({
          }),
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          console.error(
            'Error al subir el libro',
            error
          );
          return [];
        })
      );
  }

  subirResena(id:any,body: any): Observable<any> {
    let url = apis.subir_resena+'/'+id+'/resenas';
    return this.http
      .post<string[]>(
        url,
        {
          body,
        },
        {
          headers: new HttpHeaders({
          }),
        }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((error: any) => {
          console.error(
            'Error al subir la resenas',
            error
          );
          return [];
        })
      );
  }

  eliminarLibro(id: number): Observable<any> {
    let url = apis.borrar_libro+'/'+id
    return this.http
      .delete<string[]>(url, {
        headers: new HttpHeaders({
        }),
      })
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((error: any) => {
          console.error('Error al eliminar la reseña', error);
          return [];
        })
      );
  }

  modificarLibro(id: number, body: any): Observable<any> {
    let url = apis.editar_libro
    return this.http
      .put<string[]>(url, body, {
        headers: new HttpHeaders({
          // Agrega cualquier encabezado necesario
        }),
      })
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((error: any) => {
          console.error('Error al modificar la reseña', error);
          return [];
        })
      );
  }
}
