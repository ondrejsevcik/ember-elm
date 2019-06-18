import {module, test} from 'qunit';
import {visit, fillIn, click, settled} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';

module('Acceptance | chat-example', function(hooks) {
  setupApplicationTest(hooks);

  test('chat-example works', async function(assert) {
    await visit('/');

    await fillIn('[data-test-elm-input]', 'Hello from Elm');
    await click('[data-test-elm-send-btn]');

    await fillIn('[data-test-js-input]', 'Hello from JS');
    await click('[data-test-js-send-btn]');

    // TODO check if there is a way to wait for Elm to process messages 
    // and check from Ember for that
    // await settled();

    assert.dom('[data-test-chat-message="0"]').hasText('Elm says: Hello from Elm');
    assert.dom('[data-test-chat-message="1"]').hasText('JS says: Hello from JS');
  });
});
