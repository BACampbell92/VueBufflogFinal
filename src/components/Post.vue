<template>
  <div class="container">
    <h1>Welcome to Bufflog! Feel free to browse and add new posts!</h1>
    <div class="create-post"></div>
    <label for="create-post">Please enter your post!</label>
    <input type="text" id="create-post" v-model="text" class="bigger">
    <button v-on:click="createPost">Submit</button>

    <p class="error" v-if="error">{{ error }}</p>

    <div class="post-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        {{ `${post.createdAt.getDate()} / ${post.createdAt.getMonth()} / ${post.createdAt.getFullYear()}` }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostServe from "../PostServe.js";

export default {
  name: "Post",
  data() {
    return {
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostServe.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostServe.createPost(this.text);
      this.posts = await PostServe.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 750px;
  margin: 0 auto;
}

p.error {
  border: 1px solid black;
  background-color: rgb(252, 35, 35);
  padding: 1em;
  margin-bottom: 1em;
}

div.post {
  position: relative;
  border: 1px solid navy;
  background-color: aqua;
  padding: 10px 10px 25px 10px;
  margin-bottom: 1em;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 16px 5px 16px;
  background-color: green;
  color: aliceblue;
  font-size: 15px;
}

p.text {
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 0;
}

.bigger {
  height: 8em;
  width: 30em;
}
</style>
