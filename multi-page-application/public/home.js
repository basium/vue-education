new Vue({
    el: '#home',
    data: {
      message: 'This is the home page'
    },
    template: `<div>
                {{message}}
                <a href="https://vitejs.dev" target="_blank">
                  <img src="assets/vite.svg" class="logo" alt="Vite logo" />
                </a>
              </div>`
  });
  