import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Products from './components/sections/Products'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import CreditOnboarding from './components/sections/CreditOnboarding'

function App(): JSX.Element {
  return (
    <Layout>
      <Hero />
      <Features />
      <Products />
      <About />
      <Contact />
      <section id="onboarding" className="py-20 bg-gray-50">
        <CreditOnboarding />
      </section>
    </Layout>
  )
}

export default App