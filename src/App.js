import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  const ctci = [];
  for(let i=1; i<16; i++) {
    ctci.push(`Interview Questions - ${i}`)
  }

  const ctciLinks = CTCI_DATA.map(data => <li className="link" key={Math.random()}><Link to={`/ctci/${joinString(data.title)}`}>{data.title}</Link></li>);
  const ctciRoutes = CTCI_DATA.map(data => {
    return (<Route exact path={`/ctci/${joinString(data.title)}`}>
      <Page URL={data.URL}/>
    </Route>);
  })
  return (
    <Router>
      <div className="App">
        <main>
          <section className="sidebar-container">
            <div className="sidebar">
              <h2 className="sidebar-header">Cracking the Coding Interview</h2>
              <ul className="links-container">
                {ctciLinks}
              </ul>
            </div>

            <div className="sidebar">
              <h2 className="sidebar-header">Automate the Boring Stuff</h2>
            </div>
          </section>

          <div className="routes">
            <Switch>
              <Route exact path="/">
                <h1>Home</h1>
              </Route>
              {ctciRoutes}
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

function Page({URL}) {
  const [ markdown, setMarkdown ] = useState();
  useEffect(() => {
    fetch(URL)
      .then(res => res.text())
      .then(data => {
        setMarkdown(data);
      })
  });

  return (<div className="markdown-container"><ReactMarkdown children={markdown}/></div>);
}

const CTCI_DATA = [
  {
    title: 'VI. Big O',
    URL: 'https://raw.githubusercontent.com/janeligio/ctci/master/VI-Big_O.md',
    path: '/ctci/',
  }
];

[1,2,3,4,5,6,7,8,10,11,13,15].forEach(value => {
  CTCI_DATA.push({
    title: `IX. Interview Questions | ${value}`,
    URL: `https://raw.githubusercontent.com/janeligio/ctci/master/IX.%20Interview%20Questions/IX-Interview_Questions-${value}.md`,
    path: '/ctci/'
  })
})

function joinString(str) {
  return str.split(' ').join('-');
}

export default App;
