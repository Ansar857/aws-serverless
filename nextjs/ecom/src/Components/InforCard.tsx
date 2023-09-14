
const InforCard = (props:{heading:string,para:string}) => {
  return (
    <div className="mt-36 ">
        <h1 className="w-1/2  text-xl text-muted-foreground font-semibold">
        {props.heading}</h1>
        <p className="w-1/2  leading-relaxed text-lg [&:not(:first-child)]:mt-6 text-slate-800">
    {props.para}
      </p>
    </div>
  )
}

export default InforCard