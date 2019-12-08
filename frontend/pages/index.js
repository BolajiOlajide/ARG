import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <p>Hey!</p>
      <Link href="/sell">
        <a>Go to sell page!</a>
      </Link>
    </div>
  )
}
