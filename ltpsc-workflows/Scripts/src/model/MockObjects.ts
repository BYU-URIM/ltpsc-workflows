import { IUser } from './Users';
import * as Groups from './Groups'
import { ListItem } from './ListItem';
import { CollectionsManagement, Curator } from './Groups';


// test user
export const TestUser: IUser = {
    name: 'Connor Moody',
    email: 'cdmoody0604@gmail.com',
    netId: 'cmoody4',
    group: Groups.Curator
}




// test list items
let testListItem1 = new ListItem()
let testListItem2 = new ListItem()
let testListItem3 = new ListItem()
let testListItem4 = new ListItem()
let testListItem5 = new ListItem()

testListItem1.Title = 'Test Item 1'
testListItem1.Accession_x0020_Number = '2321'
testListItem1.Call_x0020_Number = '2323'
testListItem1.Collection_x0020_Type = 'MSS'
testListItem1.Monetary_x0020_Vale_x0020_of_x00 = 100
testListItem1.Collecting_x0020_Area = '19th Century'
testListItem1.Submitting_x0020_Curator = 'Connor Moody'
testListItem1.Stage = 'Enter Aquisition Information'
testListItem1.Id = 100

testListItem2.Title = 'Test Item 2'
testListItem2.Accession_x0020_Number = '6755'
testListItem2.Call_x0020_Number = '5234'
testListItem2.Collection_x0020_Type = 'MSS'
testListItem2.Monetary_x0020_Vale_x0020_of_x00 = 500
testListItem2.Collecting_x0020_Area = '20th Century'
testListItem2.Submitting_x0020_Curator = 'Connor Moody'
testListItem2.Stage = 'Enter Aquisition Information'
testListItem2.Id = 101

testListItem5.Title = 'Test Item 2'
testListItem5.Accession_x0020_Number = '6755'
testListItem5.Call_x0020_Number = '5234'
testListItem5.Collection_x0020_Type = 'MSS'
testListItem5.Monetary_x0020_Vale_x0020_of_x00 = 500
testListItem5.Collecting_x0020_Area = '20th Century'
testListItem5.Submitting_x0020_Curator = 'Connor Moody'
testListItem5.Stage = 'Enter Aquisition Information'
testListItem5.Id = 101


testListItem3.Title = 'Test Item 3'
testListItem3.Accession_x0020_Number = '2323'
testListItem3.Call_x0020_Number = '5234'
testListItem3.Collecting_x0020_Area = '20th century'
testListItem3.Processing_x0020_Plan_x0020_Date = '3/26/2017'
testListItem3.Extent_x0020__x002d__x0020_in_x0 = 22
testListItem3.Current_x0020_Arrangement = 'current arrangement'
testListItem3.Processing_x0020_Level = 'Minimal'
testListItem3.Condition_x0020_Report_x0020__x0 = 'asdfasdf'
testListItem3.Proposed_x0020_Series_x0020_Arra = 'adfsadf'
testListItem3.Deaccession_x003F_ = false
testListItem3.Description_x0020_of_x0020_Propo = 'description'
testListItem3.Restrictions = 'restrictions'
testListItem3.Stage = 'Processing Plan'
testListItem3.Id = 102

testListItem4.Title = 'Test Item 4'
testListItem4.Accession_x0020_Number = '2313'
testListItem4.Call_x0020_Number = '5235'
testListItem4.Collecting_x0020_Area = '20th century'
testListItem4.Processing_x0020_Plan_x0020_Date = '3/28/2017'
testListItem4.Extent_x0020__x002d__x0020_in_x0 = 23
testListItem4.Current_x0020_Arrangement = 'current arrangement'
testListItem4.Processing_x0020_Level = 'Minimal'
testListItem4.Condition_x0020_Report_x0020__x0 = 'asdfasdf'
testListItem4.Proposed_x0020_Series_x0020_Arra = 'adfsadf'
testListItem4.Deaccession_x003F_ = true
testListItem4.Description_x0020_of_x0020_Propo = 'description'
testListItem4.Restrictions = 'restrictions'
testListItem4.Stage = 'Processing Plan'
testListItem4.Id = 103

export const TestListItems = [testListItem1, testListItem2, testListItem3, testListItem3, testListItem5]