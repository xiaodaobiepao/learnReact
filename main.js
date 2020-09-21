import { xiaodaobiepao, render, Component } from './toyReact.js'

class MyComponent extends Component {
  render() {
    return <div>
      <h1>My Component</h1>
      {this.children}
    </div>
  }
}

render(<MyComponent>
  <div>zheshichild</div>
</MyComponent>, document.body)