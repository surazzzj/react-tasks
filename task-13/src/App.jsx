import { useEffect, useState } from 'react'
import { data } from './assets/assets'

const App = () => {

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevButton = () => {
    setActiveImageIndex(!activeImageIndex ? data.length - 1 : activeImageIndex - 1);
  }

  const handleNextButton = () => {
    setActiveImageIndex((activeImageIndex + 1) % data.length)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextButton();
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [activeImageIndex])

  return (
    <>
      <div className='flex h-screen w-full justify-center items-center gap-40'>
        <button onClick={handlePrevButton} className='bg-gray-900 text-white font-medium text-xl px-8 py-3 rounded-md'>prev</button>
        {data.map((url, i) => (
          <img key={url} src={url} className={"h-150 w-130 object-contain " + (activeImageIndex === i ? "block" : "hidden")} alt="Wallpaper" />
        ))}
        <button onClick={handleNextButton} className='bg-gray-900 text-white font-medium text-xl px-10 py-3 rounded-md'>Next</button>
      </div>
    </>
  )
}

export default App