import React from 'react';
import Layout from './components/layouts';

class App extends React.Component {
   render() {
      return (
         <Layout>
            {this.props.children}
         </Layout>
      );
   }
}

export default App;
