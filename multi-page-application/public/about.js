new Vue({
  el: '#about',
  data: {
    message: 'This is the about page'
  },
  template: `<div>
              {{message}}
              <a href="https://vitejs.dev" target="_blank">
                <img src="assets/vite.svg" class="logo" alt="Vite logo" />
              </a>
            </div>`
});
