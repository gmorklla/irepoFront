import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ErrorSnackService } from '../../../shared/services/error-snack.service';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() objForTable;
  displayedColumns;
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<Element>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private errorSnack: ErrorSnackService
  ) { }

  ngOnInit() {
    this.dataSource.data = this.objForTable;
    this.displayedColumns = ['email', 'created', 'delete'];
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detect per day data change
    if (changes['objForTable']) {
      this.dataSource.data = this.objForTable;
    }
  }

  ngAfterViewInit () {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter (filterValue: string) {
    this.dataSource.filterPredicate = (data, filter: string) => data.email.indexOf(filter) !== -1;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteUser (row) {
    const deleteAccount = confirm('Do yo really want to delete \'' + row.email + '\' account?');
    Observable.of(deleteAccount)
      .subscribe(res => {
        res ? console.log('user delete') : console.log('not');
      });
  }

}
