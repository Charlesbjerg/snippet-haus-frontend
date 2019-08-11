<template>
    <main>
        <h1>About Snippet Haus</h1>
        <p>Snippet haus is a web based quick search tool for code snippets. Currently maintained by <a href="https://charlesbjerg.com" title="Go to this guys site">this guy</a>, so it's going to be mostly snippets of:</p>
        <ul>
            <li>WordPress</li>
            <li>Laravel</li>
            <li>PHP</li>
            <li>JS</li>
            <li>VueJS</li>
            <li>jQuery</li>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
        <p>Snippets of code are sourced where possible, unless they're just general knowledge (to a certain extent).</p>
        <p>The rocket icon used throughout Snippet Haus is not a creation of my own and is source from Flaticon. To quote them directly:</p>
        <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        <p>Snippet Haus is created, owned and maintained by <a href="https://charlesbjerg.com/" title="View this guys site">this guy.</a>
        </p>
        <p>Snippet Haus &copy; {{ this.date }} all rights reserved.</p>
    </main>
</template>

<script>
export default {
    computed: {
        date() {
            return new Date().getFullYear();
        }
    }
}
</script>


<style lang="scss" scoped>
    main {
        max-width: $container-width;
        display: block;
        padding: 1em;
        margin: 0 auto 1em;
        width: 100%;
        min-height: calc(100vh - 340px);
        h1 {
            font-weight: 500;
        }
    }
</style>
