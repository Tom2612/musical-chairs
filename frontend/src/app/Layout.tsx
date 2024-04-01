import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='min-h-screen min-w-screen'>
        <Header />
        <main className='p-10'>
            <Outlet></Outlet>
        </main>
    </div>
  )
}

function Header() {
    return (
        <div>Header</div>
    )
}