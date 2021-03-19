import { useEffect, useState } from 'react';
import Navigation from "./components/Navigation/Navigation";
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentURL, setCurrentURL] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const ctci = [];
  for(let i=1; i<16; i++) {
    ctci.push(`Interview Questions - ${i}`)
  }

  return (
      <div className="App">
        <Navigation 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          currentView={currentView} 
          setCurrentView={setCurrentView}
          setCurrentURL={setCurrentURL}/>
        <main style={{overflowY:'scroll'}}>
          {
            (currentView === 'home' || currentView === '') 
            ? <Home/>
            : <Page URL={currentURL}/>
          }
        </main>
      </div>
  );
}

function Home() {
  return (
    <>
      <h1>Jan's Documentation</h1>
    </>
  );
}
function Page({URL}) {
  const [ markdown, setMarkdown ] = useState();
  const md = new Remarkable();
  md.renderer = new RemarkableReactRenderer();

  useEffect(() => {
    fetch(URL)
      .then(res => res.text())
      .then(data => {
        setMarkdown(data);
      })
      .catch(err => console.log(err))
  });

  return md.render(markdown);
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

export default App;
