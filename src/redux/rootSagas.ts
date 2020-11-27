import { all, call, spawn, delay } from "@redux-saga/core/effects";
import { userSagas } from "./userdetails/sagas";

export default function* rootSagas() {
    const sagas = [
        ...userSagas,
    ];
    yield all(
        sagas.map(saga =>
          spawn(function*() {
            while (true) {
              try {
                yield call(saga);
                break;
              } catch (e) {
                console.log(e);
              }
              yield delay(1000);
            }
          })
        )
      );
    }  