import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../user-model';
import {Router} from '@angular/router';
import {ClientsHandler} from '../clients-handler';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  nameOrderDir;
  areaOrderDir;
  statusOrderDir;
  shopNameOrderDir;
  typeOrderDir;
  phoneNumberOrderDir;
  locationOrderDir;
  statusCode: number;
  requestProcess = false;
  clientToUpdate = null;
  allClient: UserModel[] = [];
  originalClients: UserModel[] = [];
  currentPage = 4;
  page: number;
  returnedArray: UserModel[] = [];
  currentArray: UserModel[] = [];
  pages = 10;
  areas: any[];

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.allClient.slice(startItem, endItem);
    this.currentArray=this.returnedArray;
  }

  constructor(private clientHandler: ClientsHandler, private router: Router) {
    this.clientHandler.getAllAreas().finally(() => this.getAllClient()).subscribe(data => {
        this.areas = data;
      }
      , errorCode => this.statusCode = errorCode);
  }

  editClient(id: string) {
    this.router.navigate(['/client/edit/' + id]);
  }

  orderByName() {
    if (this.nameOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

    }
    if (this.nameOrderDir) {
      this.returnedArray.sort((a, b) => a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? -1 : 1);
    }
    this.nameOrderDir = !this.nameOrderDir;

  }

  orderByArea() {
    if (this.areaOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;
    }
    if (this.areaOrderDir) {
      this.returnedArray.sort((a, b) => a.areaId.toLowerCase() < b.areaId.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.areaId.toLowerCase() > b.areaId.toLowerCase() ? -1 : 1);
    }
    this.areaOrderDir = !this.areaOrderDir;

  }

  orderByLocation() {
    if (this.locationOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;


    }
    if (this.locationOrderDir) {
      this.returnedArray.sort((a, b) => a.location.toLowerCase() < b.location.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.location.toLowerCase() > b.location.toLowerCase() ? -1 : 1);
    }
    this.locationOrderDir = !this.locationOrderDir;

  }

  orderByPhone() {
    if (this.phoneNumberOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

    }
    if (this.phoneNumberOrderDir) {
      this.returnedArray.sort((a, b) => a.phoneNumber < b.phoneNumber ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.phoneNumber > b.phoneNumber ? -1 : 1);
    }
    this.phoneNumberOrderDir = !this.phoneNumberOrderDir;

  }

  orderByType() {
    if (this.typeOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

    }
    if (this.typeOrderDir) {
      this.returnedArray.sort((a, b) => a.clientType < b.clientType ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.clientType > b.clientType ? -1 : 1);
    }
    this.typeOrderDir = !this.typeOrderDir;

  }

  orderByStatus() {
    if (this.statusOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

    }
    if (this.statusOrderDir) {
      this.returnedArray.sort((a, b) => a.status < b.status ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.status > b.status ? -1 : 1);
    }
    this.statusOrderDir = !this.statusOrderDir;

  }

  orderByShope() {
    if (this.typeOrderDir == undefined) {
      this.areaOrderDir = this.nameOrderDir = this.statusOrderDir = this.typeOrderDir = this.phoneNumberOrderDir = this.locationOrderDir = this.phoneNumberOrderDir = undefined;

    }
    if (this.shopNameOrderDir) {
      this.returnedArray.sort((a, b) => a.shopName.toLowerCase() < b.shopName.toLowerCase() ? -1 : 1);

    } else {
      this.returnedArray.sort((a, b) => a.shopName.toLowerCase() > b.shopName.toLowerCase() ? -1 : 1);
    }
    this.shopNameOrderDir = !this.shopNameOrderDir;

  }

  filterByfield(set: any[], field: string, value: string) {

    let f = set.filter(it => it[field].toLowerCase().includes(value));

    return f;
  }

  filterBox(event) {
    let value = event.target.value;
    this.returnedArray = this.currentArray;
    let as: UserModel[] = [];
    let fields = ['username', 'shopName', 'location', 'phoneNumber', 'areaId'];
    for (let field of fields) {
      for (let t of this.filterByfield(this.returnedArray, field, value)) {
        if (!as.includes(t)) {
          as.push(t);
        }
      }
    }
    this.returnedArray = as;

  }

  getAllClient() {
    this.clientHandler.getAllClient()
      .finally(() => {
        this.returnedArray = this.allClient.slice(0, this.pages);
        this.currentArray = this.returnedArray;
        console.log(this.returnedArray);
      })
      .subscribe(data => {
          for (let user of data) {
            if (user.areaId != undefined) {
              let uid = user.areaId;
              user.areaId = this.areas.find(x => x.id === uid).nameAr;

            } else {
              user.areaId = '';
            }

          }

          this.allClient = data.sort((a, b) => a.creationDate > b.creationDate ? -1 : 1);
          this.originalClients = this.allClient;
        }
        , errorCode => this.statusCode = errorCode);


  }


  deleteClient(id: string) {

    this.preConfig();
    this.clientHandler.getClientUserById(id)
      .subscribe(client => {
          this.clientToUpdate = client;
          this.clientToUpdate.status = 'deactivated';

          this.clientHandler.updateClientUser(this.clientToUpdate).subscribe(
            successCode => {
              this.statusCode = 200;
              this.allClient = this.originalClients;
              // this.backToCreateArticle();
            },
            errorCode => this.statusCode = errorCode
          );
        },
        errorCode => this.statusCode = errorCode);

  }

  changepages(event) {
    this.pages = event.target.value;
    this.returnedArray = this.allClient.slice(0, this.pages);
    this.currentArray=this.returnedArray;
    setTimeout(()=> {
      this.currentPage=1;
    }, 50);



  }

  ngOnInit() {
  }

  preConfig() {
    this.statusCode = null;
    this.requestProcess = true;
  }
}
