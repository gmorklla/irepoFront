import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorSnackService {

  constructor(public snackBar: MatSnackBar) { }
  // Function that will call the snack bar component
  openSnackBar(message: string, action: string) {
    // Open snack bar w/message and action passed to the function
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
