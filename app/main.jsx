import React from 'react'
import {render} from 'react-dom'

import { createStore } from 'redux'

let intialState = {
	stockBundles: {
		R12: {
			name: "Roses",
			bundles: {
				5: 6.99,
				10: 12.99
			}
		},
		L09: {
			name: "Lilies",
			bundles: {
				3: 9.95,
				6: 16.95,
				9: 24.95
			}
		},
		T58: {
			name: "Tulips",
			bundles: {
				3: 5.95,
				5: 9.95,
				9: 16.99
			}
		}
	},

	userEntry: "",

	bundles: ""
}

function counter(state = intialState, action) {
	return state
}

let store = createStore(counter)

store.subscribe(() =>
  console.log(store.getState())
)

class App extends React.Component {
  render() {
    return (
      <div>
        Flower ka-power
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));