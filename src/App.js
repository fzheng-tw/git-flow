import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Gitgraph, Orientation,templateExtend, TemplateName} from '@gitgraph/react';




import MyComponent from "./gitflow/android"

function App() {
  const colors = {
    green: '#50AE54',
    blue: '#2B98EF',
    orange: '#FC9726',
    deepOrange: '#FB5830',
    brown: '#785549',
    amber: '#FCBF2F',
    purple: '#9B2FAE',
    red: "#F0453D",
    pink: "#E52465",

  }

  const commitDefaultOptionsUtil = (color) => {
    return {
      style: {
        message: {
          color: color
        },
        dot: {
          color: color
        }
      }
    }
  };
  const labelStyleUtil = (color) => {
    return {
      color: color,
      strokeColor: color,
    };
  };

  const withoutAuthor = templateExtend(TemplateName.Metro, {
     commit: {
       message: {
         displayAuthor: false,
         displayHash: false,
       },
     },
   });
  const options = {
    template: withoutAuthor
  };

  return (
    <div className="App">
      <div>
        <p style={{fontSize  : "50px"}}>
          Module Branch and Git flow
        </p>
        <Gitgraph options={options}>
            {(gitgraph) => {

            const master = gitgraph.branch({
              name: "master",
              style: {
                color: colors.green,
                label: labelStyleUtil(colors.green)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.green),
            });
            master.commit("Initial commit");

            master.tag("v1.0.0")

            const release = gitgraph.branch({
              name: "release",
              style: {
                color: colors.blue,
                label: labelStyleUtil(colors.blue)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.blue),
            });
            release.commit("to build package and RELEASE after all tests pass");

            const snapshot = gitgraph.branch({
              name: "snapshot",
              style: {
                color: colors.amber,
                label: labelStyleUtil(colors.amber)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.amber),
            });

            snapshot.commit("to build snapshot package for test");

            const snapshot_develop = gitgraph.branch({
              name: "snapshot/7.7.0",
              style: {
                color: colors.deepOrange,
                label: labelStyleUtil(colors.deepOrange)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.deepOrange),
            });

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
              from: snapshot,
              style: {
                color: colors.brown,
                label: labelStyleUtil(colors.brown)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.brown),
            });
            snapshot_develop_for_7_8_0
              .commit("develop this module for app release 7.8.0")
              .commit("change gradle version: 1.1.0 -> 1.2.0-snapshot")
              .commit("make it work");

            snapshot.merge(snapshot_develop_for_7_8_0);

            const hotfix = gitgraph.branch({
              name: "hotfix",
              from: master,
              style: {
                color: colors.pink,
                label: labelStyleUtil(colors.pink)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.pink),
            });

            hotfix.commit("this branch is for hotfix from master and clear from code of snapshot");

            const hotfix_7_7_1 = gitgraph.branch({
              name: "hotfix/7.7.1",
              from: hotfix,
              style: {
                color: colors.purple,
                label: labelStyleUtil(colors.purple)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.purple),
            });

            hotfix_7_7_1
              .commit("change gradle version: 1.0.0 -> 1.0.1-snapshot")
              .commit("fix it");

            hotfix.merge(hotfix_7_7_1);

            hotfix_7_7_1
              .commit("fix it thoughtfully");

            hotfix
              .merge(hotfix_7_7_1)
              .commit("change gradle version: 1.0.1-snapshot -> 1.0.1");

            master.merge(hotfix);
            master.tag("v1.0.1");

            snapshot.merge(hotfix);

            release.merge(snapshot).commit("change gradle version: 1.2.0-snapshot -> 1.2.0");;
            master.merge(release).tag("v1.2.0");

          }}
        </Gitgraph>
      </div>


      <div>
        <p style={{fontSize  : "50px"}}>
          Shell Branch and Git flow
        </p>
        <Gitgraph options={options}>
            {(gitgraph) => {

            const master = gitgraph.branch({
              name: "master",
              style: {
                color: colors.green,
                label: labelStyleUtil(colors.green)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.green),
            });
            master.commit("to build package to RELEASE after all tests pass");
            master.tag("v7.6.0");

            const release = gitgraph.branch({
              name: "release",
              style: {
                color: colors.blue,
                label: labelStyleUtil(colors.blue)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.blue),
            });
            release.commit("to build package to UAT");
            release.commit("Change Module A from A-0.0.0 -> A-1.0.0-snapshot");
            release.commit("Trigger the pipelines manually to build a package RELEASE-7.7.0-Staging to uat");
            release.commit("Trigger the pipelines manually to build a package RELEASE-7.7.0-Staging to uat after A change again");
            release.commit("Change Module A from A-1.0.0-snapshot -> A-1.0.0, ready to release");
            master.merge(release).tag("v7.7.0");

            release.commit("Change Module A from A-1.0.0 -> A-1.1.0-snapshot");
            release.commit("Build a package RELEASE-7.8.0-Staging to uat when A finish");

            const hotfix = gitgraph.branch({
              name: "hotfix",
              from: master,
              style: {
                color: colors.pink,
                label: labelStyleUtil(colors.pink)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.pink),
            });

            hotfix.commit("Change Module A from A-1.0.0 -> A-1.0.1-snapshot");
            hotfix.commit("Trigger the pipelines manually to build a package RELEASE-7.7.1-Staging to uat");
            hotfix.commit("Change Module A from A-1.0.1-snapshot -> A-1.0.1, ready to release");
            master.merge(hotfix).tag("v7.7.1");
            release.merge(hotfix);

            release.commit("Build a package RELEASE-7.8.0-Staging to uat when A change again");
            release.commit("Change Module A from A-1.0.0-snapshot -> A-1.0.0, ready to release");
            master.merge(release).tag("v7.8.0");

          }}

        </Gitgraph>
      </div>
      <footer style={{height:"100px"}}>
      </footer>


    </div>
  );
}

export default App;
