import test from 'ava'
import { make, isMatch } from './selector'


test('make', t => {

  t.deepEqual(
    make('span'),
    {
      tag: 'span'
    }
  )

  t.deepEqual(
    make('#span'),
    {
      id: 'span'
    }
  )

  t.deepEqual(
    make('span#one.blue'),
    {
      tag: 'span',
      id: 'one',
      class: 'blue'
    }
  )
})



test('isMatch', t => {

  t.is(
    isMatch(
      make('.blue'),
      'div',
      {class: 'blue'}
    ),
    true
  )

  t.is(
    isMatch(
      make('.blue'),
      'div',
      {}
    ),
    false
  )

  t.is(
    isMatch(
      make('span#one'),
      'div',
      {id: 'one'}
    ),
    false
  )

  t.is(
    isMatch(
      make('#one.green'),
      'div',
      {id: 'one', class: 'green'}
    ),
    true
  )

  t.is(
    isMatch(
      make('#one.green'),
      'div',
      {id: 'one', class: 'blue green'}
    ),
    true
  )

})