import Component from '@ember/component';
import hbs from "htmlbars-inline-precompile";
import { assert } from '@ember/debug';

export default Component.extend({
  layout: hbs`{{yield}}`,

  // Elm module
  src: undefined,

  // anything you want to pass to the Elm module
  flags: undefined,

  // function that is passed the Elm module's ports
  setup: undefined,

  didReceiveAttrs() {
    assert('[elm-component]: src attribute is required', this.src);
  },

  didInsertElement() {
    const { ports } = this.src.init({
      node: this.element,
      flags: this.flags
    });
    if (this.setup) {
      this.setup(ports);
    }
  }
});
