import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redux-sync-simulation',
  templateUrl: './redux-sync-simulation.component.html',
  styleUrls: ['./redux-sync-simulation.component.css'],
})
export class ReduxSyncSimulationComponent implements OnInit {
  ngOnInit(): void {
    this.demoFn();
  }

  demoFn(): void {
    interface AppState {
      msg: string;
      person: Object;
      isAuth: boolean;
    }

    const initialState: AppState = {
      msg: '',
      person: {},
      isAuth: false,
    };

    const EVENT_1 = 'EVENT1';
    const EVENT_2 = 'EVENT2';
    const EVENT_3 = 'EVENT3';

    const reducer = (state: AppState, action: any) => {
      switch (action.type) {
        case EVENT_1:
          return { ...state, msg: action.value };
        case EVENT_2:
          return { ...state, person: action.value };
        case EVENT_3:
          return { ...state, isAuth: action.value };

        default:
          return state;
      }
    };

    const eventCollection = [
      { type: EVENT_1, value: 'Initial Message!' },
      { type: EVENT_2, value: { name: 'Gosho', age: 21, gender: 'M' } },
      { type: EVENT_3, value: true },
      { type: 'sadsadsadsa', value: true },
    ];

    const result = eventCollection.reduce(reducer, initialState);
  }
}
