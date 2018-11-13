import {Component, OnInit} from '@angular/core';
import {Area} from '../area';
import {AreaHandlerService} from '../area-handler.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-areas',
  templateUrl: './list-areas.component.html',
  styleUrls: ['./list-areas.component.css']
})
export class ListAreasComponent implements OnInit {


  nameArOrderDir;
  nameEnOrderDir;
  createdAtOrderDir;
  creationDateCode: number;
  requestProcess = false;
  areaToUpdate = null;
  allAreas: Area[] = [];
  originalAreas: Area[] = [];
  currentPage = 4;
  page: number;
  returnedArray: Area[] = [];
  currentArray: Area[] = [];
  pages = 10;


  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.allAreas.slice(startItem, endItem);
    this.currentArray=this.returnedArray;
  }

  constructor(private areaHandler:AreaHandlerService, private router: Router) {
    this.getAllArea();
  }

  editArea(id: string) {
    this.router.navigate(['/areas/edit/' + id]);
  }

  orderByNameAr() {
    if (this.nameArOrderDir == undefined) {
      this.nameArOrderDir = this.nameEnOrderDir =this.createdAtOrderDir= undefined;

    }
    if (this.nameArOrderDir) {
      this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() < b.nameAr.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.nameAr.toLowerCase() > b.nameAr.toLowerCase() ? -1 : 1);
    }
    this.nameArOrderDir = !this.nameArOrderDir;

  }

  orderByNameEn() {
    if (this.nameEnOrderDir == undefined) {
      this.nameArOrderDir = this.nameEnOrderDir =this.createdAtOrderDir= undefined;

    }
    if (this.nameEnOrderDir) {
      this.returnedArray.sort((a, b) => a.nameEn.toLowerCase() < b.nameEn.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.nameEn.toLowerCase() > b.nameEn.toLowerCase() ? -1 : 1);
    }
    this.nameEnOrderDir = !this.nameEnOrderDir;

  }


  orderByCreatedAt() {
    if (this.createdAtOrderDir == undefined) {
      this.nameArOrderDir = this.nameEnOrderDir =this.createdAtOrderDir= undefined;


    }
    if (this.createdAtOrderDir) {
      this.returnedArray.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.creationDate < b.creationDate ? -1 : 1);
    }
    this.createdAtOrderDir = !this.createdAtOrderDir;

  }


  filterByfield(set: any[], field: string, value: string) {

    let f = set.filter(it => it[field].toLowerCase().includes(value));

    return f;
  }

  filterBox(event) {
    let value = event.target.value;
    this.returnedArray = this.currentArray;
    let as: Area[] = [];
    let fields = ['nameAr', 'nameEn', 'creationDate'];
    for (let field of fields) {
      for (let t of this.filterByfield(this.returnedArray, field, value)) {
        if (!as.includes(t)) {
          as.push(t);
        }
      }
    }
    this.returnedArray = as;

  }

  getAllArea() {
    this.areaHandler.getAllAreas()
      .finally(() => {
        this.returnedArray = this.allAreas.slice(0, this.pages);
        this.currentArray = this.returnedArray;
      })
      .subscribe(data => {
          // for (let area of data) {
          //   if (area.nameEn != undefined) {
          //     let uid = area.nameEn;
          //     area.nameEn = this.allAreas.find(x => x.id === uid).nameAr;
          //
          //   } else {
          //     area.nameEn = '';
          //   }
          //
          // }

          this.allAreas = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);
          this.originalAreas = this.allAreas;
        }
        , errorCode => this.creationDateCode = errorCode);


  }

  //
  // deleteArea(id: string) {
  //
  //   this.preConfig();
  //   this.areaHandler.getAreaById(id)
  //     .subscribe(area => {
  //         this.areaToUpdate = area;
  //         this.areaToUpdate.creationDate = 'deactivated';
  //
  //         this.areaHandler.updateArea(this.areaToUpdate).subscribe(
  //           successCode => {
  //             this.creationDateCode = 200;
  //             this.allAreas = this.originalAreas;
  //             // this.backToCreateArticle();
  //           },
  //           errorCode => this.creationDateCode = errorCode
  //         );
  //       },
  //       errorCode => this.creationDateCode = errorCode);
  //
  // }

  changepages(event) {
    this.pages = event.target.value;
    this.returnedArray = this.allAreas.slice(0, this.pages);
    this.currentArray=this.returnedArray;
    setTimeout(()=> {
      this.currentPage=1;
    }, 50);



  }

  ngOnInit() {
  }

  preConfig() {
    this.creationDateCode = null;
    this.requestProcess = true;
  }

}
