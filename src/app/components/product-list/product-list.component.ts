import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  product: any;
  filterValue = '';
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getData().subscribe({
      next: (productData) => {
        this.product = productData;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  handlerSearch(value: string) {
    this.filterValue = value
  }

  openForm() {
    this.router.navigateByUrl('/register');
  }
}
