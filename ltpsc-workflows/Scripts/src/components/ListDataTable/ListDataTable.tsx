import * as React from 'react'
import { inject } from '../../utils/inversify.config'
import { autobind } from 'core-decorators';
import { observer } from 'mobx-react'
import ListDataStore from '../../stores/ListDataStore';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { TableStyle, ColumnHeaderStyle, TableContainerStyle, TableBodyStyle } from './Styles_ListDataTable';


@autobind
@observer
export class ListDataTable extends React.Component<any, any> {
    
    @inject(ListDataStore)
    private listDataStore: ListDataStore

    render() {
        return (
            <div style={TableContainerStyle}>
                <Table onRowSelection={this.listDataStore.updateSelectedItemIndex} bodyStyle={TableBodyStyle} fixedHeader={false} selectable={true} style={TableStyle} >
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                        {
                            this.listDataStore.currentView.columns.map((column, index) => (
                                <TableHeaderColumn style={ColumnHeaderStyle} key={`${index}`} >{column.displayName}</TableHeaderColumn> 
                            ))
                        }
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false}>
                    {
                        this.listDataStore.currentViewListItems.map((listItem, itemIndex) => (
                            <TableRow key={itemIndex}>
                            {
                                this.listDataStore.currentView.columns.map((column, index) => (
                                    <TableRowColumn key={`${index}`} >{`${listItem[column.spName]}`}</TableRowColumn>
                                ))
                            }
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </div>
        )
    }
}