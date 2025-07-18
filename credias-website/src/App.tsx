import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        {/* TODO: Add other sections */}
      </main>
    </div>
  );
}

export default App
