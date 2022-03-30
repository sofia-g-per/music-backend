<template>
  <div class="list-item">
    <div class="list-item__info">

      <div class="list-item__icon-wrapper">
        <img class="list-item__icon wrapped-image" src="./assets/logo.png" alt=""/>
      </div>
      <p class="list-item__title"> Title</p>
      <p class="list-item__artist"> Artist</p>

    </div>

  </div>

  <div class="list-item__options">
    <like-btn></like-btn>
    <!-- слот?  -->
    <button class="play-next-btn">
      <img src="" alt="">
    </button>
    <download-btn></download-btn>
  </div>
</template>

<script>
import LikeBtn from './UI/LikeBtn.vue'
import DownloadBtn from './UI/DownloadBtn.vue'

export default {
  name: 'ListItem',
  components: {
    LikeBtn,
    DownloadBtn
  },
  props: {
    
  }
}
</script>

<style scoped>
  .list-item{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  /* info */
  .list-item__info{
    display: grid;
    grid-template-columns: auto auto;
  }

  .list-item__icon-wrapper{
    grid-row: span 2;
  }

  .list-item__title{
    grid-row: 1;
  }

  /* options */
  .list-item__options{
    display: flex;
    justify-content: space-between;
    /* maybe just do a fixed gap instead? */
  }
</style>
