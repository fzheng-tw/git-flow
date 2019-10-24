import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Gitgraph, Orientation,} from '@gitgraph/react';


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
        <p>
          Module A
        </p>
        <Gitgraph>
            {(gitgraph) => {

            const master = gitgraph.branch("master");
            master.commit("Initial commit");

            master.tag("v1.0.0")

            const release = gitgraph.branch("release");
            release.commit("package and publish after all tests pass");

            const snapshot = gitgraph.branch("snapshot");
            snapshot.commit("create snapshot package");

            const snapshot_develop = gitgraph.branch("snapshot/7.7.0");
            snapshot_develop
              .commit("develop this module for app release 7.7.0")
              .commit("change gradle version: 1.0.0 -> 1.1.0-snapshot");;

            snapshot_develop
              .commit("Make it work");

            snapshot.merge(snapshot_develop);

            snapshot_develop
              .commit("Make it right")
              .commit("Make it fast");
            snapshot.merge(snapshot_develop);

            release
              .merge(snapshot)
              .commit("change gradle version: 1.1.0-snapshot -> 1.1.0");

            master.merge(release).tag("v1.1.0");

            release.merge(master);
            snapshot.merge(release);

            const snapshot_develop_for_7_8_0 = gitgraph.branch({
              name: "snapshot/7.8.0",
              from: snapshot
            });
            snapshot_develop_for_7_8_0
              .commit("develop this module for app release 7.8.0")
              .commit("change gradle version: 1.1.0 -> 1.2.0-snapshot")
              .commit("make it work");

            snapshot.merge(snapshot_develop_for_7_8_0);

            const hotfix = gitgraph.branch({
              name: "hotfix",
              from: master
            });

            hotfix.commit("this branch is for hotfix from master and clear from code of snapshot");

            const hotfix_7_7_1 = gitgraph.branch({
              name: "hotfix/7.7.1",
              from: hotfix
            });

            hotfix_7_7_1
              .commit("change gradle version: 1.0.0 -> 1.0.1-snapshot")
              .commit("fix it");

            hotfix.merge(hotfix_7_7_1);


          }}
        </Gitgraph>
      </div>
      {/*
        <div style={{display: "inline-block", width: "50%", background: "black"}}>
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
*/}


    </div>
  );
}

export default App;
