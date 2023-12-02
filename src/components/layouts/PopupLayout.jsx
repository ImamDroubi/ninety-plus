import { createPortal } from 'react-dom';
import OverlayDark from '../overlays/OverlayDark';
import { useEffect } from 'react';
export default function PopupLayout({children}) {
  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return ()=>{
      document.body.style.overflow = 'unset';
    }
  },[])
  return (
    createPortal(<>
      <div className='fixed top-[0rem] left-[0rem] right-[0rem] bottom-[0rem] z-5 flex items-center justify-center '>
        <OverlayDark/>
        {children}
      </div>
    </>,document.body)
  )
}