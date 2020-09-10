import React, { Component } from 'react'

import {Container,Table} from 'reactstrap'

export default class Content extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const {products, currentCategory,addToCart} = this.props
        return (
            <div>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product => (
                                    <tr style={{cursor:"pointer"}} key={product.id} onClick={()=>addToCart(product)}>
                                        <th scope="row">{product.id}</th>
                                        <td>{product.productName}</td>
                                        <td>{product.unitPrice}</td>
                                        <td>{product.unitsInStock}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}
