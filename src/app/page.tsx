import Image from 'next/image'
import Hero from '../../components/Hero'
import { Card, Form } from '../../components'

export default function Home() {
  return (
    <main className="overflow-hidden text-white">
      <Hero/>
      <div>
    <h1 className='text-center text-4xl font-bold tracking-widest'>Featured Cases</h1>
    <div className='flex justify-between my-24 mx-48 space-x-12'>
    <Card />
    <Card/>
    </div>
      </div>
      <div>
    <h1 className='text-center  text-4xl font-bold tracking-widest'>Top Videos</h1>
    <div className='flex justify-between my-24 mx-48 space-x-12'>
    <Card />
    <Card/>
    </div>
      </div>
      <div>
    <h1 className='text-center  text-4xl font-bold tracking-widest'>Top Podcasts</h1>
    <div className='flex justify-between my-24 mx-48 space-x-12'>
    <Card />
    <Card/>
    </div>
      </div>
      <div className='text-center mt-48'>
        <h2 className='italic m-24 text-2xl'>Thanks to our fans who listen every week, we have been able to support the following organizations:</h2>
      </div>
      <div>
        <h2 className='m-24 text-2xl'>Have a case you're passionate about?</h2>
        <Form/>
      </div>
    </main>
  )
}
