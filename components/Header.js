import Link from 'next/link';

export default function Header() {
  return (
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
        <Link href="/"><li className="nav-item"><a href="" className="nav-link active" aria-current="page">Home</a></li></Link>
        <Link href="/rule/"><li className='nav-item'><a href="#" className="nav-link">Rules</a></li></Link>
        <Link href="/play/"><li className='nav-item'><a href="#" className="nav-link">Play</a></li></Link>
        <li className="nav-item"><a href="https://github.com/YossiSuper/testsns" className="nav-link">Github</a></li>
        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
      </ul>
    </header>
  );
}