import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='min-h-screen min-w-screen text-gray-900'>
        <Header />
        <main className='p-10'>
            <Outlet></Outlet>
        </main>
    </div>
  )
}

function Header() {
    return (
        <div className='p-5 bg-blue-300 flex items-center justify-center'>
            <h1 className='text-3xl font-bold'>Musical Chairs</h1>
            <div className='flex-1 flex justify-center space-x-5'>
                <a href='/concerts'>Concerts</a>
                <a href='/concerts/new'>New Conert</a>
            </div>
            <div>User</div>
        </div>
    )
}