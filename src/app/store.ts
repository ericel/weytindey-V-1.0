import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

export interface Status {
  color: string,
  status: string,
  sid?: string | number,
  createdAt?: string,
  updatedAt?: string,
  uid?: string,
  tags?: any
  rating?: any;
}


export interface Action {
  color: string,
  status: string,
  sid?: string | number,
  createdAt?: string,
  updatedAt?: string,
  uid?: string,
  username: string
}

export interface User {
  name: string,
  avatar: string,
  email: string,
  provider: string,
  uid: string,
  id?: string
}
export interface State {
  statuses: Array<Status>,
  actions: Array<Status>,
  user: Array<User>,
}

const defaultState = {
  statuses: [],
  actions: [],
  user: []
}

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private _store = _store;
  changes = this._store.asObservable().distinctUntilChanged()

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }
}
