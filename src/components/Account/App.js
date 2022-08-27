

import MenuLeft from "../Account/MenuLeft"
import Update from './Member/Update';

function App(props) {
  
  return (
    <>
         <section>
            <div class="container">
              <div class="row">
                    <MenuLeft />

                <div class="col-sm-9">
              
                    {/* <Update/> */}
                    {props.children}
                  
                </div>
              </div>
            </div>
      </section>
    
    
    </>
  );
}

export default App;
