import Search from './search/search'

export default function App() {
     return (
          <div className="row">
              <div className={"col"} />
              <div className={"col-10 p-3 text-center text-bg-primary"}>
                  <h1>Meeting Cost Calculator</h1>
                  <h5>for University of Michigan® Staff</h5>
                  <p className={"fst-italic m-1"}>This application is neither endorsed by nor associated with the University of Michigan®.</p>
              </div>
              <div className={"col"} />
              <Search />
          </div>
     );
}

