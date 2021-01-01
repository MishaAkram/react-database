import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <section>
          <h1>Home page</h1>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
