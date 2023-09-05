import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertComponent } from './alert.component';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  private alert(message: string, config: MatSnackBarConfig) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: message,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
      ...config
    })
  }

  public success(message: string) {
    this.alert(message, { panelClass: 'snack-bar-success' })
  }

  public error(message: string) {
    this.alert(message, { panelClass: 'snack-bar-error' })
  }
  
  public info(message: string) {
    this.alert(message, { panelClass: 'snack-bar-info' })
  }

  public warning(message: string) {
    this.alert(message, { panelClass: 'snack-bar-warning' })
  }
}
