import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Gitgraph } from '@gitgraph/react';


import MyComponent from "./gitflow/android"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{fontSize  : "50px"}}>
          Branch and package flow
        </p>
      </header>
      <div style={{display: "inline-block", width: "50%"}}>
        <Gitgraph>
            {(gitgraph) => {
            // Simulate git commands with Gitgraph API.
            const master = gitgraph.branch("master");
            master.commit("Initial commit");

            const develop = gitgraph.branch("develop");
            develop.commit("Add TypeScript");

            const aFeature = gitgraph.branch("a-feature");
            aFeature
              .commit("Make it work")
              .commit("Make it right")
              .commit("Make it fast");

            develop.merge(aFeature);
            develop.commit("Prepare v1");

            master.merge(develop).tag("v1.0.0");
          }}
        </Gitgraph>
      </div>

    </div>
  );
}

export default App;
