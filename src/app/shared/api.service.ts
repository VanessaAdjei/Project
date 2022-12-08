import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Data } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup, FormControl, Validators} from '@angular/forms';


const baseUrl = environment.baseUrl;






@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpClient: any;


 




  constructor(private _http:HttpClient) { }

  postProject(data:any)
  {
    return this._http.post<any>(baseUrl + 'blogs/new',data).pipe(map((res:any)=> {
      return res
    }))
  }


    getProject()
    {
      return this._http.get<any>(baseUrl + 'blogs/all').pipe(map((res:any)=> {
        return res
      }))
    }


  putProject(data:any, id:any)
  {
    return this._http.post<any>(baseUrl + 'blogs/' + id,data).pipe(map((res:any)=> {
      return res
    }))
  }



  
  deleteProject(id:any)
  {
    return this._http.delete<any>(baseUrl + 'blogs/' + id).pipe(map((res:any)=> {
      return res
    }))
  }



  upload(file:any, ){
    const formData = new FormData(); 
    formData.append("file", file, file.title);
    return this._http.post<any>(baseUrl + 'blogs/image', formData)
  }

}