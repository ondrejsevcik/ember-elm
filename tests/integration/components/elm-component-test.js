import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render, settled } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";
import Elm from "dummy/elm-modules";

module("Integration | Component | elm-component", function(hooks) {
  setupRenderingTest(hooks);

  test("it works", async function(assert) {
    this.set("Elm", Elm);
    await render(hbs`{{elm-component src=Elm.Hello}}`);
    await settled();
    assert.dom(this.element).hasText("hello world");
  });
});
