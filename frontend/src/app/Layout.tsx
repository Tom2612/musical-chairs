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

interface ILink {
    text: string
    url:string
}
const navLinks: ILink[] = [
    { text: 'Concerts', url: '/concerts/' },
    { text: 'New Concert', url: '/concerts/new' },
]

function HeaderLink({ link }: { link: ILink }) {
    return (
        <a key={link.text} className='hover:font-bold' href={link.url}>{link.text}</a>
    )
}

function Header() {
    return (
        <div className='p-5 bg-blue-300 flex items-center justify-center'>
            <h1 className='text-3xl font-bold'>Musical Chairs</h1>
            <div className='flex-1 flex justify-center space-x-5'>
                {navLinks.map(link => (
                    <HeaderLink link={link} />
                ))}
            </div>
            <div>User</div>
        </div>
    )
}