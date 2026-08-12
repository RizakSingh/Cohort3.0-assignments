import Hero from './Hero'
import Introduction from './Introduction'
import SelectedWork from './SelectedWork'
import Capabilities from './Capabilities'
import AboutPreview from './AboutPreview'
import PlaygroundPreview from './PlaygroundPreview'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <SelectedWork />
      <Capabilities />
      <AboutPreview />
      <PlaygroundPreview />
      <ContactCTA />
    </>
  )
}
