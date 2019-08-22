import { Component, OnInit } from '@angular/core';
import { ProcessHTTPService } from '../services/process-http.service';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, pipe,throwError } from 'rxjs';
import { delay,map } from 'rxjs/operators';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  people:any=[];
  species:any=[];
  movies:any=[];
  error;

  birthForm;
  range= {
    start: '',
    end: '',
    syt: '',
    eyt: ''
  };

  constructor(public processHttp : ProcessHTTPService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    $('#movies').click(function(){
      $('.movie').toggleClass('active');
    });
    $('#species').click(function(){
      $('.specie').toggleClass('active');
    })
    this.getpeople();
    this.getSpecies();
    this.getMovies();
  }

  getpeople() {
    this.processHttp.getPeople().subscribe((data: any) => {
      console.log(data.results);
      this.people = data.results;
    },
      (error) => {
        if(error) this.router.navigate(['/error']);
        this.error=error
      }
    );
  }
  getSpecies() {
    this.processHttp.getSpecies().subscribe((data: any) => {
      console.log(data.results);
      this.species = data.results;
    },
      (error) => {
        if(error) this.router.navigate(['/error']);
        this.error=error
      });
  }
  getMovies() {
    this.processHttp.getMovies().subscribe((data: any) => {
      console.log(data.results);
      this.movies = data.results;
    },
      (error) => {
        if(error) this.router.navigate(['/error']);
        this.error=error
      });
  }
  profileDetails(url){
    let id = url.split('/')[5];
    console.log(id);
    this.router.navigate(['/profile',id]);
  }

  selectChar(arr:any){
    console.log(arr);
    let char_id=[];
    let char=[];
    for (let people_url of arr) {
      let id = this.processHttp.getPeopleIdByLink(people_url);
      char_id.push(id);
    }
    for(let Id of char_id){
      let link = "https://swapi.co/api/people/"+Id+"/";
      this.processHttp.getPeopleByLink(link).subscribe((data)=>{
        char.push(data);
      })
    }
    console.log(char);
    console.log("charkljds;fkasjd;fklsdj");
    this.people= char;
  }
  
  onSubmit(){
    console.log(this.range);
    let char=[]
    let birth=[];
    let r_birth=[];
    let start_date;
    let end_date;

    if(this.range.syt === 'bby') start_date = -parseInt(this.range.start);
    else start_date = parseInt(this.range.start);
    if(this.range.eyt === 'bby') end_date = -parseInt(this.range.end);
    else end_date = parseInt(this.range.end);
    if(start_date >= end_date){
      alert('Range is not valid');
      return false;
    }
    console.log(start_date, end_date);
    for(let ppl of this.people){
      var st;
      var sy;
      let len= ppl.birth_year.length;
      st= ppl.birth_year.slice(len-3,len);
      sy= ppl.birth_year.slice(0,len-3);
      console.log(st,sy);
      if(st==="BBY") birth.push(-parseInt(sy));
      else birth.push(parseInt(sy));
    }
      console.log(birth);
      birth.sort();
      for(let date of birth){
        if(date>start_date && date<end_date){
           if(date<0) r_birth.push((-date).toString()+'BBY');
           else r_birth.push((date).toString()+'ABY'); 
        }
        console.log(date, start_date, end_date);
      }
      console.log(r_birth);

      for(let ppl of this.people){
        for(let d of r_birth){
         if(ppl.birth_year === d && (char.indexOf(ppl) == -1)) {
           console.log(ppl);
             char.push(ppl);
         }
        }
      }
      if (char.length==0){
        alert("No Characters Found");
        return false;
      }

      this.people=char;
  }




}
