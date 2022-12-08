import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { ProjectModel } from './project.model';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
 


  formValue!: FormGroup;
  formValue1!: FormGroup;

  projectobj: ProjectModel = new ProjectModel;

  allproject: any;

  btnUpdateShow: boolean = false;
  shortLink: string = "";
  btnSaveShow: boolean = true;
  file : any;
  
  selectedId!: string;
  httpClient: any;
exampleModal1: any;
  


 




  constructor(private formBuilder: FormBuilder, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      imageURL: [''],
      description: [''],
      file: File,

    })

    this.formValue1 = this.formBuilder.group({
      id: [''],
      file: [''],

    })
    this.AllProject();
  }

  AddProject() {
    this.projectobj.imageURL = this.formValue.value.imageURL;
    this.projectobj.title = this.formValue.value.title;
    this.projectobj.description = this.formValue.value.description;
    this.projectobj.file=this.formValue.value.file;





  


    this.api.postProject(this.projectobj).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
      },
      complete: () => {
        console.log('complete')
        alert("Data Saved")
        this.AllProject();
        this.formValue.reset();
      }
    })

  }






  AllProject() {
    this.api.getProject().subscribe(res => {
      this.allproject = res;
    })
  }

  EditProject(data: any) {
    this.formValue.controls['title'].setValue(data.title);
    this.formValue.controls['imageURL'].setValue(data.imageURL);
    this.formValue.controls['description'].setValue(data.description);
    this.projectobj.id = data.id;
    this.projectobj.file = data.file;

 

    this.UpdateShowBtn();
  }

  UpdateProject() {
    this.projectobj.title = this.formValue.value.title;
    this.projectobj.imageURL = this.formValue.value.imageURL;
    this.projectobj.description = this.formValue.value.description;
    


    this.api.putProject(this.projectobj, this.projectobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllProject();
      this.SaveShowBtn();
    })


  }





  DeleteProject(data: any) {
    this.api.deleteProject(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllProject();
    })

  }

  UpdateShowBtn() {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn() {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }





  onChange(event: any) {
    this.file = event.target.files[0];
}


open(tryform:any ,project: ProjectModel){
  
    this.selectedId = project.id;

    
  console.log(this.selectedId)
    // this.modalService.open(tryform, this.selectedId);
}



onUpload() {
  console.log(this.formValue1.getRawValue())
  // console.log(this.file);
  // this.api.upload(this.file).subscribe((res: any) => {
  //   alert("Record Uploaded");
  //     }
  // );
}




  
}





