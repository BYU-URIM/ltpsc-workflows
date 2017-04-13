import "es6-promise/auto"
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import { useStrict } from 'mobx'
import { MuiThemeProvider } from 'material-ui/styles';
import { AppContainer } from "./components/AppContainer/AppContainer";
import DependencyContainer from './utils/inversify.config'
import ListDataStore from './stores/ListDataStore';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

// sets strict mode for mobx stores meaning that all state mutations must occur through @actions
useStrict(true)

// fetch the necessary data from the server, and when complete, render the app ui
DependencyContainer.get(ListDataStore).fetchData().then(() => {

    ReactDOM.render(
        <MuiThemeProvider>
            <AppContainer />
        </MuiThemeProvider>
    , document.getElementById('root'))

})
