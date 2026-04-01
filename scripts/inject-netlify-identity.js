hexo.extend.injector.register('head_end', '<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>', 'default');

hexo.extend.injector.register('body_end', `
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
`, 'default');
