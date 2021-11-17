import { firebaseDb } from './firebase'

export class FirebaseList {
  constructor (actions, modelFactory, path = null) {
    this._actions = actions
    this._modelFactory = modelFactory
    this._path = path
  }

  get path () {
    return this._path
  }

  set path (value) {
    this._path = value
  }

  push (value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
        .push(value, error => error ? reject(error) : resolve())
    })
  }

  remove (key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .remove(error => error ? reject(error) : resolve())
    })
  }

  set (key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .set(value, error => error ? reject(error) : resolve())
    })
  }

  update (key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .update(value, error => error ? reject(error) : resolve())
    })
  }

  subscribe (emit, filter) {
    // this.unsubscribe()

    let ref = firebaseDb.ref(this._path)
    if (filter) {
      ref = ref.orderByChild(filter.child).equalTo(filter.equalTo)
    }
    let initialized = false
    const list = []

    ref.once('value', () => {
      initialized = true
      emit(this._actions.onLoad(list))
    })

    const unhandled = () => {
      this.unsubscribe()
      return {
        type: 'UNHANDLED',
        payload: {}
      }
    }

    ref.on('child_added', snapshot => {
      if (initialized) {
        const onAdd = this._actions.onAdd || unhandled
        emit(onAdd(this.unwrapSnapshot(snapshot)))
      } else {
        list.push(this.unwrapSnapshot(snapshot))
      }
    })

    ref.on('child_changed', snapshot => {
      const onChange = this._actions.onChange || unhandled
      emit(onChange(this.unwrapSnapshot(snapshot)))
    })

    ref.on('child_removed', snapshot => {
      const onRemove = this._actions.onRemove || unhandled
      emit(onRemove(this.unwrapSnapshot(snapshot)))
    })

    this._unsubscribe = () => ref.off()
  }

  unsubscribe () {
    if (this._unsubscribe) this._unsubscribe()
  }

  unwrapSnapshot (snapshot) {
    const attrs = snapshot.val()
    attrs.id = snapshot.key
    return this._modelFactory(attrs)
  }
}
