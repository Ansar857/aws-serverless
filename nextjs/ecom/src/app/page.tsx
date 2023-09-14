import Hero from '@/views/Hero'
import Productlist from '../views/Productlist'
import Promotions from '@/views/Promotions'
import Information from '@/views/Information'
import Subscriber from '@/views/Subscriber'

export default function Home() {
  return(
    <div>
      <Hero/>
      {/* Promotions */}
      <Promotions/>
      {/* Product List */}
      <Productlist/>
      {/* Information section */}
      <Information/>
      {/* Subcribe */}
      <Subscriber/>
    </div>
  )
  }

