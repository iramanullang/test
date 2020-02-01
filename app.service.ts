import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TokenInterceptor } from './tokeninterceptor';
import { error } from 'util';


/*****************************************************************************
* ABSTRACT MASTER REST SERVICE
******************************************************************************/

export abstract class AbstractMasterRestService {
  constructor(
    protected http: HttpClient,
    protected tokenInterceptor: TokenInterceptor,
    protected actionUrl: string) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // Get ByDataTableParams
  GetByDataTableParams(dataTablesParameters): Observable<any> {
    const body = JSON.stringify(dataTablesParameters);
    return this.http.post<any>(this.actionUrl + '/GetDataTableParams', body, this.httpOptions).pipe(
      map(this.extractData),
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }

  // Get all
  getAll(): Observable<any> {
    return this.http.get(this.actionUrl + '/GetAll').pipe(
      map(this.extractData),
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }

  // Get all Customer Lat&lng data
  getAllWithLatLng(): Observable<any> {
    return this.http.get(this.actionUrl + '/GetAllWithLatLng').pipe(
      map(this.extractData),
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }

  // Get by Id
  get(id): Observable<any> {
    return this.http.get(this.actionUrl + '/' + id).pipe(
      map(this.extractData),
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }

  // Post
  post(item): Observable<any> {
    const body = JSON.stringify(item);
    return this.http.post<any>(this.actionUrl, body, this.httpOptions).pipe(
      tap((success: Response) => { this.tokenInterceptor.successHandling('Data saved successfully'); }),
      catchError((err: Response) => { throw this.tokenInterceptor.errorHandling(err); })
    );
  }

  // Put
  put(id, item): Observable<any> {
    const body = JSON.stringify(item);
    return this.http.put<any>(this.actionUrl + '/' + id, body, this.httpOptions).pipe(
      tap((success: Response) => { this.tokenInterceptor.successHandling('Data updated successfully'); }),
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }

  // Delete
  delete(id): Observable<any> {
    return this.http.delete<any>(this.actionUrl + '/' + id, this.httpOptions).pipe(
      tap((success: Response) => { this.tokenInterceptor.successHandling('Data deleted successfully'); }),
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }
}

/*****************************************************************************
UPLOAD SERVICE
*****************************************************************************/
@Injectable({
  providedIn: 'root'
})
export class UploadService extends AbstractMasterRestService {
  constructor(http: HttpClient, tokenInterceptor: TokenInterceptor) {
    super(http, tokenInterceptor, 'https://mysimplidotsv2.azurewebsites.net/api/' + 'Upload');
  }

  uploadPhoto(file: any): Observable<any> {
    const body = JSON.stringify(file);
    return this.http.put(this.actionUrl + '/Photo', body, this.httpOptions).pipe(
      catchError((error: Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }
}

/*****************************************************************************
EMPLOYEE SERVICE (untuk list salesman)
*****************************************************************************/
@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends AbstractMasterRestService {
  apiUrl: any;
  getSalesmans(): any {
    throw new Error("Method not implemented.");
  }
  constructor(http: HttpClient, tokenInterceptor: TokenInterceptor) {
    super(http, tokenInterceptor, 'https://mysimplidotsv2.azurewebsites.net/api/' + 'Employee');
  }

  EmployeeGetPerformance(agency: number | string, startDate?: Date, endDate?: Date): Observable<any> {
    return this.http.get('http://mysimplidotsv2.azurewebsites.net/api/Employee/GetPerformance' ).pipe(
      catchError((error:Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }

  EmployeeGetPerformanceId(id: string): Observable<any> {
    return this.http.get('http://mysimplidotsv2.azurewebsites.net/api/Employee/GetPerformance' + '/' + id).pipe(
      catchError((error:Response) => { throw this.tokenInterceptor.errorHandling(error); })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends AbstractMasterRestService{
  constructor(http: HttpClient, tokenInterceptor: TokenInterceptor) {
    super(http, tokenInterceptor, 'http://mysimplidotsv2.azurewebsites.net/api/' + 'customer');
  }
}

/*****************************************************************************
EMPLOYEE SERVICE1 (untuk detail salesman)
*****************************************************************************/
// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService1 extends AbstractMasterRestService {
//   constructor(http: HttpClient, tokenInterceptor: TokenInterceptor) {
//     super(http, tokenInterceptor, 'https://mysimplidotsv2.azurewebsites.net/api/' + 'Employee');
//   }

//   EmployeeById(): Observable<any> {
//     return this.http.get('http://mysimplidotsv2.azurewebsites.net/api/Employee/68a1a855-6284-4c66-9dd3-19e78a883540').pipe(
//       catchError((error:Response) => {throw this.tokenInterceptor.errorHandling(error);})
//     );
//   }
// }


// *** MARKING-NEW-SERVICE *** DO NOT DELETE

 // *** END-OF-SERVICE *** DO NOT DELETE
