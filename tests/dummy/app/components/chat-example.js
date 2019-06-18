import Component from '@ember/component';
import hbs from "htmlbars-inline-precompile";
import Elm from "dummy/elm-modules";

export default Component.extend({
  Elm,

  value: "",

  layout: hbs`
    <h2>Ember component</h2>
    <input 
      data-test-js-input=true
      value={{readonly value}}
      class="js-input"
      placeholder="Send something from JS"
      onChange={{action (mut value) value="target.value"}}
    ><button
      data-test-js-send-btn=true
      class="js-send-btn"
      onclick={{action 'sendToElm'}}
    >
      Send
    </button>

    <h2>Elm component</h2>
    {{elm-component 
      src=Elm.Chat 
      flags="JS says"
      setup=(action "setupPorts")
    }}
  `,

  actions: {
    setupPorts(ports) {
      this.set('ports', ports);
    },

    sendToElm() {
      this.ports.sendToElm.send(this.value);
      this.set(this.value, '');
    }
  }
});
