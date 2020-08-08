import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import GoogleMaps from './components/GoogleMaps';
import MapAutoComplete from './components/MapAutoComplete';
import Polygon from './components/Polygon';
import Standalone from './components/Standalone';
import MapWithASearchBox from './components/MapWithASearchBox';
import ShelterMap from './components/ShelterMap';

export const customHistory = createBrowserHistory();

export default function App() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/shelters" component={ShelterMap} />
        <Route path="/searchbox" component={MapWithASearchBox} />
        <Route path="/standalone" component={Standalone} />
        <Route path="/polygon" component={Polygon} />
        <Route path="/autocomplete" component={MapAutoComplete} />
        <Route path="/" component={GoogleMaps} />
      </Switch>
    </Router>
  )
}
