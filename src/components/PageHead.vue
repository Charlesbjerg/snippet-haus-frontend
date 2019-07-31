<template>
    <header>
        <div class="container">
            <div class="branding">
                <router-link class="logo" to="/create">
                    <img src="rocket.png" alt="Rocket Icon" />
                </router-link>
                <h1>Snippet Haus</h1>
                <span class="subtitle">Saves you searching StackOverflow, right?</span>
            </div>
            <SearchBar v-if="search" />
        </div>
        <div class="repo-icon">
            <!-- <font-awesome-icon icon="github" /> -->
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
    .container {
        max-width: $container-width;
        padding: 0 1em;
        width: 100%;
        text-align: center;
        color: #fff;
    }
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
</style>
