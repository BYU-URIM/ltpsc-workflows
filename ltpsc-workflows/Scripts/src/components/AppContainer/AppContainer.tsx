import * as React from 'react'
import { inject } from '../../utils/inversify.config'
import ListDataStore from '../../stores/ListDataStore';
import { observer } from 'mobx-react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { autobind } from 'core-decorators';
import { ListDataTable } from '../ListDataTable/ListDataTable';
import { EditItemForm } from '../EditItemForm/EditItemForm';
import RaisedButton from 'material-ui/RaisedButton';
import { EditItemButtonStyle, pageHeaderStyle, allAppStyle, selectViewStyle, tableTitleStyle, 
            tableHeaderContainer, allTableStyle, navigateButtonStyle, navContainerStyle, greetingStyle } from './Styles_AppContainer';
import { StageOrder } from '../../model/Stages';
import FlatButton from 'material-ui/FlatButton';
import { Column } from '../../model/Columns';
import Badge from 'material-ui/Badge';
import { badgeStyle, hiddenBadgeStyle } from './Styles_AppContainer';
import Snackbar from 'material-ui/Snackbar';

@autobind
@observer
export class AppContainer extends React.Component<any, any> {

    @inject(ListDataStore)
    private listDataStore: ListDataStore

    componentWillMount() {
        this.listDataStore.fetchData()
    }

    onSelectView(value) {
        this.listDataStore.setCurrentView(value)
    }

    render() {
        window['store'] = this.listDataStore
        return (
            <div style={allAppStyle}>
                <h1 style={pageHeaderStyle} >LTPSC Workflows</h1>
                <div style={greetingStyle} >{`Hello ${this.listDataStore.currentUser.name}`}</div>
                {/*<div style={tableHeaderContainer}>
                    <SelectField style={selectViewStyle} value={this.listDataStore.currentView.stageName} floatingLabelText='Select View' onChange={(this.onSelectView)} >
                    {
                        this.listDataStore.currentUserPermittedViews.map((view, index) => (
                            <MenuItem key={index} value={view.stageName} primaryText={view.stageName} />
                        ))
                    }
                    </SelectField>
                    <h3 style={tableTitleStyle} >Current View: {this.listDataStore.currentView.stageName}</h3>
                </div>*/}

                <h2>Navigate to View</h2>

                <div style={navContainerStyle}>
                {
                    this.listDataStore.currentUser.group.permittedViews.map((view, index) => (
                        <FlatButton backgroundColor={view === this.listDataStore.currentView ? '#D8D8D8' : '#F2F2F2'} onClick={() => this.onSelectView(view.stageName)} key={index} style={navigateButtonStyle} >{view.stageName}
                        {
                            <Badge style={this.listDataStore.getPendingItemCountForView(view.stageName) ? badgeStyle : hiddenBadgeStyle} 
                                badgeContent={this.listDataStore.getPendingItemCountForView(view.stageName)} primary={true} />
                        }
                        </FlatButton>
                    ))
                }
                </div>

                <h3 style={tableTitleStyle} >Current View: {this.listDataStore.currentView.stageName}</h3>
                <ListDataTable />
                <EditItemForm />
                { /* Only display the new item button on the first stage */ 
                    this.listDataStore.currentView.stageName === StageOrder[0] &&
                    <RaisedButton primary={true} style={EditItemButtonStyle} label='Add a new Item' onClick={this.listDataStore.displayNewItemForm} />
                }
                {
                    this.listDataStore.selectedItemIndex !== null
                    && <RaisedButton primary={true} style={EditItemButtonStyle} onClick={this.listDataStore.displayExisitingItemForm} label='Edit Item' />
                }

                <Snackbar open={this.listDataStore.isShowFormError} message={this.listDataStore.editFormErrorMessage} />
            </div>
        )
    }
}