import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public items:any;
  result:any= [];
  data: Observable<any>;

  constructor( private http: HttpClient ) { 
    this.loadData( event );
  }

  ngOnInit() {
    
  }

  loadData( event ){
    var url = "http://nowipicks.com/push/ios/getPicks.php?cda=8RXC-N3E9-LRDX-MWZ5";
    this.data = this.http.get(url);
    this.data.subscribe(result =>{
      this.items = result;
      console.log(result);
    })

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  

}
