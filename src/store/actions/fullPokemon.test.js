// @flow
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as myactions from './fullPokemon'
import expect from 'expect'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('async actions full pokemon', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  it('should execute fetch data', () => {
    fetchMock.get('*', { body: { todos: ['do something'] } })
    const store = mockStore({})

    store.dispatch(myactions.getFullPokemon('name', '/opo'))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual(myactions.requestFullPokemon('name'))
        expect(actions[1]).toEqual(myactions.receiveFullPokemon({ todos: ['do something'] }))
      })
  })

  it('should execute fetch error', () => {
    fetchMock.get('*', { body: { message: 'do something' }, status: 403 })
    const store = mockStore({})

    store.dispatch(myactions.getFullPokemon('name', '/opo'))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual(myactions.requestFullPokemon('name'))
        expect(actions[1]).toEqual(myactions.errorFullPokemon('name', 'Bad response from server'))
      })
  })
})
