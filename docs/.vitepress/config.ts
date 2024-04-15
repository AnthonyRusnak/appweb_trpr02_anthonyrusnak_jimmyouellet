import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Necro Gate",
  description: "TP2 d'application web",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TP Doc', link: '/jimmy-ouellet' }
    ],

    sidebar: [
      {
        text: 'TP Doc',
        items: [
          { text: 'Jimmy Ouellet', link: '/jimmy-ouellet' },
          { text: 'Anthony Rusnak', link: '/anthony-rusnak' }
        ]
      }
    ]
  }
})
