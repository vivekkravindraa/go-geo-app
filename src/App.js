import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Maps from './components/Maps';
import GeoLocation from './components/GeoLocation';
import MapAutoComplete from './components/MapAutoComplete';
import Polygon from './components/Polygon';
import Standalone from './components/Standalone';
import MapWithASearchBox from './components/MapWithASearchBox';
import ShelterMap from './components/ShelterMap';
import Polyline from './components/Polyline';

export const customHistory = createBrowserHistory();

export default function App() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route exact path="/polyline" component={() => <Maps mapToRender={<Polyline />} />} />
        <Route exact path="/shelters" component={() => <Maps mapToRender={<ShelterMap />} />} />
        <Route exact path="/searchbox" component={() => <Maps mapToRender={<MapWithASearchBox />} />} />
        <Route exact path="/standalone" component={() => <Maps mapToRender={<Standalone />} />} />
        <Route exact path="/polygon" component={() => <Maps mapToRender={<Polygon />} />} />
        <Route exact path="/autocomplete" component={() => <Maps mapToRender={<MapAutoComplete />} />} />
        <Route exact path="/geolocation" component={() => <Maps mapToRender={<GeoLocation />} />} />
        <Route exact path="/" component={Maps} />
      </Switch>
    </Router>
  )
}
