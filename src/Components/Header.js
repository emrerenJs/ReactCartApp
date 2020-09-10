import React, { Component } from 'react'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
  } from 'reactstrap'

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            isOpen : false
        }
    }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() {
        const {setCurrentCategory,cart,categories,removeFromCart} = this.props
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">React Shopping</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {
                                categories.map(category => (
                                    <NavItem key={category.id}>
                                        <NavLink onClick={()=> setCurrentCategory(category.id) } href="#">
                                            {category.categoryName}
                                        </NavLink>
                                    </NavItem>
                                ))
                            }
                            <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <b>Sepet</b>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {
                                    cart.length > 0 
                                    ? 
                                    cart.map(item => (
                                        <DropdownItem style={{cursor:"pointer"}} key={item.product.id} onClick={()=>removeFromCart(item.product.id)}>
                                            {item.product.productName} {item.count}
                                        </DropdownItem>
                                    ))
                                    :
                                    <b className="ml-4">Sepetiniz boş</b>
                                }
                                <DropdownItem divider />
                                <DropdownItem onClick={()=>removeFromCart()}>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
