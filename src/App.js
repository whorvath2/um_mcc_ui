import Search from './search'

export default function App() {
     return (
          <div className="App">
              <div className="text-center text-bg-primary p-3">
                  <h5>University of Michigan® Staff*</h5>
                  <h1>Meeting Cost Calculator</h1>
                  <p className={"fst-italic m-1"}>* This application is neither endorsed by nor associated with the University of Michigan®.</p>
              </div>
              <Search></Search>
              <div className={"row p-3"}>
                  <div className={"col-2"}/>
                  <div className="text-center text-bg-primary p-3 col-8">
                      <footer>
                          <p>University of Michigan is a registered® trademark of the University of Michigan. Use of it does not imply any affiliation with or endorsement by the University of Michigan.</p>
                      </footer>
                  </div>
                  <div className={"col-2"}/>
              </div>

          </div>
     );
}

