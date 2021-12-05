import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  mode: string = 'virtual';

  constructor() { }

  ngOnInit(): void {
  }

  changeMod(val: number) {
    this.mode = val == 1 ? 'Ausente' : 'Presente';
  }

}
