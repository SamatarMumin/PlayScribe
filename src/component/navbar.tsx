export default function NavBar() {
    return (
      <div className="mt-8 sm:mx-auto sm:max-w-md bg-black space-y-6 ">
        <form className="mb-0 space-y-6 sm:w-7 border-spacing-1">
          <input type="text" name="Game Title"></input>
          <input type="text" name="review"></input>
          <input type="number" name="stars" max={5}></input>
          <button type="submit" className="text-red-50"> Submit</button>
        </form>
      </div>
    );
  }
  