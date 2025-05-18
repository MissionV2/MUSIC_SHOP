import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div className='fixed bottom-0 px-5 py-4 w-full bg-red-600 flex justify-between'>
       <Link to={'/records'} className='bg-black px-5 py-2 rounded-2xl'>Пластинки</Link>
       <Link to={'/'} className='bg-black px-5 py-2 rounded-2xl'>Топ-продаж</Link>
    </div>
  )
}
