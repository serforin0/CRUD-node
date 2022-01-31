import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_PRODUCTS = gql `
  {
    products {
      products {
        _id
        product
        author
      }
    }
  }
`;

const CREATE_PRODUCT = gql `
    
      mutation createProduct($product: String!, $author: String!) {
        createProduct(productInput: { product: $product, author: $author}) {
          _id
          product
          author
        }
      }
    

`;

const DELETE_PRODUCTS = gql `
  mutation deleteProduct($id: ID!) {
    deleteProduct( id: $id ) {
      _id
      product
      author
    }
  }
  `

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  products: Observable<any> | undefined;

  constructor(private apollo: Apollo) { }
  ngOnInit() {
    this.products = this.apollo.watchQuery({
      query: GET_PRODUCTS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.products.products);
        return result.data.products.products;

      })
    )

  }

  create(product: string, author: string) {
    this.apollo
    .mutate({
      mutation: CREATE_PRODUCT,
      refetchQueries: [{query: GET_PRODUCTS}],
      variables: {
        product: product,
        author: author
      }
    }).subscribe(() => {
      console.log('create')
    })
  }

  delete(id: string){
    console.log(id)
    this.apollo.mutate({
      mutation: DELETE_PRODUCTS,
      refetchQueries: [{query: GET_PRODUCTS}],
      variables: {
        id: id
      },
    }).subscribe(() => {
      console.log('deleted')
    })
  }
}
