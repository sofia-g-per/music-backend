<template>
    <div class="item-card">
        <div class="item-card__cover">
            <img class="wrapped-image" src="" alt="">
        </div>
        <div class="item-card__info">
            <!-- использовать и для плейлистов и для артистов? -->
            <p class="item-card__info__title">Title</p>
            <!-- v-for="creator in creators" :key="creator.id" -->
            <p class="item-card__info__creator">creator</p>
        </div>
    </div>
</template>

<style scoped>
    .item-card{
        cursor: pointer;
    }

    /* cover */
    .item-card__cover{
        /* inset больше снизу */
        box-shadow: inset 2px 2px 2px var(--main-bg-color),
            inset 3px 3px 3px var(--main-bg-color)
        ;
    }

    /* может показывать описание при хавере? */
    .item-card:hover .item-card__cover{
        /* инсет снизу увеличивается */
        box-shadow: inset 2px 2px 2px var(--main-bg-color),
            inset 5px 5px 5px var(--main-bg-color)
        ;
    }

    /* info */
    .item-card__info{
        display: grid;
        grid-template-columns: 1fr;
    }

</style>