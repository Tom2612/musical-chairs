const Navbar = (): JSX.Element =>{
  return (
    <div>
        <h2>Routes:</h2>
        <ul>
            <li><a href='/concerts'>All Concerts</a></li>
            <li><a href='/concerts/new'>New Concert</a></li>
        </ul>
    </div>
  )
}

export default Navbar;