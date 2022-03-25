<template>
  <div class="main-app">
    <div class="ome-header reverse-carnegie">
      <a href="https://www.ascap.com"
        ><img
          id="ascap-logo"
          src="https://ome.ascap.com/img/ASCAP_Logo_Horizontal_White.933d9b09.png"
          alt="ascap logo"
      /></a>
      <header class="header-title">
        <h3 class="title-name">Membership Application</h3>
        <span class="ome-nav-text"><span></span></span>
      </header>
      <a
        href="https://ome.ascap.com/helpcenter"
        class="help"
        target="_blank"
        aria-label="Looking for help?"
      >
        <span id="help-button" type="button" class="btn ome-nav-text"
          >LOOKING FOR HELP?</span
        >
        <svg
          id="ome-help-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12" y2="17"></line>
        </svg>
      </a>
    </div>

    <div class="container ome-container">
      <fieldset class="no-border">
        <div class="header">
          <h2 class="seaction-header">Membership</h2>
          <p class="sub-header">Select your Membership type below:</p>
        </div>
        <div class="row">
          <Card
            v-for="membership in memberships"
            v-bind:key="membership.title"
            v-bind:focus="getChosenmembership == membership.title"
            v-bind:error="membershipTypeNotSelected"
            v-bind:title="membership.title"
            v-on:card-chosen="cardClick"
          >
            <template v-slot:header>
              <div class="c-marked-text c-marked-text--center">
                <div class="c-marked-text__icon" v-html="membership.svg"></div>
                <div class="c-marked-text__content">
                  <h2 class="header-text">{{ membership.title }}</h2>
                </div>
              </div>
            </template>
            <template v-slot:body>
              <p>
                {{ membership.description }}
              </p>
              <p>
                <span
                  class="h-text-transform"
                >
                  ${{ membership.price }} Application Fee
                </span>
                <br />
                <span v-if="!membership.refundable" class="refund">
                  non-refundable
                </span>
              </p>
              <h5 class="u-spacing-outside-bottom">
                Requirements
              </h5>
              <ul class="reqList">
                <li
                  v-for="requirement in membership.requirements"
                  v-bind:key="requirement.title"
                  class="u-spacing-outside-bottom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="card-icon"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {{ requirement }}
                </li>
              </ul>
            </template>
          </Card>
        </div>

        <p v-if="membershipTypeNotSelected" class="red-text information-text">
          {{ membershipChoiceerrorMessage }}
        </p>

        <p class="information-text">
          *If you are under 18 years of age please
          <a href="https://ome.ascap.com/helpcenter#underAge" target="_blank"
            >read more about how to join ASCAP.
          </a>
        </p>
        <div
          v-if="
            getChosenmembership === WRITER_PUBLISHER_TITLE ||
            getChosenmembership === PUBLISHER_TITLE
          "
          class="dropdown"
        >
          <h3 class="publisher-type-title">Publisher Company Type</h3>
          <p class="information-text">
            Please select the federal tax classification of your publisher
            company.
          </p>
          <Dropdown v-bind:contentList="getPublisheCompanyType" />
          <p
            v-if="publisherCompanyTypeChoiceMissing"
            class="red-text information-text"
          >
            {{ publisherCompanyTypeErrorMessage }}
          </p>
        </div>

        <p class="information-text">
          ASCAP uses TINCheck and SmartyStreets to verify certain information
          provided by you in connection with your application. Any information
          processed by TINCheck and SmartyStreets shall be subject to the
          privacy policies of
          <a
            href="https://www.tincheck.com/pages/tincheck-agreement"
            target="_blank"
            >TINCheck</a
          >
          and
          <a
            href="https://smartystreets.com/legal/privacy-policy"
            target="_blank"
            >SmartyStreets</a
          >.
        </p>

        <div class="action-buttons">
          <button class="cancel navbutton">CANCEL</button>
          <button class="continue navbutton" @click="continueClick">
            CONTINUE
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
import {
  WRITER_PUBLISHER_TITLE,
  WRITER_TITLE,
  PUBLISHER_TITLE,
  WRITE_PUBLISHER_SVG,
  WRITER_SVG,
  PUBLISHER_SVG,
  PUBLISHER_COMPANY_TYPE,
} from "../assets/Constants.js";
import Card from "./Card-component.vue";
import Dropdown from "./Dropdown-component.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MemberShip",
  components: {
    Card,
    Dropdown,
  },
  data() {
    return {
      WRITER_PUBLISHER_TITLE: WRITER_PUBLISHER_TITLE,
      WRITER_TITLE: WRITER_TITLE,
      PUBLISHER_TITLE: PUBLISHER_TITLE,
      WRITER_PUBLISHER_SVG: WRITE_PUBLISHER_SVG,
      WRITER_SVG: WRITER_SVG,
      PUBLISHER_SVG: PUBLISHER_SVG,
      membershipChoiceerrorMessage: "Please select your membership type.",
      publisherCompanyTypeErrorMessage:
        "Please select your publisher company type.",
      membershipTypeNotSelected: false,
      publisherCompanyTypeChoiceMissing: false,
      sectionSuccess: false,
      memberships: {},
      membershipReq:["Legal Name",
          "Mailing Address",
          "Valid Email Address",
          "SSN/ITIN",
          "Must be 18 or older to apply online*",
      ]
    };
  },
  methods: {
    ...mapActions([
      "publisherError",
      "selectedMembership",
      "chosenPublisherCompanyType",
      "publisherCompanyType",
    ]),
    updatePublisherError(status) {
      //trigger the publisherError action
      this.$store.dispatch("publisherError", status);
    },
    continueClick() {
      //handler for "coninue" button. if there is missing data, needs to show error and notify store
      switch (this.getChosenmembership) {
        case WRITER_PUBLISHER_TITLE:
          this.membershipTypeNotSelected = false;
          if (!this.getChosenPublisherCompanyType) {
            this.publisherCompanyTypeChoiceMissing = true;
            this.updatePublisherError(true);
          } else {
            this.publisherCompanyTypeChoiceMissing = false;
            this.updatePublisherError(false);
            this.sectionSuccess = true;
          }
          break;
        case WRITER_TITLE:
          this.membershipTypeNotSelected = false;
          this.sectionSuccess = true;
          break;
        case PUBLISHER_TITLE:
          this.membershipTypeNotSelected = false;
          if (!this.getChosenPublisherCompanyType) {
            this.publisherCompanyTypeChoiceMissing = true;
            this.updatePublisherError(true);
          } else {
            this.publisherCompanyTypeChoiceMissing = false;
            this.updatePublisherError(false);
            this.sectionSuccess = true;
          }
          break;
        default:
          this.membershipTypeNotSelected = true;
      }
    },
    // cancelAction(){     //cancel button navigates to ASCAP home page
    //     window.location.href = "https://www.ascap.com/"
    // },
    cardClick(title) {
      this.membershipTypeNotSelected = false;
      this.setChosenMembership(title);
    },
    setChosenMembership(title) {
      //triggers chosenMembership store action
      this.$store.dispatch("selectedMembership", title);
      if (title === this.WRITER_TITLE) {
        this.chosenPublisherCompanyType(""); //if the chosen card is "writer" clear the previous chosen publisher type
      }
    },
    initMemberships() {
      //setting up "writer & publisher" membership
      this.memberships[WRITER_PUBLISHER_TITLE] = {
        title: WRITER_PUBLISHER_TITLE,
        description:
          "ASCAP royalties are split evenly between Writers and Publishers. Join as both to ensure you get paid everything you deserve.",
        price: 100,
        refundable: false,
        requirements: this.membershipReq,
        svg: WRITE_PUBLISHER_SVG,
      };
      //setting up "writer" membership
      this.memberships[WRITER_TITLE] = {
        title: WRITER_TITLE,
        description:
          "A Writer is someone who creates a musical composition: the melody, harmony, lyrics, arrangements, beats, etc.",
        price: 50,
        refundable: false,
        requirements: this.membershipReq,
        svg: WRITER_SVG,
      };
      //setting up "publisher" membership
      this.memberships[PUBLISHER_TITLE] = {
        title: PUBLISHER_TITLE,
        description:
          "A Publisher is a person or company that handles the business side of music. Publishers may control the copyrights of a musical composition, licensing, etc.",
        price: 50,
        refundable: false,
        requirements: this.membershipReq,
        svg: PUBLISHER_SVG,
      };
    },
    publisherCompanyType() {
      this.$store.dispatch("publisherCompanyType", PUBLISHER_COMPANY_TYPE);
    },
  },
  computed: {
    ...mapGetters({
      getChosenmembership: "selectedMembership",
      getPublisheCompanyType: "publisherCompanyType",
      getChosenPublisherCompanyType: "chosenPublisherCompanyType",
    }),
  },
  created() {
    this.initMemberships();
    this.publisherCompanyType();
  },
};
</script>

<style scoped>
@media (min-width: 540px) {
  .main-app {
    font-size: 16px;
  }
}

.ome-header {
  background-image: linear-gradient(-135deg, #489cef, #175da7);
  height: 120px;
  display: flex;
}
.header {
  padding-left: 15px;
}
.header-title {
  display: inline-block;
  color: #fff;
  vertical-align: middle;
  text-align: center;
}
@media (min-width: 540px) {
  .header-title {
    width: calc(100% - 450px);
  }
}
.title-name {
  font-size: 28px;
  margin: 40px;
}
#ascap-logo {
  height: 40px;
  margin: 40px;
}
.help {
  margin: auto;
  text-decoration: none;
}
#help-button {
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  padding: 8px 20px;
  font-size: 16px;
  font-family: "Circular Bold", sans-serif;
}
@media (min-width: 540px) {
  #ome-help-icon {
    display: none;
  }
}

.action-buttons {
  padding: 15px;
}
.continue {
  background-color: #1178ce;
  color: #fff;
}
.cancel {
  background-color: #fff;
  color: #0d0d0d;
  border: 1px solid #ededed;
}
.navbutton {
  border-radius: 2px;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  padding: 8px 8px;
  line-height: 18px;
  height: 40px;
  transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}

.ome-container {
  position: relative;
  margin-top: 35px;
  margin-bottom: 50px;
}
.container {
  width: 100%;
  max-width: 1140px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

/* @media screen and (min-width: 992px){
    .container{
        max-width: 960px;
    }
}

@media screen and (min-width: 768px){
    .container{
        max-width: 720px;
    }
}
@media screen and (min-width: 576px){
    .container{
        max-width: 540px;
    }
} */
.no-border {
  border: none;
  border-left: 1px solid #cecece;
}
.reqList {
  list-style-type: none;
  padding: 0;
}
body {
  font-family: "Circular Book", sans-serif;
  max-width: 0;
}

.information-text > a {
  color: #1178ce;
  font-size: 1em;
  font-family: "Circular Book", sans-serif;
  text-transform: none;
  text-decoration: none;
}
.u-spacing-outside-bottom {
  margin-bottom: 16px !important;
}
.row {
  display: flex;
  flex-wrap: nowrap;
}
.red-text {
  color: red;
}
.information-text {
  font-size: 14px;
  font-weight: 500;
  padding-left: 15px;
}
.publisher-type-title {
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 10px;
  padding-left: 15px;
}
.dropdown {
  max-width: 80%;
}
.dropdown > h3 {
  margin-bottom: 0.2em;
}
.dropdown > p {
  margin-bottom: 1em;
}
.c-marked-text--center {
  justify-content: center;
}
.c-marked-text {
  display: flex;
}
.c-marked-text__icon {
  margin-right: 16px;
  flex-shrink: 0;
  padding-top: 0.1em;
  padding-bottom: 0.1em;
}
.c-marked-text--center .c-marked-text__content {
  flex-grow: 0;
}
.c-marked-text__content {
  flex: 1 1 auto;
  align-self: center;
}
.card-icon {
  vertical-align: sub;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.header-text {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.25em;
  font-family: "Circular Medium", sans-serif;
}
.h-text-transform {
  text-transform: uppercase;
  color: #175da7;
  font-family: "Circular Book", sans-serif;
}
.t-weight_bold {
  font-family: "Circular Book", sans-serif;
}
.refund {
  font-size: 14px;
   color: #6d6d6d !important;
}
</style>
