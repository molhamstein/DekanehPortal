import {Component, OnInit} from '@angular/core';
import {SlideHandlerService} from '../slide-handler.service';
import {ProductHandler} from '../../products/product-handler';
import {Router} from '@angular/router';

@Component({
    selector: 'app-slide-listing',
    templateUrl: './slide-listing.component.html',
    styleUrls: ['./slide-listing.component.css']
})
export class SlideListingComponent implements OnInit {

    allSlides: any[];

    constructor(private Handler: SlideHandlerService, private producHandler: ProductHandler, private router: Router) {
        this.getAllSlides();
    }

    getAllSlides() {
        let t = [];
        this.allSlides = [];
        this.Handler.getAllSlides().finally(() => {
            for (let s of t) {
                if (s.type == 'product') {
                    this.producHandler.getProductById(s.target).subscribe(p => {
                        s.target = p;
                        this.allSlides.push(s);
                    });
                } else {
                    this.allSlides.push(s);
                }
            }

            console.table(this.allSlides);
        }).subscribe(data => {
            t = data;
        });
    }

    editSlid(id) {
        this.router.navigate(['/topSlider/edit/' + id]);
    }

    ngOnInit() {

    }

}
