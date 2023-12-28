import React, {lazy, useEffect, useState} from 'react';
import shortid from 'shortid';
import './App.css';

const importComponent = (component) => {
  lazy( () => {
    import(`./components/${component}`).catch(()=> {
      import(`./components/NullView`)
    })
  })
}

export default function App({componentsToShow}) {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    async function loadComponents() {
      const componentPromises = 
        componentsToShow.map(async (component) => {
          const Comp = await importComponent(component);
          return <Comp key={shortid.generate()} />;
        });

        Promise.all(componentPromises).then(setComponents);
    }

    loadComponents();
  }, [componentsToShow]);

  return (
    <React.Suspense fallback="Loading views...">
      <div id="App">{components}</div>
    </React.Suspense>
  );
}