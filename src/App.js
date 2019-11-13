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

            master.tag("v1.0.0");

            const release770 = gitgraph.branch({
              name: "release770",
              style: {
                color: colors.amber,
                label: labelStyleUtil(colors.amber)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.amber),
            });

            release770.commit("change pod version: 1.0.0 -> 1.1.0-beta.0");

            const release790 = gitgraph.branch({
              name: "release790",
              from: master,
              style: {
                color: colors.brown,
                label: labelStyleUtil(colors.brown)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.brown),
            });

            release790.commit("change pod version: 1.0.0 -> 1.3.0-beta.0");

            const dev_feature_E = gitgraph.branch({
              name: "dev/JIRA-888",
              from: release790,
              style: {
                color: colors.gray,
                label: labelStyleUtil(colors.gray)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.gray),
            });

            dev_feature_E.commit('spike something');
            dev_feature_E.commit('spike one more thing');
            release790.merge(dev_feature_E);
            release790.commit("change pod version: 1.3.0-beta.0 -> 1.3.0-beta.1");


            const dev_feature_A = gitgraph.branch({
              name: "dev/JIRA-311",
              from: release770,
              style: {
                color: colors.deepOrange,
                label: labelStyleUtil(colors.deepOrange)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.deepOrange),
            });

            const dev_feature_B = gitgraph.branch({
              name: "dev/JIRA-332",
              from: release770,
              style: {
                color: colors.orange,
                label: labelStyleUtil(colors.orange)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.orange),
            });

            dev_feature_A
              .commit("develop this module for app release 7.7.0");

            dev_feature_A
              .commit("Make it work");
            dev_feature_B.commit("Small change");
            release770.merge(dev_feature_A);
            release770.commit("change pod version: 1.1.0-beta.0 -> 1.1.0-beta.1")
            release770.merge(dev_feature_B);
            release770.commit("change pod version: 1.1.0-beta.1 -> 1.1.0-beta.2")

            dev_feature_A
              .commit("Make it right")
              .commit("Make it fast");
            release770.merge(dev_feature_A);
            release770.commit("change pod version: 1.1.0-beta.2 -> 1.1.0-beta.3");
            release770.commit("change pod version: 1.1.0-beta.3 -> 1.1.0");
            master.merge(release770).tag("v1.1.0")

            const release780 = gitgraph.branch({
              name: "release/7.8.0",
              from: master,
              style: {
                color: colors.blue,
                label: labelStyleUtil(colors.blue)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.blue),
            });

            release780.commit("make it correct");
            const dev_feature_C = gitgraph.branch({
              name: "dev/JIRA-367",
              style: {
                color: colors.deepOrange,
                label: labelStyleUtil(colors.deepOrange)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.deepOrange),
            });

            const dev_feature_D = gitgraph.branch({
              name: "dev/JIRA-374",
              style: {
                color: colors.orange,
                label: labelStyleUtil(colors.orange)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.orange),
            });

            const dev_feature_F = gitgraph.branch({
              name: "dev/JIRA-999",
              from: release790,
              style: {
                color: colors.gray,
                label: labelStyleUtil(colors.gray)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.gray),
            });
            dev_feature_F.commit("big thing");
            release790.merge(dev_feature_F);
            release790.commit("change pod version: 1.3.0-beta.1 -> 1.3.0-beta.2");


            dev_feature_C.commit("change pod version: 1.1.0 -> 1.2.0-beta.0");
            dev_feature_D.commit("make it correct");

            release780.merge(dev_feature_C);
            release780.merge(dev_feature_D);

            const hotfix = gitgraph.branch({
              name: "hotfix",
              from: master,
              style: {
                color: colors.pink,
                label: labelStyleUtil(colors.pink)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.pink),
            });

            hotfix.commit("this branch is for hotfix from master and clear from code of beta");

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
              .commit("change pod version: 1.0.0 -> 1.0.1-beta.0")
              .commit("fix it");

            hotfix.merge(hotfix_7_7_1);

            hotfix_7_7_1
              .commit("fix it thoughtfully");

            hotfix
              .merge(hotfix_7_7_1);
            hotfix.commit("change pod version: 1.0.1-beta.0 -> 1.0.1");


            master.merge(hotfix);
            master.tag("v1.0.1");

            release780.merge(master);
            release790.merge(master);
            release780.commit("change pod version: 1.2.0-beta.0 -> 1.2.0");

            master.merge(release780)
            master.tag("v1.2.0");

            master.merge(release790)
            master.tag("v1.3.0");

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


            const release770 = gitgraph.branch({
              name: "release770",
              style: {
                color: colors.amber,
                label: labelStyleUtil(colors.amber)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.amber),
            });

            const release790 = gitgraph.branch({
              name: "release790",
              from: master,
              style: {
                color: colors.brown,
                label: labelStyleUtil(colors.brown)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.brown),
            });
            release790.commit("Change Module A from A-1.0.0 -> A-1.3.0-beta.0, to test");

            release770.commit("Change Module A from A-1.0.0 -> A-1.1.0-beta.0, to test");
            release770.commit("Change Module A from A-1.1.0-beta.0 -> A-1.1.0, ready to release");
            master.merge(release770).tag("v7.7.0");

            const release780 = gitgraph.branch({
              name: "release780",
              from: master,
              style: {
                color: colors.blue,
                label: labelStyleUtil(colors.blue)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.blue),
            });

            release780.commit("Change Module A from A-1.1.0 -> A-1.2.0-beta.0, to test");


            const hotfix = gitgraph.branch({
              name: "hotfix",
              from: master,
              style: {
                color: colors.pink,
                label: labelStyleUtil(colors.pink)
              },
              commitDefaultOptions: commitDefaultOptionsUtil(colors.pink),
            });

            hotfix.commit("Change Module A from A-1.1.0 -> A-1.1.1-beta.0, to test");
            hotfix.commit("Change Module A from A-1.1.1-beta.0 -> A-1.1.1, ready to release");

            release780.commit("Change Module A from A-1.2.0-beta.0 -> A-1.2.0, ready to release");

            master.merge(hotfix).tag("v7.7.1");

            master.merge(release780).tag("v7.8.0");
            release790.commit("Change Module A from A-1.3.0-beta.0 -> A-1.3.0, ready to release");
            master.merge(release790).tag("v7.9.0");


          }}

        </Gitgraph>
      </div>
      <footer style={{height:"100px"}}>
      </footer>


    </div>
  );
}

export default App;
