import React from 'react';
import { NavLink } from 'react-router-dom';

import './Maps.css';

export default function Maps({ mapToRender }) {

    const paths = [
        { "title": "Geo Location", "pathName": "/geolocation" },
        { "title": "Map Auto Complete", "pathName": "/autocomplete"  },
        { "title": "Polygon", "pathName": "/polygon" },
        { "title": "Standalone", "pathName": "/standalone" },
        { "title": "Map With A Search Box", "pathName": "/searchbox" },
        { "title": "Shelter Map", "pathName": "/shelters" },
        { "title": "Polyline", "pathName": "/polyline" }
    ];

    return <div className="mapsContainer">
        <div className="mapsHeader">
            <p><NavLink to="/">GOOGLE MAPS</NavLink></p>
        </div>
        <div className="mapsLinks">
            {paths.map((path, index) => {
                return (
                    <div key={index}>
                        <NavLink to={`${path.pathName}`}>
                            {path.title.toUpperCase()}
                        </NavLink>
                    </div>
                )
            })}
        </div>
        <div>
            {mapToRender}
        </div>
    </div>
}
