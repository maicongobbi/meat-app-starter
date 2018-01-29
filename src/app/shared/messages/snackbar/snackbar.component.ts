import {NotificationService} from "../notification.service";
import {trigger, state, style, transition, animate} from "@angular/animations";
import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
      //transitions(estado antigo -> atual, animate (duração  delay  animação)
      //pode-se usar tbm neste caso o transition('*=> *', animate('500ms 0s ease-out'))
      // de qq estado para qq estado 
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  /**
   * se inscreve no notService para poder receber as mensagens
   */
  constructor(private notificationService: NotificationService) {}

  message: string;
  snackVisibility: string = "hidden"


  ngOnInit() {
    /**
     * se inscreve nesse serviço e fica aguardando uma mensagem
     * subscribe escuta as mensagens - coloca um listenner no observable
     *  e só apartir dele que serei notificado
     * -do = permite executar uma ação assim q chegar a mensagme
     * -switchMap faz algo parecido com o map, troca o observable inteiro, os eventos que ele emitiria
     * ele encadeia dois observable - qdo mandamos uma outra mensagem e ele ve que tem um observable ativo ele 
     * não os deixa concorrer
     * 
     * essa jogada evita que façamos vários subscribbe e os encadeia como se fossem um só
     */
    this.notificationService.notifier.
      do(message => {
      this.message = message
      this.snackVisibility = 'visible'
    }).switchMap(message => Observable.timer(3000)).subscribe(timer => this.snackVisibility = 'hidden')
  }

}
