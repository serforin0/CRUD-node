const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Product {
        _id: ID!
        product: String!
        author: String!
    }
    type ProductData {
        products: [Product!]!
    }
    input ProductInputData {
        product: String!
        author: String!
    }
    type RootQuery {
        products: ProductData!
    }
    type RootMutation {
        createProduct(productInput: ProductInputData): Product!
        updateProduct(id: ID, productInput: ProductInputData): Product!
        deleteProduct(id: ID!): Product!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);