<template>
  <div class="card-frame">
    <button
      class="c-card no-padding"
      v-bind:class="[
        error
          ? 'red-border'
          : focus
          ? 'c-card-interactive'
          : hover
          ? 'c-card-hover'
          : '',
      ]"
      v-on:click.stop="clickUpdate"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div
        class="card-header"
        v-bind:class="[
          focus
            ? 'card-header-colors-interactive'
            : hover
            ? 'card-header-colors card-header-hover'
            : 'card-header-colors-not-interactive',
        ]"
      >
        <slot name="header" />
      </div>
      <div class="card-body">
        <slot name="body" />
      </div>
    </button>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "Card-component",
  props: {
    title: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      required: false,
    },
    focus: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    // ...mapActions([
    //     'chosenMembership',
    //     'chosenPublisherCompanyType'
    // ]),
    clickUpdate() {
      //handler for click event, when the card is chosen
      this.$emit("card-chosen", this.title);
    },
  },
};
</script>

<style scoped>
.card-frame {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.selectedBoth {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  position: absolute !important;
  clip: rect(0 0 0 0) !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}
.c-card {
  display: block;
  background: #fafafa;
  border: 1px solid #85868c;
  border-radius: 2px;
  margin-bottom: 0;
}

.no-padding{
    padding: 0;
}
.c-card-hover {
  border-color: #4dbdff;
  cursor: pointer;
}
.c-card-interactive {
  background: #fff;
  cursor: pointer;
  transition: all 0.5s;
  border-color: #1178ce;
  box-shadow: 0 0 15px -1px rgb(0 0 0 / 50%);
}
.red-border {
  border: 1px solid red;
}
.card-header-hover {
  border-bottom: 1px solid #4dbdff;
}
.card-icon {
  vertical-align: sub;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.card-header,
.card-body {
  padding: 24px 24px;
}
.card-body {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  text-align: left;
  background: #fff;
}
.card-header {
  border-bottom: 1px solid #85868c;
  font-size: 16px;
  font-weight: 400;
  justify-content: center;
  color: #004183;
  background: linear-gradient(-180deg,#fafafa 0%,#ededed 100%);
}
.card-header-colors {
  color: #004183;
  background: #fafafa;
}
.card-header-colors-interactive {
  color: #fff;
  background: #1178ce;
  border-color: #1178ce;
}
.card-header-colors-not-interactive {
  color: #85868c;
  background: #fafafa;
  border-color: #85868c;
}

</style>
