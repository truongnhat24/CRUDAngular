import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { UserService } from './services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CRUDAngular';

  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'birthday', 
    'gender',
    'education',
    'company',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
              private _aeService: UserService) {}
  
  ngOnInit(): void {
    this.getUsersList();
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val) {
          this.getUsersList();
        }
      }
    })
  }

  getUsersList(){
    this._aeService.getUsersList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this._aeService.deleteUser(id).subscribe({
      next:(res) => {
        alert('User deleted');
        this.getUsersList();
      },
      error:(res) => {
        console.log(res);
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {data, });
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val) {
          this.getUsersList();
        }
      }
    })
  }
}
