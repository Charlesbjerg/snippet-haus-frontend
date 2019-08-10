<template>
    <header>
        <div class="container">
            <div class="branding">
                <div class="logo">
                    <img src="rocket.png" alt="Rocket Icon" />
                </div>
                <h1>Snippet Haus</h1>
                <span class="subtitle">Saves you searching StackOverflow, right?</span>
            </div>
            <SearchBar v-if="search" />
        </div>
        <div class="settings">
            <button type="button" @click="showSettings"><i class="fas fa-cogs"></i></button>
            <div class="settings-list" ref="settingsList">
                <a href="https://github.com/Charlesbjerg/snippet-haus" title="View on GitHub"><i class="fab fa-github"></i></a>
                <router-link to="/"><i class="fas fa-home"></i></router-link>
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
    props: {
        search: Boolean
    },
    data() {
        return {
            settingsOpen: false
        };
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

<style lang="scss">
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
            }
        }
    }
}
</style>
