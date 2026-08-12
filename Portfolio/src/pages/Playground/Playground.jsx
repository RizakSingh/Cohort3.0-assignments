import ShrinkHeading from '@/components/typography/ShrinkHeading'
import SectionLabel from '@/components/sections/SectionLabel'
import MagneticButtonExperiment from './experiments/MagneticButtonExperiment'
import CursorDistortionExperiment from './experiments/CursorDistortionExperiment'
import ScrollTypographyExperiment from './experiments/ScrollTypographyExperiment'
import InteractiveGridExperiment from './experiments/InteractiveGridExperiment'
import DisplacementExperiment from './experiments/DisplacementExperiment'

const EXPERIMENTS = [
  { index: '01', title: 'Magnetic Button', Component: MagneticButtonExperiment },
  { index: '02', title: 'Cursor Distortion', Component: CursorDistortionExperiment },
  { index: '03', title: 'Scroll Typography', Component: ScrollTypographyExperiment },
  { index: '04', title: 'Interactive Grid', Component: InteractiveGridExperiment },
  { index: '05', title: 'Text Displacement', Component: DisplacementExperiment },
]

const HEADLINE = ['PLAYGROUND.']

export default function Playground() {
  return (
    <div className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <ShrinkHeading lines={HEADLINE} size="section" endScale={0.8} end="+=50%" />

        <p className="mt-8 max-w-xl font-body text-lg text-muted">
          Small, self-contained interaction experiments — every one of them is actually live, not
          a screenshot.
        </p>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {EXPERIMENTS.map(({ index, title, Component }) => (
            <div key={index} className="border border-line bg-surface/40">
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <SectionLabel index={index} title={title} />
              </div>
              <Component />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
