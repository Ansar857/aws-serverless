import Image from "next/image"
import download from "public/download.webp"
import download1 from "public/download2.webp"
import event1 from "public/event1.webp"
import event2 from "public/event2.webp"

const Promotions = () => {
  return (
    <section className="mb-16 mt-56">

      {/* Promotions */}
    <div className="mt-24 space-y-3 text-center">
    <h1 className=" text-blue-700 font-bold font-sans">PROMOTIONS</h1>
    <h2 className="  text-4xl font-bold">Our Promotions Events</h2>
    </div>

    <main className="flex flex-col lg:flex-row justify-center gap-8">

      {/* Right */}
    <div className="mt-10 flex-col space-y-4">
        <Image src={download} alt="promotion" height={200} width={700}/>
        <Image src={download1} alt="promotion" height={200} width={700}/>
    </div>

    {/* Left */}
    <div className="mt-10 flex flex-col lg:flex-row space-x-3 ">
      <div><Image src={event1} alt="promotion" height={220} width={307}/></div>
      <div><Image src={event2} alt="promotion" height={220} width={302}/></div>
      </div></main>
    
    </section>
  )
}

export default Promotions