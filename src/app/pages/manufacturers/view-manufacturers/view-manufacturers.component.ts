import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-manufacturers',
  templateUrl: './view-manufacturers.component.html',
  styleUrls: ['./view-manufacturers.component.css']
})
export class ViewManufacturersComponent implements OnInit {

  data:any[];
  constructor() {
    this.data=[
      {
        "code": "000",
        "nameEn": "Al Duraa",
        "nameAr": "الدرة",
        "creationDate": "2018-09-12T07:18:05.741Z",
        "id": "5b98bdad41477e4d8958bc3b"
      },
      {
        "code": "000",
        "nameEn": "Delta",
        "nameAr": "دلتا",
        "creationDate": "2018-09-12T07:18:05.741Z",
        "id": "5b98bdad41477e4d8958bc3c"
      },
      {
        "code": "000",
        "nameEn": "Al Burj",
        "nameAr": "البرج",
        "creationDate": "2018-09-12T07:18:05.742Z",
        "id": "5b98bdad41477e4d8958bc3d"
      },
      {
        "code": "000",
        "nameEn": "Bassmeh",
        "nameAr": "بسمة",
        "creationDate": "2018-09-12T07:18:05.742Z",
        "id": "5b98bdad41477e4d8958bc3e"
      },
      {
        "code": "000",
        "nameEn": "Bustan",
        "nameAr": "البستان",
        "creationDate": "2018-09-12T07:18:05.742Z",
        "id": "5b98bdad41477e4d8958bc3f"
      }
    ];
  }

  ngOnInit() {
  }

}
