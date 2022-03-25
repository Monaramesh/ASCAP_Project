<template>
<div class="input-container dropdown">
    <div class="dropdown bootstrap-select validation-error">
        <label v-bind:class="[isPublisherTypeChosen ? 'publisher-type-label' : 'dont-show']">Publisher Company Type</label>
        <button type="button" role="button" class="btn dropdown-toggle"
        v-bind:class="[getPublisherError ? 'red-border' : isPublisherTypeChosen ? 'option-chosen-border' : '' ]" 
        v-on:click="toggleList">
            <span class="filter-option">{{label}}</span>
        </button>
        <div class="dropdown-menu" v-bind:class="[showList ? 'show' : 'dont-show']" >
            <ul role="menu" class="dropdown-menu inner">
                <li v-for="(element) in contentList" v-bind:key="element" v-on:click="updatePublisherType" class="list-item">
                    <a tabindex=index>
                        <span>{{element}}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
    
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default{
    name: 'Dropdown-component',
    props: {
        contentList: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            showList: false,                    //indicates whether to toggle down or up the dropdown list
            label: "Publisher Company Type",     //that is the default title - should be a prop (future improvement)  
            isPublisherTypeChosen: false
        }
    },
     methods:{
        ...mapActions([
            'chosenPublisherCompanyType',
            'publisherError'
        ]),
        updateChosenPublisherCompanyType(publisherCompanyType){ //triggers chosenPublisherCompanyType store action
            this.$store.dispatch('chosenPublisherCompanyType',publisherCompanyType)
        },
        clearPublisher(){   //if the user chose an item from the list, clears the error status in the store
            this.$store.dispatch('publisherError',false)
        },
        toggleList(){   //update the toggle state attribute
            this.showList = !this.showList
        },
        updatePublisherType(event){ //event handlare when the user chooses a publisher company type
            this.toggleList()
            this.label = event.target.textContent
            this.updateChosenPublisherCompanyType(event.target.textContent)
            this.clearPublisher()
            this.isPublisherTypeChosen = true
        }
    },
    computed:{
        ...mapGetters({getPublisherError: 'publisherError'})
    },
   created() {
       console.log("CONTENT LIST: ",this.contentList)
   }
}
</script>
<style scoped>
.input-container{
    width: 100%;
    position: relative;
    padding-bottom: 10px;
    padding-left: 15px;
}
.dropdown.bootstrap-select {
    background-color: #fff;
    width: 100% !important;
}
.dropdown-toggle{
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border: thin solid #85868c;
    border-radius: 2px;
    padding: 0 12px;
    width: 100%;
}
.dropdown.bootstrap-select .btn.dropdown-toggle:after{
    content: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0nZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biBzYy1pd3NLYkkgY25sY29RJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNCcgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGFyaWEtaGlkZGVuPSd0cnVlJyBkYXRhLXJlYWN0aWQ9JzI2Nic+PHBvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknPjwvcG9seWxpbmU+PC9zdmc+);
    transition: transform .3s ease;
    width: auto;
    height: 28px;
    position: relative;
    top: 6px;
    vertical-align: .255em;
    border: 0px;    
    float: right;
}
.bootstrap-select .dropdown-toggle:before {
    content: '';
    display: inline-block;
}
div.dropdown-menu {
    min-width: 100% !important;
    margin: -1px 0 0 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0;
    transition: opacity .2s ease;
    border: 1px solid #1178ce;
    border-top: none;
}
.dropdown-menu {
    word-break: break-word;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 10rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    display: block;
} 
.dropdown-menu.inner {
    position: static;
    float: none;
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.dropdown.bootstrap-select div.dropdown-menu ul li a {
    display: block;
    padding: 12px 10px;
    color: #0d0d0d;
    border-bottom: 1px solid #ededed;
    min-width: 0;
    word-wrap: break-word;
    white-space: pre-wrap;
}
.dropdown.bootstrap-select div.dropdown-menu ul li a:hover {
    background-color: #ededed;
    color: #1178ce;
}
.filter-option{
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: start;
    width: 80%;
    color: #6d6d6d;
}
.show {
    display: block;
}
.dont-show{
    display: none;
}
.list-item{
    font-size: 14px;
    font-weight: 400;
}
.red-border{
    border: thin solid red;
}
.option-chosen-border{
    border: 1px solid #1178ce;
}
.publisher-type-label{
    display: inline-block;
    position: absolute;
    color: #6d6d6d;
    margin-left: 12px;
    padding: 0 2px 2px 0;
    z-index: 3;
    pointer-events: none;
    line-height: 18px;
    transition: all .3s ease;
    transform: translateY(12px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -20px;
    font-size: 10px;
    z-index: 2000;
    background-color: white;
}

</style>
