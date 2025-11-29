import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Game from './Game'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/:id" element={<Game />} />
          <Route path="/" element={<Game />} />
        </Routes>
        <footer>
          <div className="text-center font-medium text-pink m-5">
            built on <b><a className="text-red hover:bg-pink" href="https://workers.cloudflare.com/">cloudflare workers</a></b>
          </div>
        </footer>
      </div>
    </Router>
  )
}

function Header() {
  return (
    <div>
      <div className="m-2 text-center font-bold text-seafoam text-5xl sm:text-3xl">
        <h1>🍕 C H A R A D E S 🍕</h1>
      </div>
      <div className="flex justify-center">
        <ul className="flex self-center">
          <li className="mr-3">
            <Link className="text-sm inline-block border font-bold bg-pink rounded py-1 px-3 text-red hover:bg-red hover:text-pink no-underline" to="/">GAME</Link>
          </li>
          <li className="mr-3">
            <Link className="text-sm inline-block border font-bold bg-pink rounded py-1 px-3 text-red hover:bg-red hover:text-pink no-underline" to="/rules">RULES</Link>
          </li>
          <li className="mr-3">
            <Link className="text-sm inline-block border font-bold bg-pink rounded py-1 px-3 text-red hover:bg-red hover:text-pink no-underline" to="/about">ABOUT</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="flex flex-col justify-center bg-pink border-seafoam border-2 mx-auto max-w-md m-5 p-3 text-red">
      <h2 className="font-extrabold text-center tracking-wide uppercase mt-2 mb-2">About charades.pizza</h2>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">origin story</h3>
      <p>
        Once upon a time, when I was living in Oconee County, GA (suburbs of Athens, GA, near Atlanta, GA, in case you're not familiar...), there was a huge snow storm. In those regions, this means it snowed like 5 inches, and school was out for like a week. Anyway, this was all very exciting since we rarely got snow. However, once the excitement of playing outside wore off, and our fingers were on the fringe of frostbite, we came back inside for dinner, and ended up watching <i>When Harry Met Sally</i> (to this date, one of my favorite movies).
      </p>
      <p>
        One of the great scenes of <i>When Harry Met Sally</i>, of course, is when they play charades, and Sally is (<b>**spoiler alert!!**</b>) trying to express the phrase "baby talk", but someone keeps guessing "Baby fish mouth! Baby fish mouth!" (ok, ok, technically, it's not charades, it's pictionary, but whatever). It inspired us all to play charades together: my two best friends, one of my best friends' parents, and I. It's one of my favorite memories to date (I even remember some of the phrases we acted out included: "Proust", "Bora! Bora! Bora!", and "Free kittens!", which as I acted it out, everyone kept guessing as "Kittens on Parade!").
      </p>
      <p>
        Shelter in place, suffice it to say, is a significantly less joyous occasion than a snow day, though there are aspects of it that feel like it. It's made me really nostalgic for some of my best friends back home, and you know, the Good Times, so I decided to build a charades game we could play over Zoom.
      </p>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">The tech stack (aka origin story, pt 2)</h3>
      <p>
        I'm the product manager for Cloudflare Workers. I tweet and talk about Workers in amounts that would only be reasonable for a union organizer. It's probably the most annoying thing about me to anyone who has to interact with me on a regular basis.
      </p>
      <p>
        But, it also means I get to have so much fun building what I believe to be the web platform of the future, and in this instance, I get to have fun building on top of the web platform of the future.
      </p>
      <p>Oh yeah, so, the tech stack...</p>
      <p><b>Front-end:</b></p>
      <ul className="list-disc list-inside font-thin leading-loose">
        <li><a href="https://pages.cloudflare.com/">Cloudflare Pages</a> for hosting</li>
        <li>Vite + React</li>
        <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
      </ul>
      <p><b>Back-end:</b></p>
      <ul className="list-disc list-inside font-thin leading-loose">
        <li><a href="https://workers.cloudflare.com/">Cloudflare Workers</a> for API</li>
        <li><a href="https://hono.dev/">Hono</a> for routing</li>
        <li>Workers KV for storing the state (phrases, game IDs, etc)</li>
        <li>that's it!</li>
      </ul>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">The name</h3>
      <p>I just thought .pizza was a cool TLD.</p>
    </div>
  )
}

function Rules() {
  return (
    <div className="flex flex-col justify-center bg-pink border-seafoam border-4 mx-auto max-w-md m-5 p-3 text-red">
      <h2 className="font-extrabold text-center tracking-wide uppercase mt-2 mb-2">How to charades</h2>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">Step 1: gather your friends, virtually</h3>
      <p>
        Hopefully, you're socially distancing yourself, and reaching for this game because gathering friends at your house for a lovely Cassoulet, a few bottles of wine, and a game of charades over a small pour of Amaro is out of the question.
        I recommend playing this with four or more friends (maybe two or three couples!), so make sure you set up Zoom, a Google Hangout, Duo, Facetime... any video conferencing of your choice, really, ahead of time. I would recommend using something that allows everyone to see everyone at the same time.
      </p>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">Step 2: starting a new game</h3>
      <p>
        Now that you're all in the same (virtual) room, have one of you create a new game, by clicking on "New Game", and share the link (or the ID) with everyone else, to make sure you're on the same game (I recommend using the chat of the video conferencing software for the link sharing).
      </p>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">Step 3: brainstorming</h3>
      <p>Ok, now we're getting to the fun part.</p>
      <p>
        Time to think of some words that would want your friends to act out (try to think of tricky ones!), and throw them in the hat (aka submit them!). You can submit things like movies, websites (one of my favorite words to play is "Craigslist"), tv shows, authors, memes... You're more creative than me, you got this!
      </p>
      <p>Give everyone ~5 minutes or so for this step</p>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">Step 4: act it out</h3>
      <p>This is the meat of it, friends - time for one of you to bite the bullet, draw the first phrase, and act it out until someone is able to guess it.</p>
      <p><b>A few tips for acting things out:</b></p>
      <ul className="list-disc list-inside font-thin leading-loose">
        <li>Start by establishing the number of words in the phrase</li>
        <li>There are a few pre-agreed upon signs for categories (like the little wheel thing for movies, and opening your hands for books. Learn them!</li>
        <li>When someone gets a word right, touch your nose to indicate they got it so you can move on to the next word</li>
        <li>If you're ever stuck, it's always ok to resort to sounds like (point to your ear), and syllables</li>
      </ul>
      <p>PS: if you get your own phrase, you have to act it out! Getting the hard ones you were hoping to trip your friends up with is a part of the charm.</p>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">Step 5: repeat!</h3>
      <p>Whoever guesses the last word, gets to go next. Sorry folks, I don't make up the rules.</p>
      <h3 className="font-extrabold mt-2 mb-2 uppercase">Step 6: repeat again (or don't)</h3>
      <p>
        The game can end whenever you want it to - if you run out of phrases, you can always add more! Or if you run out of time before you run out of phrases, it can be fun to read the remaining ones outloud with your friends to see how cruel you or others were.
      </p>
    </div>
  )
}

export default App
