<template>
    <div class="no-results">
        <i class="fas fa-poo"></i>
        No Results Found, might need to try<br/>a different search term.
    </div>
</template>

<style lang="scss">
.no-results {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 25px;
    text-align: center;
    height: 200px;
    i {
        font-size: 72px;
        color: #53332D;
        margin: 1rem 0;
    }
}
</style>