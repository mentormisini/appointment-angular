import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: '13:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Xheki'},
  {position: '12:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Rabia'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Diellza'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Une e'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'hehe'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Xheki'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Xheki'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Xheki'},
  {position: '15:30', name: '02/02/2020', weight:'Ngjyrosje', symbol: 'Xheki'},
];
