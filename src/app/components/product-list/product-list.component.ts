import { Component, OnInit, Renderer2 } from '@angular/core';
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
  recordsPerPage = 5;
  menuStates: boolean[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.productService.getData().subscribe({
      next: (productData) => {
        this.product = productData || [];
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
    this.filterValue = value;
  }

  openForm() {
    this.router.navigateByUrl('/register');
  }

  changeRecordsPerPage(event: any) {
    this.recordsPerPage = +event.target.value;
  }

  mostrarOpciones(index: number): void {
    this.menuStates[index] = !this.menuStates[index];
  }
}
