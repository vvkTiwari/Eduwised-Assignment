import { Component, OnInit } from '@angular/core';
import { ProcessHTTPService } from '../services/process-http.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { delay,map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   id;
   error;
   userData;
   movies=[];
   vehicles=[];
   starships=[];
   movie_links=[];
   vehicle_links=[];
   starships_links=[];

  constructor(private router: ActivatedRoute, private processHttp: ProcessHTTPService, private route: Router) { }

  ngOnInit() {
  	
  	this.router.paramMap.subscribe(params => {
		  this.id = params.get('id');
	  })
  	console.log(this.id);
  	this.fetchUserData();
  }

  getStarships(){
    console.log(this.starships_links);
    for(var i=0 ;i<this.starships_links.length;i++){
      this.processHttp.getPeopleByLink(this.starships_links[i]).subscribe((data)=>{
        this.starships.push(data);
      },
      (error) => {
        if(error) this.route.navigate(['/error']);
        this.error=error
      })
    }
  }
  getMovies(){
    console.log(this.movie_links);
    for(var i=0 ;i<this.movie_links.length;i++){
      this.processHttp.getPeopleByLink(this.movie_links[i]).subscribe((data)=>{
        this.movies.push(data);
      },
      (error) => {
        if(error) this.route.navigate(['/error']);
        this.error=error
      })
    }
  }
    getVehicles(){
    console.log(this.vehicle_links);
    for(var i=0 ;i<this.vehicle_links.length;i++){
      this.processHttp.getPeopleByLink(this.vehicle_links[i]).subscribe((data)=>{
        this.vehicles.push(data);
      },
      (error) => {
        if(error) this.route.navigate(['/error']);
        this.error=error
      })
    }
  }
  fetchUserData(){
  	let url = 'https://swapi.co/api/people/' + this.id + '/';
  	this.processHttp.getPeopleByLink(url).subscribe((data)=>{
  		this.userData = data;
      this.movie_links = this.userData.films;
      this.vehicle_links = this.userData.vehicles;
      this.starships_links = this.userData.starships;
      this.getStarships();
      this.getMovies();
      this.getVehicles();
    });
  }
}
