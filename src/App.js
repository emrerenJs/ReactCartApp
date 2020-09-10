import React, { Component } from 'react'

import Header from './Components/Header'
import Content from './Components/Content'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentCategory : 1,
      categories : [],
      products : [],
      cart : []
    }
  }
  
  componentDidMount(){
    this.getCategories()
    this.getProducts(1)
  }

  setCurrentCategory = currentCategory => {
    this.setState({
      currentCategory
    })
    this.getProducts(currentCategory)
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
    .then(data => data.json())
    .then(categories => this.setState({categories}))
  }

  getProducts = categoryId => {
    let con = categoryId ? "http://localhost:3000/products?categoryId="+categoryId : "http://localhost:3000/products" 
    fetch(con)
    .then(products => products.json())
    .then(products => this.setState({products}))
  }

  addToCart = product => {
    const {cart} = this.state
    const item = cart.find(item => item.product.productName === product.productName)
    if(item){
      item.count++
    }else{
      cart.push({
        product,
        count : 1
      })
    }
    this.setState({cart})
  }

  removeFromCart = (id) => {
    if(id){
      const {cart} = this.state
      const item = cart.find(item => item.product.id === id)
      if(item.count > 1){
        item.count--
        this.setState({
          cart
        })
      }else if(item.count === 1){
        const newCart = cart.filter(item => item.product.id !== id)
        this.setState({
          cart : newCart
        })
      }
      else{
        alert("Item doesn't exist!")
      }
    }else{
      this.setState({
        cart : []
      })
    }
  }

  render() {
    return (
      <div>
        <Header 
          categories={this.state.categories}
          setCurrentCategory={this.setCurrentCategory}
          cart={this.state.cart}
          removeFromCart={this.removeFromCart}
          clearAllCart={this.clearAllCart}
        />

        <Content 
          products={this.state.products} 
          currentCategory={this.state.currentCategory}
          addToCart={this.addToCart}
        />
      </div>
    )
  }
}

export default App