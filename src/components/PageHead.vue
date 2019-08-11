<template>
    <header>
        <div class="container">
            <div class="branding">
                <router-link to="/" class="logo">
                    <img src="/rocket.png" alt="Rocket Icon" />
                </router-link>
                <h1>Snippet Haus</h1>
                <span class="subtitle">Saves you searching StackOverflow, right?</span>
            </div>
            <SearchBar v-bind:class="this.searchActive.search" class="search-bar"/>
            <router-link v-bind:class="this.searchActive.backArrow" to="/" class="back-arrow">
                <div class="link-content">
                    <i class="fas fa-long-arrow-alt-left"></i> Go Back
                </div>
            </router-link>
        </div>
        <div class="settings">
            <button type="button" @click="showSettings"><i class="fas fa-ellipsis-v"></i></button>
            <div class="settings-list" ref="settingsList">
                <router-link to="/"><i class="fas fa-home"></i></router-link>
                <a href="https://github.com/Charlesbjerg/snippet-haus" title="View on GitHub"><i class="fab fa-github"></i></a>
                <!-- <router-link to="/create"><i class="far fa-plus-square"></i></router-link> -->
                <router-link to="/about-snippet-haus" title="View more info about snippet haus"><i class="fas fa-info-circle"></i></router-link>
            </div>
        </div>
    </header>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
    components: {
        'SearchBar': SearchBar
    },
    computed: {
        displaySearch() {
            return this.$store.state.displaySearch;
        },
        searchActive() {
          return {
              search: this.displaySearch ? 'active' : '',
              backArrow: !this.displaySearch ? 'active' : ''
          }
        }
    },
    methods: {
        showSettings() {
            if (this.settingsOpen) {
                this.$refs.settingsList.classList.remove('active');
                this.settingsOpen = false;
            } else {
                this.$refs.settingsList.classList.add('active');
                this.settingsOpen = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    background-color: $accent;
    padding: 1em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 30px solid $accent-dark;
    position: relative;
    .container {
        max-width: $container-width;
        padding: 0 1em;
        width: 100%;
        text-align: center;
        color: #fff;
        .branding {
            display: flex;
            justify-content: center;
            align-items: center; 
            flex-direction: column;
            .logo {
                display: flex;
                justify-content: center;
                align-items: center; 
                background-color: #fff;
                border: 5px solid $accent-dark;
                border-radius: 50%;
                width: 96px;
                height: 96px;
                img {
                    width: 52px;
                    height: 52px;
                }
            }
            h1 {
                font-size: 2.5em;
                font-weight: 400;
                margin: 0.25em 0;
            }
            span {
                font-size: 1.25em;
                font-style: italic;
            }
        }
        .back-arrow {
            color: #fff;
            display: inline-block;
            opacity: 0;
            max-height: 0;
            font-size: 25px;
            border-radius: $border-radius;
            transition: 0.75s ease-in-out;
            .link-content {
                padding: 0.5rem 1rem;
                max-height: 0;
                overflow: hidden;
            }
            &.active {
                margin-top: 1em;
                opacity: 1;
                max-height: 75px;
                .link-content {
                    max-height: 45px;
                }
            }
            &:hover {
                background-color: $accent-dark;
            }
        }
        .search-bar {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            margin: 0;
            transition: 0.75s ease-in-out;
            &.active {
                max-height: 93px;
                opacity: 1;
                margin: 1em 0;
            }
        }
    }
    .settings {
        position: absolute;
        top: 32px;
        right: 32px;
        button {
            background-color: $accent;
            border: 5px solid $accent-dark;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            transition: $default-transition;
            &:hover {
                background-color: $accent-dark;
                color: #fff;
            }
            i {
                font-size: 25px;
            }
        }
        .settings-list {
            display: flex;
            width: 60px;
            max-height: 0;
            flex-direction: column;
            padding-top: 35px;
            margin-top: -25px;
            background-color: $accent-dark;
            transition: $default-transition;
            overflow: hidden;
            &.active {
                max-height: 185px;
            }
            a, router-link {
                font-size: 25px;
                color: #fff;
                text-align: center;
                margin: 10px 0;
                transition: $default-transition;
                &:hover {
                    color: #000;
                }
                &.router-link-active {
                    color: #000;
                }
            }
        }
    }
}

@media screen and (max-width: 500px) {
    .settings {
        .settings-list.active {
           -webkit-box-shadow: 0px 2px 20px 0px rgba(0,0,0,0.35);
            -moz-box-shadow: 0px 2px 20px 0px rgba(0,0,0,0.35);
            box-shadow: 0px 2px 20px 0px rgba(0,0,0,0.35); 
        }
    }
}

</style>
