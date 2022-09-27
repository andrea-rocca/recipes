import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();

  collapsed:boolean;

  constructor() { 
    this.collapsed = true;
  }

  ngOnInit(): void {
  }

  onSelect(feature:string) {
    this.featureSelected.emit(feature);
  }

}
